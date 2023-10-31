import theme from "../theme";
import { Box, Typography, Link, CardMedia } from "@mui/material";

function Landing() {
  return (
    <Box
      sx={{ backgroundColor: theme.palette.background.default }}
      display="flex"
      justifyContent="center" // Horizontally centers the content
      alignItems="center" // Vertically centers the content
      height="100vh" // Takes the full height of the viewport
      flexDirection="column"
    >
      <CardMedia
        component="img"
        image="alex.png"
        sx={{ maxHeight: 385, maxWidth: 385, borderRadius: "50%" }}
      />
      <Typography color="textPrimary" variant="h2" gutterBottom>
        Hello I'm Alex! Check out my <Link href="/resume">resume</Link> or some
        of my <Link href="/projects">projects</Link>.
      </Typography>
    </Box>
  );
}

export default Landing;
