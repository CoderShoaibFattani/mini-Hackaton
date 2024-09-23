import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { setUser, setRole } from "./store/slices/userSlice";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import SignUp from "./screens/SignUp";
import LogIn from "./screens/LogIn";
import AdminPanel from "./components/panels/AdminPanel";
import ManagerPanel from "./components/panels/ManagerPanel";
import StaffPanel from "./components/panels/StaffPanel";
import CustomerPanel from "./components/panels/CustomerPanel";
import CustomerList from "./screens/subscreens/CustomerList";
import HomeRoute from "./Routes/HomeRoute";
import User from "./Routes/User";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import CustomerRegistration from "./screens/subscreens/CustomerRegistration";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userCredential) => {
      if (userCredential) {
        const userData = await getDoc(doc(db, "users", userCredential.uid));
        const user = userData.data();
        dispatch(setUser(user));
        dispatch(setRole(user.registrationFor));
      } else {
        dispatch(setUser(null));
        dispatch(setRole(null));
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
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
        </Route>
        <Route path="/manager" element={<ManagerPanel />} />
        <Route path="/staff" element={<StaffPanel />} />
        <Route path="/customer" element={<CustomerPanel />} />
      </Route>
    </Routes>
  );
};

export default App;
