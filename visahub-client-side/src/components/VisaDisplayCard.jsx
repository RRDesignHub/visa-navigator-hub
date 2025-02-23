import { Link } from "react-router-dom";

export const VisaDisplayCard = ({ visaData }) => {
  const { _id, countryImage, countryName, visaType, processingTime } = visaData;
  return (
    <div className="border rounded-lg  p-4 bg-blue-50 hover:shadow-xl transition-shadow">
      <img
        src={countryImage}
        alt={countryName}
        className="w-full h-32 object-cover shadow-lg rounded-lg"
      />
      <h2 className="text-xl text-blue-950 font-semibold mt-2">
        {countryName}
      </h2>

      <p className="text-gray-600 mt-1">
        <span className="font-medium">Visa Type:</span> {visaType}
      </p>
      <p className="text-gray-600 mt-1">
        <span className="font-medium">Processing Time:</span> {processingTime}{" "}
        days
      </p>
      <Link to={`/all_visas/${_id}`}>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full text-center">
          See Details
        </button>
      </Link>
    </div>
  );
};
