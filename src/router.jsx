import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Login from "./views/login/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import Signup from "./views/signup/Signup.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Test from "./views/Test.jsx";
import HomePage from "./views/HomePage.jsx"; // Import the HomePage component
import Tasks from "./views/tasks/Tasks.jsx";

// A wrapper component to handle layout composition for authenticated routes
const AuthenticatedLayout = () => (
  <DefaultLayout>
    <Outlet /> {/* Nested routes will render here */}
  </DefaultLayout>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/tasks" />, // Navigate to HomePage by default
  },
  {
    path: "home",
    element: <HomePage />, // HomePage is directly accessible without any layout
  },
  {
    element: <AuthenticatedLayout />, // Wrap authenticated routes with DefaultLayout
    children: [
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "results",
        element: <div>Results</div>,
      },
      {
        path: "zen-mode",
        element: <div>Zen Mode</div>,
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
