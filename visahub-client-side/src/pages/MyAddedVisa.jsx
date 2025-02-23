import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
export const MyAddedVisa = () => {
  const {user} =useContext(AuthContext);
  const [visas, setVisas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [visaType, setVisaType] = useState('');
  const [requiredDocs, setRequiredDocs] = useState([]);
  const [existingVisaData, setExistingVisaData] =useState(null);
  useEffect(() => {
    axios.get(`https://visa-navigator-server-swart.vercel.app/allVisa/user/${user?.email}`, {
      withCredentials: true,
    })
      .then(res => setVisas(res.data));
  }, [showModal]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.currentTarget;
    if (checked) {
      setRequiredDocs((prevDocs) => [...prevDocs, value]);
    } else {
      setRequiredDocs((prevDocs) => prevDocs.filter((item) => item !== value));
    }
  };
  const openUpdatePopup = (id) => {
    setExistingVisaData(null);
    setShowModal(true);
    const findVisa = visas.find(visa => visa._id == id);
    setExistingVisaData(findVisa);
  };

  const handleUpdateData = (e) => {
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

    const updatedVisaData = {
      countryImage, countryName, visaType, processingTime, requiredDocs, description, ageRestriction, fee, validity, applicationMethod , userEmail: user?.email
    }

    fetch(`https://visa-navigator-server-swart.vercel.app/allVisa/user/${existingVisaData._id}`,{
      method: "PATCH",
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(updatedVisaData)
    })
    .then(res => res.json())
    .then(data => {
      if(data.modifiedCount){
        setShowModal(false)
        Swal.fire(`${countryName} visa data updated successfully!`);
          form.reset();
      }
    })
  };

  const handleDelete = (id) => {
    const deleteVisa = visas.find((visa) => visa._id == id);
    Swal.fire({
      title: "Are you sure?",
      text: `${deleteVisa.countryName}'s Visa data will be delete!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://visa-navigator-server-swart.vercel.app/allVisa/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: `${deleteVisa.countryName}'s visa data deleted!`,
                icon: "success",
              });
              const remainingVisas = visas.filter((visa) => visa._id !== id);
              setVisas(remainingVisas);
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Submission Failed",
              text: "There was an error submitting your application.",
            });
            console.error("Error:", err);
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 my-10 bg-blue-50 shadow-md rounded-lg">
      <h1 className="text-2x md:text-4xl text-center font-bold text-blue-950 mb-6">
        My Added Visas : {visas.length}
      </h1>

      {visas.length === 0 ? (
        <p className="text-center text-gray-700">No visas added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {visas.map((visa) => (
            <div
              key={visa._id}
              className="card bg-white z-1 shadow-lg p-4 rounded-lg"
            >
              <img
                src={visa.countryImage}
                alt={visa.countryName}
                className="rounded-lg mb-4 w-full h-[140px] object-cover drop-shadow-md mx-auto"
              />
              <h2 className="text-xl font-bold text-blue-900 mb-2">
                {visa.countryName}
              </h2>
              <p className="text-gray-700">
                <strong>Visa Type:</strong> {visa.visaType}
              </p>
              <p className="text-gray-700">
                <strong>Processing Time:</strong> {visa.processingTime} days
              </p>
              <p className="text-gray-700">
                <strong>Fee:</strong> {visa.fee} tk
              </p>
              <p className="text-gray-700">
                <strong>Validity:</strong> {visa.validity} years
              </p>
              <p className="text-gray-700">
                <strong>Application Method:</strong> {visa.applicationMethod}
              </p>
              <div className="flex justify-between mt-4">
                <Link
                  onClick={() => openUpdatePopup(visa._id)}
                  className="btn bg-blue-200 border-blue-500 text-blue-950 hover:bg-blue-300 flex items-center gap-2"
                >
                  <FaEdit /> Update
                </Link>

                <button
                  onClick={() => handleDelete(visa._id)}
                  className="btn btn-error flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </div>

              {/* update modal */}
              {showModal && (
                <dialog
                  id="my_modal_5"
                  className="modal modal-open bg-blue-50 sm:modal-middle"
                >
                  <div className="modal-box">
                    <div className="modal-action justify-start flex-col w-full">
                      <form onSubmit={handleUpdateData}>
                      <h2 className="text-2xl md:text-4xl font-bold col-span-12 text-center text-blue-950">Update Visa Details</h2>
                      <div className="divider col-span-12 mt-0"></div>
                        <div className="mb-4 col-span-6 md:col-span-3">
                          <label className="block font-medium text-gray-700">
                            Country Image
                          </label>
                          <input
                            type="text"
                            defaultValue={existingVisaData.countryImage}
                            name="countryImage"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter image URL"
                            required
                          />
                        </div>
                        <div className="mb-4 col-span-6 md:col-span-3">
                          <label className="block font-medium text-gray-700">
                            Country Name
                          </label>
                          <input
                            type="text"
                            defaultValue={existingVisaData.countryName}
                            name="countryName"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Country name"
                            required
                          />
                        </div>
                        <div className="mb-4 col-span-6 md:col-span-3">
                          <label className="block font-medium text-gray-700">
                            Visa Type
                          </label>
                          <select
                            name="visaType"
                            value={visaType}
                            onChange={(e) => setVisaType(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          >
                            <option value="Tourist visa">Tourist visa</option>
                            <option value="Student visa">Student visa</option>
                            <option value="Official visa">Official visa</option>
                            <option value="Business visa">Business visa</option>
                          </select>
                        </div>
                        <div className="mb-4 col-span-6 md:col-span-3">
                          <label className="block font-medium text-gray-700">
                            Processing Time
                          </label>
                          <input
                            type="number"
                            defaultValue={existingVisaData.processingTime}
                            name="processingTime"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Days..."
                            required
                          />
                        </div>
                        <div className="mb-4 col-span-12 md:col-span-12">
                          <label className="block font-medium text-gray-700">
                            Required Documents
                          </label>
                          <div className="flex flex-col gap-1">
                            {[
                              "Valid passport",
                              "Visa application form",
                              "Recent passport-sized photograph",
                            ].map((doc) => (
                              <div key={doc}>
                                <input
                                  type="checkbox"
                                  name="requiredDocs"
                                  value={doc}
                                  checked={requiredDocs.includes(doc)}
                                  onChange={handleCheckboxChange}
                                  id={doc}
                                />
                                <label htmlFor={doc} className="ml-2">
                                  {doc}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4 col-span-12 md:col-span-12">
                          <label className="block font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            name="description"
                            defaultValue={existingVisaData.description}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Description"
                            required
                          ></textarea>
                        </div>
                        <div className="mb-4 col-span-6 md:col-span-3">
                          <label className="block font-medium text-gray-700">
                            Age Restriction
                          </label>
                          <input
                            type="number"
                            defaultValue={existingVisaData.ageRestriction}
                            name="ageRestriction"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Age restriction"
                            required
                          />
                        </div>
                        <div className="mb-4 col-span-6 md:col-span-3">
                          <label className="block font-medium text-gray-700">
                            Fee
                          </label>
                          <input
                            type="number"
                            defaultValue={existingVisaData.fee}
                            name="fee"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Visa fee"
                            required
                          />
                        </div>
                        <div className="mb-4 col-span-12 md:col-span-3">
                          <label className="block font-medium text-gray-700">
                            Validity
                          </label>
                          <input
                            type="number"
                            name="validity"
                            defaultValue={existingVisaData.validity}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Years"
                            required
                          />
                        </div>
                        <div className="mb-4 col-span-12 md:col-span-3">
                          <label className="block font-medium text-gray-700">
                            Application Method
                          </label>
                          <input
                            type="text"
                            defaultValue={existingVisaData.applicationMethod}
                            name="applicationMethod"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Application method"
                            required
                          />
                        </div>
                        {/* if there is a button in form, it will close the modal */}
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="btn px-8 mt-5 bg-blue-200 text-blue-950  border-blue-600 hover:bg-blue-600 hover:text-white"
                          >
                            Update Data
                          </button>
                        </div>
                      </form>
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={() => setShowModal(false)}
                          className="btn bg-red-500 text-white px-8 w-fit hover:bg-red-600"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </dialog>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
