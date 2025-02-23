import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

export const AddVisa = () => {
  const {user} = useContext(AuthContext);
  const [visaType, setVisaType] = useState('');
  const [requiredDocs, setRequiredDocs] = useState([]);
  const handleVisaType = (e) =>{
    setVisaType(e.target.value);
  }
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.currentTarget;
    if (checked) {
      setRequiredDocs((prevDocs) => [...prevDocs, value]);
    } else {
      setRequiredDocs((prevDocs) => prevDocs.filter((item) => item !== value));
    }
  };
  const handleSubmitVisaData = (e) =>{
    e.preventDefault();

    const form = e.target;
    const countryImage = form.countryImage.value;
    const countryName = form.countryName.value;
    const visaType = form.visaType.value;
    const processingTime = form.processingTime.value;
    const description = form.description.value;
    const ageRestriction = form.ageRestriction.value;
    const fee = form.fee.value;
    const validity = form.validity.value;
    const applicationMethod = form.applicationMethod.value;

    const visaData = {
      countryImage, countryName, visaType, processingTime, requiredDocs, description, ageRestriction, fee, validity, applicationMethod , userEmail: user?.email
    }

    fetch('https://visa-navigator-server-swart.vercel.app/addVisa', {
      method: "POST",
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify(visaData)
    })
      .then(res => res.json())
      .then(data =>{
        if(data.insertedId){
          Swal.fire(`${countryName} visa data added successfully!`);
          form.reset();
          setRequiredDocs([]);
          setVisaType('');
        }
      })

  }
  return (
    <>
      <form onSubmit={handleSubmitVisaData} className="card-body max-sm:px-2 my-10 rounded-xl bg-blue-100 w-[95%] lg:w-11/12 mx-auto grid grid-cols-12">
        <h2 className="text-3xl md:text-4xl font-bold col-span-12 text-center text-blue-950">Add Visa Details</h2>
        <div className="divider col-span-12 m-0"></div>
        <div className="mb-4 col-span-6 md:col-span-3">
          <label className="block font-medium text-gray-700">
            Country Image
          </label>
          <input
            type="text"
            name="countryImage"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter image URL"
            required
          />
        </div>
        <div className="mb-4 col-span-6 md:col-span-3">
          <label className="block font-medium text-gray-700">Country Name</label>
          <input
            type="text"
            name="countryName"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Country name"
            required
          />
        </div>
        <div className="mb-4 col-span-6 md:col-span-3">
          <label className="block font-medium text-gray-700">Visa Type</label>
          <select
            name="visaType"
            value={visaType}
            onChange={handleVisaType}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="Tourist visa">Tourist visa</option>
            <option value="Student visa">Student visa</option>
            <option value="Official visa">Official visa</option>
            <option value="Official visa">Business visa</option>
          </select>
        </div>
        <div className="mb-4 col-span-6 md:col-span-3">
          <label className="block font-medium text-gray-700">Processing Time</label>
          <input
            type="number"
            name="processingTime"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Days..."
            required
          />
        </div>
        <div className="mb-4 col-span-12 md:col-span-12">
          <label className="block font-medium text-gray-700">Required Documents</label>
          <div className="flex max-sm:flex-col md:items-center md:gap-5">
            {['Valid passport', 'Visa application form', 'Recent passport-sized photograph'].map((doc) => (
              <div  key={doc}>
                <input
                  type="checkbox"
                  name="requiredDocs"
                  value={doc}
                  checked={requiredDocs.includes(doc)}
                  onChange={handleCheckboxChange}
                  id={doc}
                />
                <label htmlFor={doc} className="ml-2">{doc}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4 col-span-12 md:col-span-12">
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Description"
            required
          ></textarea>
        </div>
        <div className="mb-4 col-span-6 md:col-span-3">
          <label className="block font-medium text-gray-700">Age Restriction</label>
          <input
            type="number"
            name="ageRestriction"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Age restriction"
            required
          />
        </div>
        <div className="mb-4 col-span-6 md:col-span-3">
          <label className="block font-medium text-gray-700">Fee</label>
          <input
            type="number"
            name="fee"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Visa fee"
            required
          />
        </div>
        <div className="mb-4 col-span-12 md:col-span-3">
          <label className="block font-medium text-gray-700">Validity</label>
          <input
            type="number"
            name="validity"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Years"
            required
          />
        </div>
        <div className="mb-4 col-span-12 md:col-span-3">
          <label className="block font-medium text-gray-700">Application Method</label>
          <input
            type="text"
            name="applicationMethod"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Application method"
            required
          />
        </div>
        <div className="form-control  w-fit ms-auto col-span-12">
          <button className="btn px-10 bg-blue-600 hover:bg-blue-800 text-white border-none">Add</button>
        </div>
      </form>
    </>
  );
};
