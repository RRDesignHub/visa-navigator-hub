import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
export const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {authRegister, setUser, loginWithGoogle, updateUser} = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const validatePassword = (pass) =>{
    const uppercase = /[A-Z]/.test(pass);
    const lowercase = /[a-z]/.test(pass);
    const minLength = pass.length >= 6;

    let err = '';
    if(!uppercase) {err = "Password must contain an uppercase letter."}; 
    if(!lowercase) {err = "Password must contain a lowercase letter."}; 
    if(!minLength) {err = "Password must be at least 6 characters long."}; 
     
    setPasswordError(err);
    err = "";

  }
  
  const handleRegister = (e)=>{
    e.preventDefault();
    setAuthError("");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoUrl = form.photoUrl.value;
    const password = form.password.value;
    const registeredUser = {
      name, email, photoUrl, password
    };
    
    authRegister(email, password)
    .then(result =>{
      setUser(result.user);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${name} successfully registered!`,
        showConfirmButton: false,
        timer: 1500
      });
      updateUser(name, photoUrl);
      navigate(location.state ? `${location.state}` : "/");
    }).catch(error =>{
      if (error.code === "auth/invalid-email") {
        setAuthError("The email address is not valid.");
      } else if (error.code === "auth/weak-password") {
        setAuthError("The password is too weak.");
      } else if (error.code === "auth/email-already-in-use") {
        setAuthError("The email is already registered.");
        
      } else if (error.code === "auth/operation-not-allowed") {
        setAuthError("Email/password accounts are not enabled.");
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
          title: `User successfully registered!`,
          showConfirmButton: false,
          timer: 1500
        });
        navigate(location.state ? `${location.state}` : "/");
      })
      .catch((err) => {
        setError(err.code);
      });
  };
  const handleGoogleRegister = () =>{};
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md bg-blue-50 shadow-lg rounded-lg p-8 my-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-950 mb-3">
          Create an Account
        </h1>
        <form onSubmit={handleRegister}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>
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
              <span className="label-text font-semibold">Photo URL</span>
            </label>
            <input
              type="url"
              name="photoUrl"
              placeholder="Enter your photo URL"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="input input-bordered w-full"
              required
              onChange={(e) => validatePassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-2 whitespace-pre-line">
                {passwordError}
              </p>
            )}
            {authError && (
              <p className="text-red-500 text-sm mt-2 whitespace-pre-line">
                {authError}
              </p>
            )}
          </div>
          <div className="form-control">
            <button type="submit" className="btn btn-primary w-full">
              Register
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
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};
