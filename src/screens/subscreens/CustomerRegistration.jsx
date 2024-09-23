import {
  Box,
  Button,
  // FormControlLabel,
  InputLabel,
  // Radio,
  // RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate, useParams } from "react-router-dom";

const CustomerRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState("");

  const { id } = useParams();

  const getData = async () => {
    const data = await getDoc(doc(db, "customers", id));
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
    setPhone(data.phoneNumber);
    try {
      if (data) {
        await updateDoc(doc(db, "customers", id));
      }
      const docRef = await addDoc(collection(db, "customers"), {
        firstName,
        lastName,
        email,
        phone,
      });
      console.log("Document written with ID: ", docRef.id);
      const customerId = docRef.id;
      localStorage.setItem("customerId", customerId);
      navigate("/dashboard/roombooking");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <Box width="50%" margin="20px auto">
      <Typography
        variant="h3"
        component="p"
        sx={{
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center",
          mb: "30px",
        }}
      >
        Customer Registration Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>First Name</InputLabel>
          <TextField
            fullWidth
            required
            type="text"
            value={data.firstName}
            // onChange={(e) => setFirstName(e.target.value)}
          />
        </Box>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>Last Name</InputLabel>
          <TextField
            fullWidth
            required
            type="text"
            value={data.lastName}
            // onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>Email</InputLabel>
          <TextField
            fullWidth
            required
            type="email"
            value={data.email}
            // onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>Phone Number</InputLabel>
          <TextField
            fullWidth
            required
            type="text"
            value={data.phoneNumber}
            // onChange={(e) => setPhone(e.target.value)}
          />
        </Box>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>Address</InputLabel>
          <TextField
            fullWidth
            required
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Box>

        <Box mb="25px">
          <Button
            variant="contained"
            color="secondary"
            sx={{ fontSize: "20px", left: "40%" }}
            type="submit"
          >
            Book Room
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CustomerRegistration;
