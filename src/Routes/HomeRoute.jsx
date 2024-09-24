import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const HomeRoute = () => {
  const role = useSelector((state) => state.user.role);
  // const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Check if user is logged in

  // If user is not authenticated, allow them to go to login/sign-up
  if (!isAuthenticated) return <Outlet />;

  // If authenticated, redirect to the correct panel based on role
  return <Navigate to={`/${role.toLowerCase()}`} />;
};

export default HomeRoute;
