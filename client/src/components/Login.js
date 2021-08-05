import React from "react";
import "../App.css";
import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  //Gives us a reference to the value of input
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setPasswordError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
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
        <Link to="/home">
          <input className="loginForm" type="submit" value="Login" />
        </Link>
        {passwordError && <h4>{passwordError}</h4>}
      </form>
    </div>
  );
};

export default Login;
