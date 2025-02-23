import { useContext } from "react"
import { AuthContext } from "../Provider/AuthProvider"
import { Loading } from "../components/Loading";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({children}) => {
  const {loader, user} = useContext(AuthContext);
  const location = useLocation();

  if(loader){
    return <Loading />
  }

  return (
    user ? children : <Navigate state={location.pathname} to='/login'></Navigate>
  )
}
