import { toast, ToastContainer } from "react-toastify";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
export const Login = () => {
  const { setUser, loginWithEmail, loginWithGoogle } = useContext(AuthContext);
  const [authError, setAuthError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginWithEmail(email, password)
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `User successfully loged in!`,
          showConfirmButton: false,
          timer: 1500
        });
        navigate(location.state ? `${location.state}` : "/");
        form.reset();
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          setAuthError("The email address you entered is not valid.");
        } else if (err.code === "auth/wrong-password") {
          setAuthError("The password you entered is incorrect.")
        } else if (err.code === "auth/user-not-found") {
          setAuthError('No account exists with the provided email.')
        } else {
          setAuthError("An unexpected error occurred.");
        }
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `User successfully loged in!`,
          showConfirmButton: false,
          timer: 1500
        });
        navigate(location.state ? `${location.state}` : "/");
      })
      .catch((err) => {
        setError(err.code);
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md bg-blue-50 shadow-lg rounded-lg p-8 my-10">
        <h1 className="text-xl md:text-3xl font-bold text-center text-blue-950 mb-3">
          Login to Your Account
        </h1>
        <form onSubmit={handleLogin}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
            
          </div>
          <small className="text-red-500">{authError}</small>
          <div className="form-control">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>
        </form>
        <div className="divider my-6">OR</div>
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-2xl" /> Continue with Google
        </button>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
      
    </div>
  );
};
