import { useLoaderData } from "react-router-dom"
import { VisaDisplayCard } from "../components/VisaDisplayCard";

export const AllVisa = () => {
  const allVisa = useLoaderData();
  return (
    <>
      <div className="py-5">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Total available Visa: {allVisa.length}</h2>
      </div>
      <div className="w-11/12 mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {
          allVisa && allVisa.map(visa => <VisaDisplayCard key={visa._id} visaData={visa}></VisaDisplayCard>)
        }
      </div>
    </>
  )
}
