import { createBrowserRouter } from "react-router-dom";

import ErrorPage from './components/ErrorPage';
import MasterLayout from "./layouts/MasterLayout";
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";
import Welcome from "./components/Welcome";
import Forgot from "./components/Forgot";
import ResetPassword from './components/ResetPassword';
import Unauthorized from "./components/Unauthorized";

export const ROOT = '/';
export const LOGIN = '/login';
export const FORGOT = '/forgot';
export const RESET_PASSWORD = '/reset/password/:reset_token';
export const UNAUTHORIZED = '/unauthorized';

export const ADMIN = '/admin';
export const DASHBORD = 'dashboard';  // Note: No slash needed when nested
export const PROFILE = 'profile';

export const router = createBrowserRouter([
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: ROOT,
    element: <Welcome />,
  },
  {
    path: UNAUTHORIZED,
    element: <Unauthorized />,
  },
  {
    path: FORGOT,
    element: <Forgot />,
  },
  {
    path: RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    path: ADMIN,
    element: <MasterLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: DASHBORD, element: <ProtectedRoute role="super_admin"><Dashboard /></ProtectedRoute> },
      { path: PROFILE, element: <ProtectedRoute role="user"><Profile /></ProtectedRoute> },
    ],
  },
]);
