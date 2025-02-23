import { Link } from "react-router-dom"

export const ErrorPage = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-blue-100 p-16 rounded-xl text-center">
          <h1 className="text-4xl font-extrabold text-blue-950">Error code:404</h1>
          <h2 className="text-xl font-semibold mb-5">Page not found</h2>
          <Link className="btn bg-blue-900 hover:bg-blue-700 text-blue-50" to='/'>Back to Home</Link>
        </div>
      </div>
    </>
  )
}
