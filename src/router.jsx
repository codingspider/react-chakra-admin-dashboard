import { createBrowserRouter } from "react-router-dom";

import ErrorPage from './components/ErrorPage';
import MasterLayout from "./layouts/MasterLayout";
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";

export const ROOT = '/';
export const LOGIN = '/login';
export const DASHBORD = '/dashboard';
export const PROFILE = '/profile';


export const router = createBrowserRouter([
  {
    path: ROOT,
    element: <MasterLayout />,
    errorElement: <ErrorPage />,
    children: [
        { index: true, element: <Dashboard /> },
        { path: DASHBORD, element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
        { path: PROFILE, element: <Profile /> },
    ],
  },
  {
    path: LOGIN,
    element: <Login />,
  },
]);

