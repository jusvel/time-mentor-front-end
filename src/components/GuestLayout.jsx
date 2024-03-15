import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GuestLayout() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/verify",
          { withCredentials: true }
        );

        if (response.status === 200) {
          setLoggedIn(true);
          console.log("User is logged in");
        }
      } catch (error) {
        console.error("Error checking user login status:", error.message);
      }
    };

    checkLoggedIn();
  }, []);

  if (loggedIn) return <Navigate to="/test" />;

  return (
    <div>
      <Outlet />
    </div>
  );
}
