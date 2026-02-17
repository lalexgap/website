import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./routes/About";
import Resume from "./routes/Resume";
import Projects from "./routes/Projects";
import Layout from "./Layout";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <About /> },
      { path: "/about", element: <About /> },
      { path: "/resume", element: <Resume /> },
      { path: "/projects", element: <Projects /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
