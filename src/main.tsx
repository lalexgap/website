import React from "react";
import ReactDOM from "react-dom/client";
import Landing from "./routes/Landing.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Resume from "./routes/Resume.tsx";
import Projects from "./routes/Projects.tsx";
import "./index.css";
import theme from "./theme";
import AppBar from "@mui/material/AppBar";
import { Link as RouterLink } from "react-router-dom";
import { Button, Box, Toolbar } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                component={RouterLink}
                sx={{ my: 2, color: "white", display: "block" }}
                to="/"
              >
                Home
              </Button>
              <Button
                component={RouterLink}
                sx={{ my: 2, color: "white", display: "block" }}
                to="/projects"
              >
                Projects
              </Button>
              <Button
                component={RouterLink}
                sx={{ my: 2, color: "white", display: "block" }}
                to="/resume"
              >
                Resume
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
