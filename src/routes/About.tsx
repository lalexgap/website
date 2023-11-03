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
          Hi! My name is Alex, and I'm a full-stack developer located in
          Squamish, BC, Canada. I have over a decade in software development and
          more than six years in web3 development. I currently work with the{" "}
          <Link href="https://statechannels.org/team/">
            State Channels team
          </Link>{" "}
          which is funded by{" "}
          <Link href="https://www.mesh.xyz/">Consensys Mesh</Link>.
        </Typography>
        <Typography color="textPrimary" variant="body1" py={1}>
          I love building and using open and decentralized technologies! Check
          out some of cool the <Link href="/projects">projects</Link> I've
          worked on. Or check out the etheurem{" "}
          <Link href="https://www.beaconcha.in/validator/835956f9b6475e055b346c029756b3746a53cfda875b8a1cfe93722b937b93d4ca7334a147201d1673fa0d0c9252d8c9">
            validator node
          </Link>{" "}
          I manage and run.
        </Typography>
      </Box>
    </Box>
  );
}

export default About;
