const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 4000;
const app = express();


// middleware:
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://visa-hub.surge.sh'
  ],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// sample get check:
app.get('/', (req, res) => {
  res.send("Server is running...")
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u6vhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const visaCullections = client.db('visaNavigatorDB').collection('allVisa');
    const appliedCullections = client.db('visaNavigatorDB').collection('appliedDetails');

    // get all visa data from db:
    app.get('/allVisa', async (req, res) => {
      const result = await visaCullections.find().toArray();
      res.send(result);
    })

    // get 6 visa data from db:
    app.get('/allVisa/latest_visas', async (req, res) => {
      const limit = 6;
      const result = await visaCullections.find().limit(limit).toArray();
      res.send(result);
    })

    // user email based visa get from db:
    app.get('/allVisa/user/:email', async(req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };

      console.log('Incoming cookies:', req.cookies);
      console.log('Headers:', req.headers);

      const result = await visaCullections.find(query).toArray();
      res.send(result);
    })


    // get single visa data from db:
    app.get('/allVisa/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await visaCullections.findOne(query);
      res.send(result);
    })

    // visa data post or add to db:
    app.post('/addVisa', async (req, res) => {
      const addVisa = req.body;
      const result = await visaCullections.insertOne(addVisa);
      res.send(result);
    })

    // update visa data from db:
    app.patch('/allVisa/user/:id', async (req, res) => {
      const id = req.params.id;
      const updateVisaData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          countryImage: updateVisaData.countryImage,
          countryName: updateVisaData.countryName,
          visaType: updateVisaData.visaType,
          processingTime: updateVisaData.processingTime,
          requiredDocs: updateVisaData.requiredDocs,
          description: updateVisaData.description,
          ageRestriction: updateVisaData.ageRestriction,
          fee: updateVisaData.fee,
          validity: updateVisaData.validity,
          applicationMethod: updateVisaData.applicationMethod,
          userEmail: updateVisaData.userEmail
        }
      }
      const result = await visaCullections.updateOne(filter, updatedDoc);
      res.send(result);
    })

    // specipic users visa data delete from db:
    app.delete('/allVisa/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await visaCullections.deleteOne(query);
      res.send(result);
    })




    // get applied details from db:
    app.get('/applied_details/:email', async (req, res) => {
      const email = req.params.email;
      const query = { clientEmail: email };
      const result = await appliedCullections.find(query).toArray();
      res.send(result);
    })

    // post/add applied details  db:
    app.post('/applied_details', async (req, res) => {
      const appliedDetails = req.body;
      const result = await appliedCullections.insertOne(appliedDetails);
      res.send(result);
    })

    // delete applied details from db:
    app.delete('/applied_details/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await appliedCullections.deleteOne(query);
      res.send(result);
    })


    // Auth related APIs:
    app.post('/jwt', async(req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('Generated token:', token);
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    })

    app.post('/logout', async(req, res) =>{
      res.clearCookie('token', {
        httpOnly: true,
        secure: true,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      })
      .send({success: true});
    })

    
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.listen(port, () => {
  console.log(`Server running from port: ${port}`);
})