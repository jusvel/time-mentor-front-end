import React from "react";
import { useRef } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  // Event handlers for buttons
  const handleSignupClick = () => {
    navigate("/signup"); // Navigate to your signup route
  };

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to your login route
  };

  return (
    <>
      <header className="homepage-header">
        {/* Your header content here */}
      </header>
      <div className="homepage-main-container">
        <div className="main-message-container">
          <h1>TimeMentor</h1>
          <p className="tagline">Master Your Time, Ace Your Studies.</p>
          <h2>Plan, track, and succeed in your academic journey with ease.</h2>
        </div>
        <div className="hero-container">
          <button className="btn" id="signup-button" onClick={handleSignupClick}>
            Sign Up
          </button>
          <button className="btn" id="login-button" onClick={handleLoginClick}>
            Log In
          </button>
        </div>
        <div className="welcome-message">
          {/* Any additional messages or content can go here */}
        </div>
      </div>
    </>
  );
}