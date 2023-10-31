
import { Box, Typography, Link, CardMedia } from "@mui/material";

function Landing() {
  return (
    <Box
 
      display="flex"
      justifyContent="center" // Horizontally centers the content
      alignItems="center" // Vertically centers the content
      flexDirection="column"
      marginTop={20}
    >
      <CardMedia
        component="img"
        image="alex.png"
        sx={{ maxHeight: 385, maxWidth: 385, borderRadius: "50%" }}
      />
      <Typography color="textPrimary" variant="h2" gutterBottom>
        Hello I'm Alex, and I'm a fullstack web3 developer!
      </Typography>
      <Typography color="textPrimary" variant="h4" gutterBottom>
        Check out my <Link href="/resume">resume</Link> or some of my{" "}
        <Link href="/projects">projects</Link>.
      </Typography>
    </Box>
  );
}

export default Landing;
