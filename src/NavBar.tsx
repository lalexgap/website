import AppBar from "@mui/material/AppBar";

import { Button, Box, Toolbar, IconButton, Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export default function NavBar() {
  const pages = [
    { name: "home", url: "/" },
    { name: "projects", url: "/projects" },
    { name: "resume", url: "/resume" },
  ];
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          {pages.map((page) => (
            <Button
              key={page.name}
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

        <Link color="inherit" href="https://github.com/lalexgap">
          <IconButton color="inherit" edge="end">
            <GitHubIcon />
          </IconButton>
        </Link>
        <Link
          color="inherit"
          href="https://www.linkedin.com/in/alex-gap-7ba83665/"
        >
          <IconButton color="inherit" edge="end">
            <LinkedInIcon />
          </IconButton>
        </Link>
        <Link color="inherit" href="mailto:me@alexgap.ca">
          <IconButton color="inherit" edge="end">
            <EmailIcon />
          </IconButton>
        </Link>
        <Link color="inherit" href="/resume.pdf">
          <IconButton color="inherit" edge="end">
            <PictureAsPdfIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
