import Swal from "sweetalert2";
export const VisaApplicationCard = ({ app, setApplications, applications }) => {
  const {
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
    _id
  } = app;
  const handleCancelVisa = (id) =>{

    Swal.fire({
      title: "Are you sure?",
      text: `${countryName}'s visa application will be cenceled!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://visa-navigator-server-swart.vercel.app/applied_details/${id}`,{
          method: "DELETE"
        })
          .then(res => res.json())
          .then(data => {
            if(data.deletedCount){
              Swal.fire({
                title: "Deleted!",
                text: `${countryName} visa applicaion canceled!`,
                icon: "success"
              });
              const remainingApplications = applications.filter(app => app._id !== id);
              setApplications(remainingApplications);
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
    
  }
  return (
    <>
      <div className="card bg-white shadow-lg p-4 rounded-lg">
        <img
          src={countryImage}
          alt={countryName}
          className="rounded-lg mb-4 w-fit mx-auto"
        />
        <h2 className="text-xl text-center font-bold text-blue-900 mb-2">{countryName}</h2>
        <p className="text-gray-700">
          <strong>Visa Type:</strong> {visaType}
        </p>
        <p className="text-gray-700">
          <strong>Processing Time:</strong> {processingTime} days
        </p>
        <p className="text-gray-700">
          <strong>Fee:</strong> {paidFee} tk
        </p>
        <p className="text-gray-700">
          <strong>Validity:</strong> {validity} years
        </p>
        <p className="text-gray-700">
          <strong>Application Method:</strong> {applicationMethod}
        </p>
        <p className="text-gray-700">
          <strong>Applied Date:</strong>{" "}
          {new Date(appliedDate).toLocaleDateString()}
        </p>
        <p className="text-gray-700">
          <strong>Applicant's Name:</strong> {clientFName} {clientLName}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {clientEmail}
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => handleCancelVisa(_id)}
            className="btn bg-red-500 text-white flex items-center gap-2 hover:bg-red-600"
          >
           Cancel
          </button>
        </div>
      </div>
    </>
  );
};
