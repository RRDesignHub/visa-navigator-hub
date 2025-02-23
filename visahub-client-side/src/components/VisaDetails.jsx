import { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
export const VisaDetails = () => {
  const {user} = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const visaData = useLoaderData();
  const {
    _id,
    countryImage,
    countryName,
    visaType,
    processingTime,
    requiredDocs,
    description,
    ageRestriction,
    fee,
    validity,
    applicationMethod,
  } = visaData;

  const handleAppledDetails = (e) => {
    e.preventDefault();
    const form = e.target;
    const clientEmail = form.clientEmail.value;
    const clientFName = form.clientFName.value;
    const clientLName = form.clientLName.value;
    const appliedDate = form.appliedDate.value;
    const paidFee = form.fee.value;

    if (paidFee < fee) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `You have to pay full fee for the application`,
      });
      return;
    }
    const applicationDetails = {
      countryName,
      countryImage,
      visaType,
      processingTime,
      validity,
      applicationMethod,
      clientEmail,
      clientFName,
      clientLName,
      appliedDate,
      paidFee,
    };

    fetch("https://visa-navigator-server-swart.vercel.app/applied_details", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(applicationDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire(
            `${clientFName} ${clientLName}'s applicaion successfully submited!`
          );
          document.getElementById("my_modal_5").close();
          setShowModal(false);
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
  };
  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-blue-50 my-10 shadow-md rounded-lg">
        <img
          src={countryImage}
          alt={countryName}
          className="mx-auto  rounded-lg mb-4"
        />
        <h1 className="text-2xl text-center text-blue-950 font-bold mb-4">
          {countryName} - {visaType}
        </h1>

        <div className=" ">
          <p className="text-gray-700 mb-2 ">
            <strong>Processing Time:</strong> {processingTime} days
          </p>

          <p className="text-gray-700 mb-2 ">
            <strong>Age Restriction:</strong> {ageRestriction} years
          </p>
          <p className="text-gray-700 mb-2  ">
            <strong>Fee:</strong> {fee} tk
          </p>
          <p className="text-gray-700 mb-2 ">
            <strong>Required Documents:</strong>{" "}
            {requiredDocs.map((item, idx) => (
              <span className="me-3" key={idx}>
                {idx + 1}: {item},
              </span>
            ))}
          </p>
          <p className="text-gray-700 mb-2 ">
            <strong>Validity:</strong> {validity} year
          </p>
          <p className="text-gray-700 mb-2 ">
            <strong>Application Method:</strong> {applicationMethod}
          </p>
        </div>

        <p className="mt-4 text-gray-600">
          <strong>Description:</strong> {description}
        </p>

        <div className="flex justify-between items-center">
          <Link to='/all_visas' className="btn bg-white textblue-950 hover:bg-blue-300">Go Back</Link>
          <button
            onClick={() => setShowModal(true)}
            className="btn my-4 bg-blue-600 text-white hover:bg-blue-500"
          >
            Apply for the Visa
          </button>
        </div>
      </div>

      {showModal && (
        <dialog
          id="my_modal_5"
          className="modal modal-open bg-blue-50 sm:modal-middle"
        >
          <div className="modal-box">
            <div className="modal-action justify-start flex-col w-full">
              <form onSubmit={handleAppledDetails}>
              <h2 className="text-2xl md:text-4xl font-bold col-span-12 text-center text-blue-950">Apply for Visa</h2>
              <div className="divider col-span-12 mt-0"></div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="clientEmail"
                    type="email"
                    placeholder="email"
                    defaultValue={user?.email}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    name="clientFName"
                    type="text"
                    placeholder="First name..."
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    name="clientLName"
                    type="text"
                    placeholder="Last name..."
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Applied Date</span>
                  </label>
                  <input
                    name="appliedDate"
                    type="date"
                    placeholder="Select date"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Fee</span>
                  </label>
                  <input
                    name="fee"
                    type="number"
                    placeholder="Fee in tk..."
                    className="input input-bordered"
                    required
                  />
                  <p className="mt-2 text-xs text-blue-500">
                    Application fee: {fee} tk
                  </p>
                </div>
                {/* if there is a button in form, it will close the modal */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn px-8 mt-5 bg-blue-200 text-blue-950  border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Apply
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
    </>
  );
};
