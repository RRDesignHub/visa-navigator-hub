import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { ErrorPage } from "../pages/ErrorPage";
import { HomePage } from "../pages/HomePage";
import { AllVisa } from "../pages/AllVisa";
import { AddVisa } from "../pages/AddVisa";
import { VisaDetails } from "../components/VisaDetails";
import { MyVisaApplications } from "../pages/MyVisaApplications";
import { MyAddedVisa } from "../pages/MyAddedVisa";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { PrivateRoute } from "./PrivateRoute";


const router = createBrowserRouter([
  {
    errorElement: <ErrorPage></ErrorPage>,
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <HomePage></HomePage>
      },
      {
        path: '/all_visas',
        loader:() => fetch('https://visa-navigator-server-swart.vercel.app/allVisa'),
        element: <AllVisa></AllVisa>,
      },
      {
        path: `/all_visas/:id`,
        element: <PrivateRoute><VisaDetails></VisaDetails></PrivateRoute>,
        loader:({params}) => fetch(`https://visa-navigator-server-swart.vercel.app/allVisa/${params.id}`),
      },
      {
        path: '/add_visa',
        element: <PrivateRoute><AddVisa></AddVisa></PrivateRoute>
      },
      {
        path: '/my_applications',
        element: <PrivateRoute><MyVisaApplications></MyVisaApplications></PrivateRoute>
      },
      {
        path: '/my_added_visa',
        element: <PrivateRoute><MyAddedVisa></MyAddedVisa></PrivateRoute>
      },
      {
        path: '/login',
        element:<Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      }
    ]
  }
])

export default router;
