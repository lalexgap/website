import AppBar from "@mui/material/AppBar";

import { Button, Box, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
export default function NavBar() {
  const pages = [
    { name: "home", url: "/" },
    { name: "projects", url: "/projects" },
    { name: "resume", url: "/resume" },
  ];
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              component={NavLink}
              sx={(theme) => ({
                my: 2,
                color: "white",
                display: "block",
                "&.active": {
                  backgroundColor: theme.palette.action.selected,
                },
              })}
              to={page.url}
            >
              {page.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
