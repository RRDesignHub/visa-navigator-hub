# Visa Navigator Server 🌍

## Live API: [https://visa-navigator-server-swart.vercel.app](https://visa-navigator-server-swart.vercel.app)

---

### Project Description
This is the server-side API for the Visa Navigator Portal, providing robust backend support for managing visa data, user authentication, and secure CRUD operations.

---

### Key Features
- **User Authentication**: Firebase-based user authentication with role management.
- **Secure CRUD Operations**: Add, update, delete, and fetch visa and application data securely.
- **Protected Routes**: Ensures only authorized users can access specific resources.
- **Database Management**: Uses MongoDB for storing visa and application data.
- **API Documentation**: Well-structured RESTful API endpoints.

---

### Technologies Used
- **Backend Framework**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ORM)
- **Authentication**: Firebase Authentication
- **Environment Variables**: Secured sensitive keys using `.env`
- **Hosting**: Vercel

---

### API Endpoints
#### **Visa Management**
- `GET /visas` - Fetch all visas
- `GET /visas/:id` - Fetch visa details by ID
- `POST /visas` - Add a new visa (protected route)
- `PUT /visas/:id` - Update a visa (protected route)
- `DELETE /visas/:id` - Delete a visa (protected route)

#### **Application Management**
- `GET /applications` - Fetch all user applications
- `POST /applications` - Apply for a visa
- `DELETE /applications/:id` - Cancel an application

#### **Authentication**
- Firebase token verification middleware for protected routes.

---

