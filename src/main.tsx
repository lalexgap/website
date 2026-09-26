import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import About from "./routes/About";
import Resume from "./routes/Resume";
import Projects from "./routes/Projects";
import NotFound from "./routes/NotFound";
import Layout from "./Layout";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <About /> },
      { path: "/about", element: <Navigate to="/" replace /> },
      { path: "/resume", element: <Resume /> },
      { path: "/projects", element: <Projects /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
