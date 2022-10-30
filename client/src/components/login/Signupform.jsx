import React, { useRef,useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCalls";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

export default function Signupform({setStatus}) {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const navigate = useNavigate();

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    if(password.current.value!==confirmPassword.current.value){
        confirmPassword.current.setCustomValidity("Passwords don't match!")
    }
    else{
        const user={
            username:username.current.value,
            email:email.current.value,
            password:password.current.value,
        }

        try{
            await axios.post("/auth/register",user);
            setStatus("Login");
        }
        catch(err){
            console.log(err);
        }
        
    }
  };

  return (
    <form className="login-form-cnt pb-3" onSubmit={handleClick}>
      <div className="input-data">
        <input
          className="px-2 mt-2"
          required
          type="text"
          placeholder="Enter username"
          ref={username}
        />
        <input
          className="px-2 mt-2"
          required
          type="email"
          placeholder="Enter email"
          ref={email}
        />
        <input
          className="px-2 mt-2"
          required
          type="password"
          minLength={6}
          placeholder="Enter password"
          ref={password}
        />
        <input
          className="px-2 mt-2"
          required
          type="password"
          placeholder="Confirm password"
          ref={confirmPassword}
        />
      </div>
      <button
        type="submit"
        className="login-page-btn login-btn btn-success btn"
        disabled={isFetching}
      >
        {isFetching? <CircularProgress size='1rem'/>:"Signup"}
      </button>
    </form>
  );
}
