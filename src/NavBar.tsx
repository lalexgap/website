import AppBar from "@mui/material/AppBar";

import { Button, Box, Toolbar, IconButton, Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export default function NavBar() {
  const pages = [
    { name: "about", url: "/" },
    { name: "projects", url: "/projects" },
    { name: "resume", url: "/resume" },
  ];
  return (
    <AppBar
      position="sticky"
      sx={{
        width: "100vw",
        left: 0,
        right: 0,
        top: 0,
        margin: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: "none",
          padding: 0,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
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

        <Box sx={{ display: "flex", gap: 1, paddingRight: 5 }}>
          <Link
            color="inherit"
            href="https://github.com/lalexgap"
            title="Github Profile"
          >
            <IconButton color="inherit">
              <GitHubIcon />
            </IconButton>
          </Link>
          <Link
            color="inherit"
            href="https://www.linkedin.com/in/alex-gap-7ba83665/"
            title="LinkedIn Profile"
          >
            <IconButton color="inherit">
              <LinkedInIcon />
            </IconButton>
          </Link>
          <Link color="inherit" title="Email" href="mailto:me@alexgap.ca">
            <IconButton color="inherit">
              <EmailIcon />
            </IconButton>
          </Link>
          <Link color="inherit" href="/resume.pdf" title="Resume PDF">
            <IconButton color="inherit">
              <PictureAsPdfIcon />
            </IconButton>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
