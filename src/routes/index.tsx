import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// layouts

import DashboardLayout from "../layouts/dashboard";

// guards
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from "../components/LoadingScreen";
import { ROOTS_DASHBOARD } from "./paths";

// ----------------------------------------------------------------------

const Loadable = (Component: React.ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes(ROOTS_DASHBOARD);

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: "login-unprotected", element: <Login /> },
        { path: "register-unprotected", element: <Register /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "verify", element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: ROOTS_DASHBOARD,
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          element: <Navigate to={`${ROOTS_DASHBOARD}/app`} replace />,
        },
        // Main Routes
        {
          path: "*",
          children: [
            { path: "coming-soon", element: <ComingSoon /> },
            { path: "500", element: <Page500 /> },
            { path: "404", element: <ComingSoon /> },
            { path: "*", element: <Navigate to="/404" replace /> },
          ],
        },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import("../pages/authentication/Login")));
const Register = Loadable(
  lazy(() => import("../pages/authentication/Register"))
);
const ResetPassword = Loadable(
  lazy(() => import("../pages/authentication/ResetPassword"))
);
const VerifyCode = Loadable(
  lazy(() => import("../pages/authentication/VerifyCode"))
);

const ComingSoon = Loadable(lazy(() => import("../pages/ComingSoon")));
const Page500 = Loadable(lazy(() => import("../pages/Page500")));
