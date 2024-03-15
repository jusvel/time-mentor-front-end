import { useRef } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={onSubmit}>
      <input ref={emailRef} type="email" />
      <input ref={passwordRef} type="password" />
      <button>Login</button>
    </form>
  );
}
