import React, { useContext, useEffect, useState } from 'react'
import { VisaApplicationCard } from '../components/VisaApplicationCard';
import { AuthContext } from '../Provider/AuthProvider';

export const MyVisaApplications = () => {
  const {user} = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  useEffect(() =>{
    fetch(`https://visa-navigator-server-swart.vercel.app/applied_details/${user?.email}`)
      .then(res => res.json())
      .then(data => setApplications(data))
  },[])
  return (
    <div className="w-11/12 mx-auto p-6 my-10 bg-blue-50 shadow-md rounded-lg">
      <h1 className="text-2xl md:text-3xl text-center font-bold text-blue-950 mb-6">My Visa Applications</h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-700">No applications found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <VisaApplicationCard applications={applications} setApplications={setApplications} app={app} key={app._id}></VisaApplicationCard>
          ))}
        </div>
      )}
    </div>
  )
}
