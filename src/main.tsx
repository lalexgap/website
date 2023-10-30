import React from "react";
import ReactDOM from "react-dom/client";
import Landing from "./routes/Landing.tsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Resume from "./routes/Resume.tsx";
import Projects from "./routes/Projects.tsx";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { GlobalStyle } from "./style.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/resume",
    element: <Resume />,
  },
  { path: "/projects", element: <Projects /> },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
