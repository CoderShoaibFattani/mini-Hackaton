import Paper from "@mui/material/Paper";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
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
  const [customerData, setCustomerData] = useState({});

  const cData = async () => {
    customerData.map(async (e, i) => {
      await addDoc(collection(db, "customers"), e);
    });
  };

  useEffect(() => {
    cData();
  }, [customerData]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const usersData = await getDocs(collection(db, "users"));
    const userData = usersData.docs.map((doc) => ({
      ...doc.data(),
    }));

    const custData = userData.filter((e) => e.registerFor === "Customer");
    setCustomerData(custData);

    const snapshot = await getDocs(collection(db, "customers"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRows(data);
    console.log(rows);
  };
  const role = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/${role.toLowerCase()}/Customer-Entry/${id}`);
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
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
              <TableCell align="right">
                <EditIcon onClick={() => handleEdit(row.id)} />
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
          onClick={() => navigate("/dashboard/Student-Registration")}
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
