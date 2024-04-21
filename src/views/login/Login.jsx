import React, { useState } from "react";
import axiosClient from "../../axiosClient";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axiosClient.post(
        "/users/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(response);
      navigate("/tasks");
    } catch (error) {
      setError(error.response?.data?.message || 'invalid credentials');
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
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {error && <div className="error-message">{error}</div>}
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