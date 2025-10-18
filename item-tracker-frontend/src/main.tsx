
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks/useRedux";
import { Home } from "lucide-react";
import AppLayout from "./components/appLayout";
import Auth from "./pages/auth";
import Inventory from "./pages/Inventory";
import Record from "./pages/Record";

// eslint-disable-next-line react-refresh/only-export-components
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector((state) => state.auth.token);
  return token ? <>{children}</> : <Navigate to='/login' replace />;
};

export const router = createBrowserRouter([
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
      { path: "/", element: <Navigate to='/home' replace /> },
      { path: "/home", element: <Home /> },
      { path: "/record", element: <Record /> },

      { path: "/settings", element: <Inventory /> },
    ],
  },
]);
