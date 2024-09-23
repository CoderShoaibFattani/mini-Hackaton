import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const HomeRoute = () => {
  const role = useSelector((state) => state.user.role);
  const user = useSelector((state) => state.user.user);
  return !user ? <Outlet /> : <Navigate to={`/${role.toLowerCase()}`} />;
};

export default HomeRoute;
