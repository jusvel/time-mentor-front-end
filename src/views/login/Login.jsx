import React, { useRef } from "react";
import axiosClient from "../../axiosClient";
import "./Login.css"; // Make sure the path is correct for your project setup
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post(
        "/users/login",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        { withCredentials: true }
      );
      console.log(response);
      navigate("/tasks"); // Adjust the path as necessary
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <h1>TimeMentor</h1>
        </div>
      </header>
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form className="form-container" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" ref={emailRef} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" ref={passwordRef} required />
            </div>
            <button type="submit" className="form-button btn">
              Login
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
}
