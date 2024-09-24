import Paper from "@mui/material/Paper";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";

function DataTable() {
  const [rows, setRows] = useState([]);
  const role = useSelector((state) => state.user.role);

  const getData = async () => {
    try {
      // Fetching users with the "Customer" role from the "users" collection
      const usersQuery = query(
        collection(db, "users"),
        where("registrationFor", "==", "Customer")
      );
      const usersSnapshot = await getDocs(usersQuery);
      const userData = usersSnapshot.docs.map((doc) => ({
        id: doc.id, // Using Firestore document ID as unique identifier
        ...doc.data(),
      }));

      // Add customer data to the "customers" collection if not already added
      const customersSnapshot = await getDocs(collection(db, "customers"));
      const existingCustomers = customersSnapshot.docs.map((doc) => doc.data());

      for (const customer of userData) {
        const customerExists = existingCustomers.some(
          (c) => c.id === customer.id // Check for unique ID instead of email
        );
        if (!customerExists) {
          // Use setDoc with a specific doc ID to avoid duplicates (using customer's unique id)
          const customerRef = doc(collection(db, "customers"), customer.id);
          await setDoc(customerRef, customer);
        }
      }

      // Fetch updated customer data from "customers" collection
      const updatedCustomerSnapshot = await getDocs(
        collection(db, "customers")
      );
      const customerList = updatedCustomerSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Setting the data in rows state to display in the table
      setRows(customerList);
    } catch (error) {
      console.error("Error fetching or adding customer data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  const handleEdit = (id, obj) => {
    // Redirect user to the Customer Registration page for editing
    const jsonObj = JSON.stringify(obj);
    localStorage.setItem("customerData", jsonObj);
    navigate(`/${role.toLowerCase()}/Customer-Entry/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      // Delete the customer from the "customers" collection
      const customerRef = doc(db, "customers", id);
      await deleteDoc(customerRef);

      const userRef = doc(db, "users", id);
      await deleteDoc(userRef);

      // Optionally, refetch the customer data to refresh the table after deletion
      getData();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone Number</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.lastName}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.phoneNumber}</TableCell>
              <TableCell align="center">
                <EditIcon onClick={() => handleEdit(row.id, row)} />
                <DeleteIcon onClick={() => handleDelete(row.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const CustomerList = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.role);

  return (
    <Box margin="20px auto" sx={{ position: "relative" }}>
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
        Customers List
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "40px 60px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(`/${role.toLowerCase()}/Customer-Entry`)}
        >
          Add
        </Button>
      </Box>
      <Box>
        <DataTable />
      </Box>
    </Box>
  );
};

export default CustomerList;
