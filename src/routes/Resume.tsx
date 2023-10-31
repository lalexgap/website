import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Box, Button, Container, Link } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
const GITHUB_RESUME_URL =
  "https://raw.githubusercontent.com/lalexgap/resume/main/resume.md";

function Resume(): React.ReactElement {
  const [resumeMarkdown, setResumeMarkdown] = useState("");
  useEffect(() => {
    const fetchAndSetResumeMarkdown = async () => {
      const response = await fetch(GITHUB_RESUME_URL);
      setResumeMarkdown(await response.text());
    };
    fetchAndSetResumeMarkdown();
  });

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "1rem",
      }}
    >
      <Link color="inherit" href="/resume.pdf">
        <Button color="inherit">
          Download a PDF copy
          <PictureAsPdfIcon />
        </Button>
      </Link>
      <Box
        sx={{
          padding: "1rem",
          background: "white",
          marginTop: "1rem",
          borderRadius: 1,
          fontPalette: "text.primary",
          fontFamily: "monospace",
          border: "5px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Markdown>{resumeMarkdown}</Markdown>
      </Box>
    </Container>
  );
}
export default Resume;
