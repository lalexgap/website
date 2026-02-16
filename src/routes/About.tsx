import { Box, Typography, Link, CardMedia, Fade } from "@mui/material";

export default function About() {
  return (
    <Fade in timeout={500}>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        sx={{ px: { xs: 2, sm: 3, md: 4 } }}
        component="article"
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
            alt="Alex Gap - Full-stack developer"
            sx={{
              maxHeight: { xs: 250, sm: 320, md: 385 },
              maxWidth: { xs: 250, sm: 320, md: 385 },
              borderRadius: "50%",
              padding: 2,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          />
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
              wordBreak: "break-word",
            }}
          >
            Alex Gap
          </Typography>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
              wordBreak: "break-word",
            }}
          >
            full-stack developer
          </Typography>
          <Typography
            color="textPrimary"
            variant="body1"
            py={1}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            I'm a full-stack developer located in Squamish, BC, Canada. I
            currently work at{" "}
            <Link
              href="https://www.producthunt.com/@lagap"
              aria-label="Visit Product Hunt profile"
            >
              Product Hunt
            </Link>{" "}
            as a software engineer. Check out some of the cool{" "}
            <Link href="/projects" aria-label="View projects">
              projects I've worked on
            </Link>
            .
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
}
