import { Button } from "@mui/material";

/**
 * Skip to main content link for accessibility
 * Allows keyboard users to skip navigation and go directly to main content
 */
export default function SkipLink() {
  return (
    <Button
      component="a"
      href="#main-content"
      sx={{
        position: "absolute",
        top: "-100px",
        left: 0,
        zIndex: 10000,
        backgroundColor: "primary.main",
        color: "white",
        p: 2,
        borderRadius: 0,
        textDecoration: "none",
        "&:focus": {
          top: 0,
        },
      }}
    >
      Skip to main content
    </Button>
  );
}
