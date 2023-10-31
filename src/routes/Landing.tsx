import { Box, Typography, Link, CardMedia } from "@mui/material";

function Landing() {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{ px: 2 }}
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
      <Typography color="primary" variant="h3">
        Alex Gap
      </Typography>
      <Typography color="textSecondary" variant="h3" gutterBottom>
        full-stack web3 developer
      </Typography>
      <Typography color="textPrimary" variant="body1">
        Check out my <Link href="/resume">resume</Link> or some of the{" "}
        <Link href="/projects">projects</Link> I've worked on.
      </Typography>
    </Box>
  );
}

export default Landing;
