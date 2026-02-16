import Markdown from "react-markdown";
import {
  Box,
  Button,
  Container,
  Typography,
  Skeleton,
  Alert,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useFetch } from "../hooks/useFetch";

const GITHUB_RESUME_URL =
  "https://raw.githubusercontent.com/lalexgap/resume/main/resume.md";

function Resume(): React.ReactElement {
  const {
    data: resumeMarkdown,
    isLoading,
    error,
  } = useFetch<string>(GITHUB_RESUME_URL);

  return (
    <Container
      component="article"
      aria-label="Resume"
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 1,
        [theme.breakpoints.down("md")]: {
          width: "100%",
          mx: 0,
          px: 0,
        },
      })}
    >
      <Button
        color="inherit"
        component="a"
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ mb: 2 }}
        aria-label="Download resume as PDF"
        startIcon={<PictureAsPdfIcon />}
      >
        Download a PDF copy
      </Button>

      <Box
        sx={(theme) => ({
          background: "white",
          p: { xs: 2, md: "1rem" },
          my: 1,
          borderRadius: "8px",
          fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          width: "100%",
          maxWidth: "900px",
          [theme.breakpoints.down("md")]: {
            mx: 0,
            boxShadow: "none",
            borderRadius: "0px",
          },
          "@media print": {
            boxShadow: "none",
            borderRadius: 0,
          },
        })}
      >
        {isLoading && (
          <Box sx={{ p: 4 }}>
            <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="80%" sx={{ mb: 3 }} />
            <Skeleton variant="text" height={30} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="60%" />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ m: 2 }}>
            Error loading resume: {error}
          </Alert>
        )}

        {!isLoading && !error && resumeMarkdown && (
          <Box
            sx={{
              "& h1, & h2, & h3, & h4": { mt: 2, mb: 1 },
              "& p": { mb: 1 },
              "& ul": { pl: 3, mb: 1 },
              "& li": { mb: 0.5 },
            }}
          >
            <Markdown>{resumeMarkdown}</Markdown>
          </Box>
        )}

        {!isLoading && !error && !resumeMarkdown && (
          <Typography align="center" sx={{ p: 4 }}>
            No resume content available
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default Resume;
