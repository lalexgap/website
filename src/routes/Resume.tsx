import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Box, Button, Container } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
const GITHUB_RESUME_URL =
  "https://raw.githubusercontent.com/lalexgap/resume/main/resume.md";

function Resume() {
  const [resumeMarkdown, setResumeMarkdown] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetResumeMarkdown = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(GITHUB_RESUME_URL);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const text = await response.text();
        setResumeMarkdown(text);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        console.error("Error fetching resume:", errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetResumeMarkdown();
  }, []);

  return (
    <Container
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
      >
        Download a PDF copy
        <PictureAsPdfIcon sx={{ ml: 1 }} />
      </Button>
      <Box
        sx={(theme) => ({
          background: "white",
          p: "1rem",
          my: 1,
          borderRadius: "5px",
          fontFamily: "arial",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          [theme.breakpoints.down("md")]: {
            width: "100%",
            mx: 0,
            boxShadow: "none",
            borderRadius: "0px",
          },
        })}
      >
        {isLoading && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            Loading resume...
          </div>
        )}

        {error && (
          <div style={{ color: "red", textAlign: "center", padding: "2rem" }}>
            Error loading resume: {error}
          </div>
        )}

        {!isLoading && !error && resumeMarkdown && (
          <Markdown>{resumeMarkdown}</Markdown>
        )}

        {!isLoading && !error && !resumeMarkdown && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            No resume content available
          </div>
        )}
      </Box>
    </Container>
  );
}
export default Resume;
