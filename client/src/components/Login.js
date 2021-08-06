import React from "react";
import "../App.css";
import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";


const Login = ({currentUser}) => {
  //Gives us a reference to the value of input
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory()
 
  

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setPasswordError("");

      await login(emailRef.current.value, passwordRef.current.value);
     
      history.push('/home')
    } catch {
      setPasswordError("Your email or password is wrong");
    }
    setLoading(false);
 
  }

  return (
    <div>
      <form id="Login" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <input
          className="loginForm"
          type="text"
          name="email"
          ref={emailRef}
          placeholder="Enter your email..."
        />
        <input
          className="loginForm"
          type="text"
          name="password"
          ref={passwordRef}
          placeholder="Enter your password..."
        />
        
        <input disabled={loading} className="loginForm" type="submit" value="Login" />
        {passwordError && <h4>{passwordError}</h4>}
      </form>
    </div>
  );
};

export default Login;
