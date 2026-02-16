import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Box, Container, CircularProgress } from "@mui/material";
import "./index.css";
import theme from "./theme";
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";
import SkipLink from "./components/SkipLink.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

// Lazy load route components for performance
const About = lazy(() => import("./routes/About.tsx"));
const Resume = lazy(() => import("./routes/Resume.tsx"));
const Projects = lazy(() => import("./routes/Projects.tsx"));
const NotFound = lazy(() => import("./routes/NotFound.tsx"));

// Loading fallback component
function PageLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
      }}
      role="status"
      aria-live="polite"
    >
      <CircularProgress
        size={60}
        thickness={4}
        aria-label="Loading page content"
      />
    </Box>
  );
}

function App() {
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
      <BrowserRouter>
        <SkipLink />
        <NavBar />
        <Container
          component="main"
          id="main-content"
          sx={{ flex: 1, mb: "auto", mt: 8 }}
          tabIndex={-1}
        >
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<About />} />
                <Route path="/about" element={<Navigate to="/" replace />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </Container>
        <Footer />
      </BrowserRouter>
    </Box>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
