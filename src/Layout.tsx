import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import NavBar from "./NavBar";
import Footer from "./Footer";
import theme from "./theme";

export default function Layout() {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        flex: 1,
      }}
    >
      <NavBar />
      <Container component="main" sx={{ flex: 1, mb: "auto", mt: 8 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}
