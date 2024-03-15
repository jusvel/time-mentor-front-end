import { Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function DefaultLayout() {
  const handleLogout = () => {
    axiosClient.get("/users/logout", { withCredentials: true }).then(() => {
      window.location.href = "/login";
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
