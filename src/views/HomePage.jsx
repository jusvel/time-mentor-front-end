import React from "react";
import { useRef } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";



export default function HomePage() {
  const navigate = useNavigate();

  // Event handlers for buttons
  const handleSignupClick = () => {
      navigate('/signup'); // Change to your signup route
  };

  const handleLoginClick = () => {
      navigate('/login'); // Change to your login route
  };

  return (
      <>
          <header className="header">
              <div className="header-left">
                  <h1>TimeMentor</h1>
              </div>
          </header>
          <div className="main-container">
              <div className="hero-container">
                  <h2>Track your time and increase your productivity</h2>
                  <p>Sign up for TimeMentor and start tracking your time today!</p>
                  <button id="signup-button" onClick={handleSignupClick}>Sign Up</button>
              </div>
              <div className="welcome-message">
                  <p>Already have an account?</p>
                  <button id="login-button" onClick={handleLoginClick}>Log In</button>
              </div>
          </div>
      </>
  );
}