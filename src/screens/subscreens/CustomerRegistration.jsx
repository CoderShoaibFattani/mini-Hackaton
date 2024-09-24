import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomerRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.role);

  const getData = () => {
    if (id) {
      const dataFromLS = localStorage.getItem("customerData");
      const customerData = JSON.parse(dataFromLS);
      if (customerData) {
        setFirstName(customerData.firstName);
        setLastName(customerData.lastName);
        setEmail(customerData.email);
        setPhoneNumber(customerData.phoneNumber);
        setIsEditing(true);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [id]); // Run this effect when `id` changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update existing customer
        await updateDoc(doc(db, "customers", id), {
          firstName,
          lastName,
          email,
          phoneNumber,
        });
        alert("Customer details updated successfully!");
      } else {
        // Add new customer
        await addDoc(collection(db, "customers"), {
          firstName,
          lastName,
          email,
          phoneNumber,
        });
        alert("New customer added successfully!");
      }

      navigate(`/${role.toLowerCase()}/Customer-List`); // Redirect after submission
    } catch (e) {
      console.error("Error adding/updating document: ", e);
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
        {isEditing ? "Edit Customer" : "Customer Registration Form"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>First Name</InputLabel>
          <TextField
            fullWidth
            required
            type="text"
            value={firstName} // Bind to firstName state
            onChange={(e) => setFirstName(e.target.value)} // Update state on change
          />
        </Box>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>Last Name</InputLabel>
          <TextField
            fullWidth
            required
            type="text"
            value={lastName} // Bind to lastName state
            onChange={(e) => setLastName(e.target.value)} // Update state on change
          />
        </Box>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>Email</InputLabel>
          <TextField
            fullWidth
            required
            type="email"
            value={email} // Bind to email state
            onChange={(e) => setEmail(e.target.value)} // Update state on change
          />
        </Box>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>Phone Number</InputLabel>
          <TextField
            fullWidth
            required
            type="text"
            value={phoneNumber} // Bind to phoneNumber state
            onChange={(e) => setPhoneNumber(e.target.value)} // Update state on change
          />
        </Box>

        <Box mb="25px">
          <Button
            variant="contained"
            color="secondary"
            sx={{ fontSize: "20px", left: "40%" }}
            type="submit"
          >
            {isEditing ? "Update Customer" : "Add Customer"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CustomerRegistration;
