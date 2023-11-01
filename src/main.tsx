import React from "react";
import ReactDOM from "react-dom/client";
import About from "./routes/About.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Resume from "./routes/Resume.tsx";
import Projects from "./routes/Projects.tsx";
import "./index.css";
import theme from "./theme";
import NavBar from "./NavBar.tsx";
import { Box, Container } from "@mui/material";
import Footer from "./Footer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,

          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",

          flex: 1,
        }}
      >
        <BrowserRouter>
          <NavBar />
          <Container component="main" sx={{ flex: 1, mb: "auto" }}>
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </Container>
          <Footer />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  </React.StrictMode>,
);
