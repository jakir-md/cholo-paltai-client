import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';
import AuthContext from './AuthContext';

const provider = new GoogleAuthProvider;
const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUserWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  }

  const createUserWithEmailAndPass = (email, password) =>{
    setLoading(true);
    console.log(email, password);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const updateUserInfo = (obj) => {
    return updateProfile(auth.currentUser, obj);
  }

  const signInWithEmailAndPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () => {
    return signOut(auth);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (newuser) => {
      setUser(newuser);
      setLoading(false);
    });

    return ()=> unSubscribe();
  }, []);

  const userInfo = {
    user,
    loading,
    setUser,
    setLoading,
    updateUserInfo,
    createUserWithGoogle,
    createUserWithEmailAndPass,
    signInWithEmailAndPass,
    logOut
  };

  return (
    <AuthContext.Provider value={userInfo}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
