import { Box, Typography, Link, CardMedia } from "@mui/material";

function About() {
  const emphasize = (text: string) => (
    <Box
      component="span"
      sx={(theme) => ({ color: theme.palette.text.secondary })}
    >
      {text}
    </Box>
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{ px: 2 }}
    >
      <Box
        display="flex"
        maxWidth={800}
        alignItems="center"
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
        <Typography variant="h3" align="center">
          Alex Gap
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          full-stack developer
        </Typography>
        <Typography color="textPrimary" variant="body1" py={1}>
          Hi! I'm Alex and I'm a full-stack developer based out of Squamish, BC,
          Canada. I have over 10 years experience in software development and
          over 6 years of experience with web3 development. I have experience
          with a wide range of technologies, including {emphasize("react")},{" "}
          {emphasize("typescript")}, {emphasize("golang")}, and{" "}
          {emphasize("solidity")}, and I'm always eager to learn new things.
        </Typography>
        <Typography color="textPrimary" variant="body1" py={1}>
          I love building and using open and decentralized technologies. I've{" "}
          <Link href="https://github.com/lalexgap">contributed</Link> to
          multiple open source projects and I also run my own ethereum{" "}
          <Link href="https://www.beaconcha.in/validator/835956f9b6475e055b346c029756b3746a53cfda875b8a1cfe93722b937b93d4ca7334a147201d1673fa0d0c9252d8c9">
            validator node
          </Link>
          .
        </Typography>
      </Box>
    </Box>
  );
}

export default About;
