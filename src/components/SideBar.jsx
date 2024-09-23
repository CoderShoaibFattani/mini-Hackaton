import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBar = () => {
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
    const path = `/${role.toLowerCase()}/${item.replace(/ /g, "-")}`;
    navigate(path);
  };

  return (
    <Box role="presentation" sx={{ overflow: "scroll" }}>
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
              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <MailOutlineIcon />
                <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
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
                    <Typography sx={{ fontSize: "24px" }}>{subItem}</Typography>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default SideBar;
