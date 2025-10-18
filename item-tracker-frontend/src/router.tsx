// src/router.tsx
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useAppSelector } from "./hooks/useRedux";

import AppLayout from "./components/appLayout";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import Inventory from "./pages/Inventory";
import Record from "./pages/Record";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector((state) => state.auth.token);
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "home", element: <Dashboard /> },
      { path: "items", element: <Inventory /> },
      { path: "record", element: <Record /> },
    ],
  },
]);


const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
