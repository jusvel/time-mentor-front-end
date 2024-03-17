import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../axiosClient";

export default function GuestLayout() {
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

  return (
    <div>
      <Outlet />
    </div>
  );
}
