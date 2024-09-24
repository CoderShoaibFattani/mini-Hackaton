import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const User = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Check login state

  // If user is authenticated, allow access to the protected routes
  if (isAuthenticated) return <Outlet />;

  // Otherwise, redirect to login
  return <Navigate to="/login" />;
};

export default User;
