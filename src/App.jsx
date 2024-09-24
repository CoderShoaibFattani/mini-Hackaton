import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { setUser, setRole, setAuthenticated } from "./store/slices/userSlice";
// import { auth } from "./config/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "./config/firebase";

import SignUp from "./screens/SignUp";
import LogIn from "./screens/LogIn";
import AdminPanel from "./components/panels/AdminPanel";
import ManagerPanel from "./components/panels/ManagerPanel";
import StaffPanel from "./components/panels/StaffPanel";
import CustomerPanel from "./components/panels/CustomerPanel";
import CustomerList from "./screens/subscreens/CustomerList";
import HomeRoute from "./Routes/HomeRoute";
import User from "./Routes/User";
import CustomerRegistration from "./screens/subscreens/CustomerRegistration";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user and role exist in localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedRole) {
      // Set user and role in Redux
      dispatch(setUser(storedUser));
      dispatch(setRole(storedRole));
      dispatch(setAuthenticated(true)); // Mark the user as authenticated
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<HomeRoute />}>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Route>
      <Route element={<User />}>
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="Customer-List" element={<CustomerList />} />
          <Route path="Customer-Entry/:id" element={<CustomerRegistration />} />
          <Route path="Customer-Entry" element={<CustomerRegistration />} />
        </Route>
        <Route path="/manager" element={<ManagerPanel />} />
        <Route path="/staff" element={<StaffPanel />} />
        <Route path="/customer" element={<CustomerPanel />} />
      </Route>
    </Routes>
  );
};

export default App;
