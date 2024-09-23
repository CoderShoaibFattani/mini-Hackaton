import { Grid } from "@mui/material";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import SideBar from "../../components/SideBar";
import { Outlet } from "react-router-dom";

const AdminPanel = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Grid container>
        <Grid
          item
          lg={3}
          md={3}
          sx={{
            display: {
              md: "inline-block",
              sm: "none",
              xs: "none",
              lg: "inline-block",
              xl: "inline-block",
            },
          }}
        >
          <SideBar />
        </Grid>
        <Grid item lg={9} md={9} xs={12} sm={12}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminPanel;
