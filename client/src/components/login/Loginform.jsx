import React, { useState, useEffect , useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext"
import {CircularProgress} from "@material-ui/core"

import {auth} from '../../firebaseconfig'
import {signInWithEmailAndPassword } from "firebase/auth";

export default function Loginform() {
 

  const email = useRef();
  const password = useRef();

  const {user, isFetching,error,dispatch} = useContext(AuthContext);

  const handleClick = (e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {

    loginCall({email:email.current.value,password:password.current.value},dispatch)
    // const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

    
  }
  return (
    <form className="login-form-cnt pb-3" onSubmit={handleClick}>
      <input
        className="px-2 my-2"
        type="email"
        placeholder="Enter email"
        required
        ref={email}
      />
      <input
        className="px-2 mt-2 mb-4"
        type="password"
        required
        minLength='6'
        placeholder="Enter Password"
        ref={password}
      />

      <button disabled={isFetching} type="submit" className="login-page-btn login-btn btn-success btn">
        {isFetching ?<CircularProgress  size="1rem" className="circularProgress"/>:"Login"}
      </button>
      <button type="submit" className="login-page-btn btn mt-2">
        Forgot password?
      </button>
    </form>
  );
}
