import { useRef } from "react";
import axiosClient from "../axiosClient";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post(
        "/users/login",
        { email: emailRef.current.value, password: passwordRef.current.value },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        navigate("/test");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="login-container">
        <form className="login-form" onSubmit={onSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" ref={emailRef} type="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" ref={passwordRef} type="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="signup-text">
        <p>
          Don&apos;t have an account? <Link to={"/signup"}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
