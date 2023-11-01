import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        mt: "auto",
        px: 2,
        pt: 1,

        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Typography color="textPrimary" variant="caption">
        This website has been lovingly hand-crafted and self-hosted. Check out
        the <Link href="https://github.com/lalexgap/website">source code</Link>.
      </Typography>
    </Box>
  );
}
