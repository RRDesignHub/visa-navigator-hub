import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const LatestVisa = () => {
  const [latestVisas, setLatestVisas] = useState([]);
  useEffect(() =>{
    fetch(`https://visa-navigator-server-swart.vercel.app/allVisa/latest_visas`)
    .then(res => res.json())
    .then(data => setLatestVisas(data))
  },[])
  return (
    <section className="bg-white py-10">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-blue-950 mb-8">
        Latest Visas
      </h2>
      {latestVisas.length === 0 ? (
        <p className="text-center text-gray-700">No visas available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {latestVisas.map((visa) => (
            <div
              key={visa._id}
              className="card bg-blue-50 p-3 shadow-lg rounded-xl overflow-hidden"
            >
              <img
                src={visa.countryImage}
                alt={visa.country}
                className="h-40 w-full drop-shadow-md rounded-xl object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-900">
                  {visa.country}
                </h3>
                <p className="text-gray-700">
                  <strong>Visa Type:</strong> {visa.visaType}
                </p>
                <p className="text-gray-700">
                  <strong>Processing Time:</strong> {visa.processingTime} days
                </p>
                <p className="text-gray-700">
                  <strong>Fee:</strong> ${visa.fee}
                </p>
                <p className="text-gray-700">
                  <strong>Validity:</strong> {visa.validity} years
                </p>
                <p className="text-gray-700">
                  <strong>Application Method:</strong> {visa.applicationMethod}
                </p>
                <Link
                  to={`/all_visas/${visa._id}`}
                  className="btn bg-blue-200 border-blue-600 text-blue-950 hover:bg-blue-300 w-full mt-4 text-center"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-10">
        <Link
          to="/all_visas"
          className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg"
        >
          See All Visas
        </Link>
      </div>
    </div>
  </section>
  )
}
