import { useRef } from "react";
import axiosClient from "../../axiosClient";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const confirmPasswordRef = useRef("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = confirmPasswordRef.current.value;
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }
    axiosClient
      .post("/users/signup", { name, email, password, passwordConfirm })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" id="name" ref={nameRef} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={emailRef} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={passwordRef} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              ref={confirmPasswordRef}
              required
            />
          </div>
          <button className="btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
