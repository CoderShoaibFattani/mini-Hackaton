import { useDispatch } from "react-redux";
import { setUser, setRole } from "../store/slices/userSlice";

import {
  Box,
  Button,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const LogIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userData = await getDoc(
          doc(db, "users", userCredential.user.uid)
        );
        const user = userData.data();
        dispatch(setUser(user));
        dispatch(setRole(user.registrationFor));
        navigate(`/${user.registrationFor.toLowerCase()}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Paper
      elevation={24}
      sx={{ margin: "10px auto", padding: "10px", width: "50vw" }}
    >
      <Grid container spacing={3} padding="20px">
        <Grid item lg={12} xs={12} md={12} sx={{ padding: "10px" }}>
          <Typography
            variant="h3"
            component="p"
            sx={{
              fontSize: "2rem",
              fontWeight: "700",
              textDecoration: "underline",
              textTransform: "uppercase",
              textAlign: "center",
              mb: "30px",
            }}
          >
            Log In Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb="25px">
              <InputLabel sx={{ mb: "10px" }}>Email</InputLabel>
              <TextField
                fullWidth
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mb="25px">
              <InputLabel sx={{ mb: "10px" }}>Password</InputLabel>
              <TextField
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box mb="25px">
              <Button
                variant="contained"
                color="secondary"
                sx={{ fontSize: "20px", left: "40%" }}
                type="submit"
              >
                Login
              </Button>
            </Box>
          </form>

          <Box>
            <Typography
              variant="p"
              component="p"
              mb="25px"
              sx={{ fontSize: "20px", textAlign: "center" }}
            >
              New To Website Click Below
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ fontSize: "20px", left: "40%" }}
              onClick={() => navigate("/")}
            >
              Sign Up
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LogIn;
