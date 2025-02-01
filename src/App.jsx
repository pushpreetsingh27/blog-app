import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AppLayout from "./app-layout/AppLayout";
import NoPage from "./pages/NoPage";
import Dashboard from "./pages/Dashboard";
import AllBlogs from "./pages/AllBlogs";
import BlogInfo from "./pages/BlogInfo";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <NoPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/allblogs",
          element: <AllBlogs />,
        },
        {
          path: "/blog/:id",
          element: <BlogInfo />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
