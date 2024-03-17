import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import Signup from "./views/Signup/Signup.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Test from "./views/Test.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/test"} />,
      },
      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
