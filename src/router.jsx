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
import MasterSetting from "./components/admin/MasterSetting";
import BusinessSetting from "./components/admin/BusinessSetting";
import Plan from "./components/super_admin/plan/Plan";
import Plan_List from "./components/super_admin/plan/List";
import OwnerList from "./components/super_admin/owner/List";
import OwnerAdd from "./components/super_admin/owner/Add";
import OwnerEdit from "./components/super_admin/owner/Edit";

export const ROOT = '/';
export const LOGIN = '/login';
export const FORGOT = '/forgot';
export const RESET_PASSWORD = '/reset/password/:reset_token';
export const UNAUTHORIZED = '/unauthorized';

export const ADMIN = '/admin';
export const SUPER_ADMIN = '/super/admin';
export const USER = '/user';
export const STAFF = '/staff';

export const DASHBORD = 'dashboard';  // Note: No slash needed when nested
export const PROFILE = 'profile';
export const MASTER_SETTING = 'master/setting';
export const BUSINESS_SETTING = 'business/setting';

export const PLAN_ADD = '/super/admin/plan/add';
export const PLAN_LIST = '/super/admin/plan/list';

export const OWNER_LIST = '/super/admin/owner/list';
export const OWNER_ADD = '/super/admin/owner/create';
export const OWNER_EDIT = '/super/admin/owner/edit/:id';

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
    path: SUPER_ADMIN,
    element: <MasterLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: DASHBORD, element: <ProtectedRoute role="superadmin"><Dashboard /></ProtectedRoute> },
      { path: MASTER_SETTING, element: <ProtectedRoute role="superadmin"><MasterSetting /></ProtectedRoute> },
      { path: PLAN_ADD, element: <ProtectedRoute role="superadmin"><Plan /></ProtectedRoute> },
      { path: PLAN_LIST, element: <ProtectedRoute role="superadmin"><Plan_List /></ProtectedRoute> },
      { path: OWNER_LIST, element: <ProtectedRoute role="superadmin"><OwnerList /></ProtectedRoute> },
      { path: OWNER_ADD, element: <ProtectedRoute role="superadmin"><OwnerAdd /></ProtectedRoute> },
      { path: OWNER_EDIT, element: <ProtectedRoute role="superadmin"><OwnerEdit /></ProtectedRoute> },
    ],
  },
  {
    path: ADMIN,
    element: <MasterLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: DASHBORD, element: <ProtectedRoute role="admin"><Dashboard /></ProtectedRoute> },
      { path: BUSINESS_SETTING, element: <ProtectedRoute role="admin"><BusinessSetting /></ProtectedRoute> },
    ],
  },
  {
    path: USER,
    element: <MasterLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: DASHBORD, element: <ProtectedRoute role="user"><Dashboard /></ProtectedRoute> },
    ],
  },
  {
    path: STAFF,
    element: <MasterLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: DASHBORD, element: <ProtectedRoute role="staff"><Dashboard /></ProtectedRoute> },
    ],
  },
]);
