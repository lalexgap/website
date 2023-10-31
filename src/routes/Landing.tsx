import { Box, Typography, Link, CardMedia } from "@mui/material";

function Landing() {
  return (
    <Box
      display="flex"
      justifyContent="center" // Horizontally centers the content
      alignItems="center" // Vertically centers the content
      flexDirection="column"
    >
      <CardMedia
        component="img"
        image="alex.png"
        sx={{
          maxHeight: 385,
          maxWidth: 385,
          borderRadius: "50%",
          padding: 2,
        }}
      />
      <Typography color="textPrimary" variant="h1" gutterBottom>
        Alex Gap
      </Typography>
      <Typography color="textSecondary" variant="h2" gutterBottom>
        full-stack web3 developer
      </Typography>
      <Typography color="textPrimary" variant="h4" gutterBottom>
        Check out my <Link href="/resume">resume</Link> or some of the{" "}
        <Link href="/projects">projects</Link> I've worked on.
      </Typography>
    </Box>
  );
}

export default Landing;
