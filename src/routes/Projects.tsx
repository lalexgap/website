import {
  Card,
  CardContent,
  Link,
  Typography,
  Container,
  Box,
  IconButton,
  Fade,
  Chip,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useCarousel } from "../hooks/useCarousel";
import { PROJECTS } from "../constants/projects";
import LazyImage from "../components/LazyImage";

function Projects() {
  const {
    currentIndex,
    goTo,
    goToNext,
    goToPrevious,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  } = useCarousel(PROJECTS.length, { autoPlay: false });

  const currentProject = PROJECTS[currentIndex];

  const navButtonStyles = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      transform: "scale(1.1)",
    },
    "&:focus-visible": {
      outline: "2px solid white",
      outlineOffset: "2px",
    },
  };

  return (
    <Container component="section" aria-label="Projects showcase">
      <Box
        sx={{
          paddingTop: { xs: 2, md: 5 },
          minHeight: { xs: "70vh", md: "77vh" },
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Project carousel"
        aria-roledescription="carousel"
        aria-live="polite"
      >
        <IconButton
          onClick={goToPrevious}
          aria-label="Previous project"
          sx={{
            position: "absolute",
            left: { xs: 0, sm: 8, md: 16 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 3,
            ...navButtonStyles,
          }}
        >
          <ArrowBack />
        </IconButton>

        <Fade in key={currentIndex} timeout={300}>
          <Card
            sx={{
              backgroundColor: "transparent",
              width: "100%",
              maxWidth: "800px",
              boxShadow: "none",
              border: "none",
            }}
            aria-label={`${currentIndex + 1} of ${PROJECTS.length}`}
          >
            <LazyImage
              src={currentProject.image}
              alt={currentProject.name}
              maxHeight={{ xs: "40vh", sm: "50vh", md: "60vh" }}
            />
            <CardContent
              sx={(theme) => ({
                mt: 2,
                border: `2px solid ${theme.palette.primary.main}`,
                backgroundColor: theme.palette.background.paper,
                borderRadius: "8px",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              })}
            >
              <Container>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}
                >
                  <Link
                    href={currentProject.link}
                    aria-label={`Learn more about ${currentProject.name}`}
                  >
                    {currentProject.name}
                  </Link>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    lineHeight: 1.6,
                  }}
                >
                  {currentProject.description}
                </Typography>
                <Chip
                  label={`${currentIndex + 1} / ${PROJECTS.length}`}
                  size="small"
                  sx={{ mt: 1, fontSize: "0.75rem" }}
                  aria-hidden="true"
                />
              </Container>
            </CardContent>
          </Card>
        </Fade>

        <IconButton
          onClick={goToNext}
          aria-label="Next project"
          sx={{
            position: "absolute",
            right: { xs: 0, sm: 8, md: 16 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 3,
            ...navButtonStyles,
          }}
        >
          <ArrowForward />
        </IconButton>

        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 10, md: 20 },
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "center",
            px: 2,
          }}
          role="tablist"
          aria-label="Project navigation"
        >
          {PROJECTS.map((project, index) => (
            <Box
              key={index}
              onClick={() => goTo(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goTo(index);
                }
              }}
              tabIndex={0}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to ${project.name}`}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor:
                  index === currentIndex ? "primary.main" : "grey.400",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "primary.light",
                  transform: "scale(1.2)",
                },
                "&:focus-visible": {
                  outline: "2px solid white",
                  outlineOffset: "2px",
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default Projects;
