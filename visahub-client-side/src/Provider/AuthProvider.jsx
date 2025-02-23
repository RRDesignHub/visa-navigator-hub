import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  const authRegister = (email, password) => {
    setLoader(true);  
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUser = async(name, photoURL) =>{
    setLoader(true);
    const currentUser = auth.currentUser;
    if(currentUser){
      return updateProfile(currentUser, { displayName: name, photoURL })
      .then(() => {
        setUser({
          ...currentUser,
          displayName: name,
          photoURL: photoURL,
        });
      })
      .finally(() => setLoader(false));
    }
      setLoader(false);
  }
  const loginWithEmail = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const loginWithGoogle = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logoutUser = ()=>{
    setLoader(true);
    return signOut(auth);
  }

  useEffect(() => {
    const currentSubscriber = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(currentUser?.email){
        const user = {email: currentUser.email};
        axios.post('https://visa-navigator-server-swart.vercel.app/jwt', user, {withCredentials: true})
          .then(res => {
            console.log(res.data);
            setLoader(false);
          })
      }else{
        axios.post('https://visa-navigator-server-swart.vercel.app/logout', {}, {withCredentials: true})
          .then(res => {
            console.log(res.data);
            setLoader(false);
          });
      }
      
    });
    return () => {
      currentSubscriber();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loader,
    setLoader,
    authRegister,
    loginWithEmail,
    loginWithGoogle,
    logoutUser,
    updateUser
  };

  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};
