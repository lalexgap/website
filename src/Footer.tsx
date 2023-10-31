import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt={1}
    >
      <Typography color="textPrimary" variant="caption">
        This website has been lovingly crafted by myself. Check out the{" "}
        <Link href="https://github.com/lalexgap/website">source code</Link>.
      </Typography>
    </Box>
  );
}
