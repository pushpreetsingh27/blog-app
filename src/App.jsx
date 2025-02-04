import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AppLayout from "./app-layout/AppLayout";
import NoPage from "./pages/NoPage";
 
import BlogInfo from "./pages/BlogInfo";
import MyState from "./context/MyState";
import ThemeProvider from "./context/ThemeContext";

const Home = React.lazy(() => import("./pages/Home"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const AllBlogs = React.lazy(() => import("./pages/AllBlogs"));

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <NoPage />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          ),
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
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: "/allblogs",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AllBlogs />
            </Suspense>
          ),
        },
        {
          path: "/blog/:id",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <BlogInfo />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <ThemeProvider>
    <MyState>
      <RouterProvider router={router} />
    </MyState>
  </ThemeProvider>
  );
};

export default App;
