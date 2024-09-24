import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/slices/userSlice";

const settings = ["Logout"];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => () => {
    setOpen(!open);
  };

  const role = useSelector((state) => state.user.role);

  const Admin = [
    { Customers: ["Customer List"] },
    { Rooms: ["Rooms List"] },
    { Bookings: ["Booking List"] },
    { Payments: ["Payment List"] },
    { Staff: ["Staff List"] },
    { Services: ["Service List"] },
    { Inventory: ["Inventory List"] },
    { Reports: ["View Reports", "Report Generation"] },
    { Profile: ["Profile Management"] },
  ];

  const Manager = [
    { Rooms: ["Rooms List"] },
    { Bookings: ["Booking List"] },
    { Payments: ["Payment List"] },
    { Staff: ["Staff List"] },
    { Services: ["Service List"] },
    { Inventory: ["Inventory List"] },
    { Reports: ["View Reports", "Report Generation"] },
  ];

  const Staff = [
    { Rooms: ["Rooms List"] },
    { Bookings: ["Booking List"] },
    { Services: ["Service List"] },
    { Inventory: ["Inventory List"] },
  ];

  const Customer = [
    { Rooms: ["View Room", "Book Room"] },
    { Payment: ["View Invoice", "Make Payment"] },
    { Services: ["Service List", "Book Service"] },
  ];

  let data = [];

  role === "Admin"
    ? (data = Admin)
    : role === "Manager"
    ? (data = Manager)
    : role === "Staff"
    ? (data = Staff)
    : role === "Customer"
    ? (data = Customer)
    : (data = []);

  const navigate = useNavigate();

  const handleNavigation = (item) => {
    const path = `/dashboard/${item.replace(/ /g, "-")}`;
    // toggleDrawer();
    navigate(path);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "15px",
        }}
      >
        <CloseIcon onClick={toggleDrawer()} />
      </Box>
      <Box>
        {data.map((e, i) => {
          const category = Object.keys(e);
          const items = e[category];

          return (
            <Accordion key={i}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${i}a-content`}
                id={`panel${i}a-header`}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <MailOutlineIcon />
                  <Typography sx={{ fontSize: "1.3rem" }}>
                    {category}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ margin: "0", padding: "0 0 0 45px" }}>
                <List sx={{ margin: "0", padding: "0" }}>
                  {items.map((subItem, subIndex) => (
                    <ListItem
                      key={subIndex}
                      button
                      onClick={() => handleNavigation(subItem)}
                    >
                      <ListItemText primary={subItem} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logOut());
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "darkblue" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SchoolIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              HOTEL MANAGEMENT SYSTEM
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer()}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <SchoolIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              HOTEL MANAGEMENT SYSTEM
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="user Image"
                    sx={{ backgroundColor: "darkblue" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      sx={{ textAlign: "center" }}
                      onClick={handleLogout}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            marginTop: "64px", // Adjust this value based on your AppBar height
            height: "calc(100% - 64px)",
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
}
export default ResponsiveAppBar;
