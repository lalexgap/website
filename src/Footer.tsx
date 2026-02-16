import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        mt: "auto",
        px: 2,
        py: 2,
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Typography
        color="textPrimary"
        variant="caption"
        component="p"
        align="center"
      >
        © {currentYear} Alex Gap. This website has been lovingly hand-crafted
        and self-hosted. Check out the{" "}
        <Link
          href="https://github.com/lalexgap/website"
          aria-label="View source code on GitHub"
        >
          source code
        </Link>
        .
      </Typography>
    </Box>
  );
}
