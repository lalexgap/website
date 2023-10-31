import React from "react";
import ReactDOM from "react-dom/client";
import Landing from "./routes/Landing.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Resume from "./routes/Resume.tsx";
import Projects from "./routes/Projects.tsx";
import "./index.css";
import theme from "./theme";
import NavBar from "./NavBar.tsx";
import { Box } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          width: "100vw",
          height: "100vh",
          margin: 0,
          padding: 0,
          overflow: "auto",
        }}
      >
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  </React.StrictMode>
);
