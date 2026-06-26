import LandingPage from "../features/landing/screens/LandingPage";
import ForgotPassword from "../features/landing/screens/ForgotPassword";
import ResetPassword from "../features/landing/screens/ResetPassword";

const publicRoutes = [
  {
    path: "/", element: <LandingPage />,
  },
  {
    path: "/forgot-password", element: <ForgotPassword />,
  },
  {
    path: "/reset-password", element: <ResetPassword />,
  },
];

export default publicRoutes;
