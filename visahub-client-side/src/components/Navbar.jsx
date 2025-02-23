import { Link, NavLink } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { FaWindowClose } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import logo from './../assets/logo.png';
export const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpne] = useState(false);
  const [openCloseMenu, setOpenCloseMenu] = useState(true);
  const handleOpenCloseMenu = (status) => {
    setOpenCloseMenu(!status);
  };
  const handleProfileToagle = () => {
    setIsOpne(!isOpen);
  };
  const handleUserLogout = () =>{
    logoutUser()
  }
  // console.log(user);
  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-transparent hover:bg-transparent text-blue-950 underline font-semibold focus:bg-transparent"
              : "text-gray-600 hover:bg-transparent"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-transparent hover:bg-transparent text-blue-950 underline font-semibold focus:bg-transparent"
              : "text-gray-600 hover:text-blue-950 hover:bg-transparent"
          }
          to="/all_visas"
        >
          All Visas
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-transparent hover:bg-transparent text-blue-950 underline font-semibold focus:bg-transparent"
              : "text-gray-600 hover:text-blue-950 hover:bg-transparent"
          }
          to="/add_visa"
        >
          Add Visa
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-transparent hover:bg-transparent text-blue-950 underline font-semibold focus:bg-transparent"
              : "text-gray-600 hover:text-blue-950 hover:bg-transparent"
          }
          to="/my_added_visa"
        >
          My Added Visas
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-transparent hover:bg-transparent text-blue-950 underline font-semibold focus:bg-transparent"
              : "text-gray-600 hover:text-blue-950 hover:bg-transparent"
          }
          to="/my_applications"
        >
          My Visa Applications
        </NavLink>
      </li>

      {user ? (
        <>
          <div className="relative">
            <img
              onClick={handleProfileToagle}
              className="w-10 h-10 rounded-full border-2 border-blue-200"
              src={user?.photoURL}
              alt=""
            />
            <div className={`absolute z-50 top-12 w-[170px] rounded-xl  flex-col items-center justify-center gap-2 bg-white p-5 ${isOpen ? 'flex max-sm:-left-6 lg:-right-2' : 'hidden'}`}>
              <h3 className="text-xs font-medium text-center text-blue-950">
                {user?.displayName || "User"}
              </h3>
              <button 
              onClick={handleUserLogout}
              className="btn py-0 text-sm bg-blue-100 text-blue-950 w-fit h-fit hover:border-blue-300 hover:bg-blue-50">
                Logout
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-transparent hover:bg-transparent text-blue-950 underline font-semibold focus:bg-transparent"
                  : "text-gray-600 hover:text-blue-950 hover:bg-transparent"
              }
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-transparent hover:bg-transparent text-blue-950 underline font-semibold focus:bg-transparent"
                  : "text-gray-600 hover:text-blue-950 hover:bg-transparent"
              }
              to="register"
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  
  
  return (
    <>
      <div className="navbar w-11/12 mx-auto ">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-1 md:gap-2">
            <img className="h-[30px] md:h-[50px] drop-shadow-sm rounded-lg md:rounded-2xl" src={logo} alt="VN logo" />
            <h3 className="text-xl md:text-2xl font-semibold text-blue-600 ">VISA <span className=" text-blue-950">NAVIGATOR</span></h3>
          </Link>
        </div>
        <div className="flex-none hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="flex lg:hidden mx-2 mt-2">
          <div className="py-2 px-3 rounded-lg bg-slate-200 text-slate-900 ">
            {openCloseMenu ? (
              <TiThMenu
                onClick={() => handleOpenCloseMenu(true)}
                className="text-2xl flex  "
              />
            ) : (
              <FaWindowClose
                onClick={() => handleOpenCloseMenu(false)}
                className="text-2xl flex  "
              ></FaWindowClose>
            )}
          </div>

          <ul
            className={`absolute z-50 gap-5 justify-center duration-500 rounded-lg bg-slate-100 drop-shadow-md p-6  top-20   ${
              openCloseMenu ? "-left-[1000px] " : "left-4 "
            }`}
          >
            {links}
          </ul>
        </div>
      </div>
    </>
  );
};
