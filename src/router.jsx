import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Login from "./views/Login/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import Signup from "./views/Signup/Signup.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Test from "./views/Test.jsx";
import HomePage from "./views/HomePage.jsx"; // Import the HomePage component

// A wrapper component to handle layout composition for authenticated routes
const AuthenticatedLayout = () => (
  <DefaultLayout>
    <Outlet /> {/* Nested routes will render here */}
  </DefaultLayout>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/home" />, // Navigate to HomePage by default
  },
  {
    path: "home",
    element: <HomePage />, // HomePage is directly accessible without any layout
  },
  {
    path: "app",
    element: <AuthenticatedLayout />, // Wrap authenticated routes with DefaultLayout
    children: [
      {
        path: "test",
        element: <Test />,
      },
      // ... more authenticated routes can be added here
    ],
  },
  // Guest routes directly under root path without GuestLayout
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
