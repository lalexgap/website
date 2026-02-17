import { Box, Typography, Link, CardMedia } from "@mui/material";

function About() {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{ px: 2 }}
    >
      <Box
        display="flex"
        maxWidth={600}
        alignItems="center"
        flexDirection="column"
        pb={2}
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
        <Typography variant="h3" align="center">
          Alex Gap
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          full-stack developer
        </Typography>
        <Typography color="textPrimary" variant="body1" py={1}>
          I'm a full-stack developer located in Squamish, BC, Canada. I
          currently work at{" "}
          <Link href="https://www.producthunt.com/@lagap">Product Hunt</Link> as
          a software engineer. Check out some of the cool{" "}
          <Link href="/projects">projects I've worked on</Link>.
        </Typography>
      </Box>
    </Box>
  );
}

export default About;
