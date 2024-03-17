import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../axiosClient";

export default function DefaultLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axiosClient.get("/users/verify", {
          withCredentials: true,
        });

        if (response.status === 200) {
          console.log("User is logged in");
        }
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/login");
        }
      }
    };
    checkLoggedIn();
  }, []);

  const handleLogout = () => {
    axiosClient.get("/users/logout", { withCredentials: true }).then(() => {
      navigate("/login");
    });
  };

  return (
    <div>
      <header>
        <button onClick={handleLogout}>Log out</button>
      </header>
      <Outlet />
    </div>
  );
}
