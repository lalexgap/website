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
      <Link color="inherit" href="/resume.pdf">
        <Button color="inherit">
          Download a PDF copy
          <PictureAsPdfIcon />
        </Button>
      </Link>
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
        <Markdown>{resumeMarkdown}</Markdown>
      </Box>
    </Container>
  );
}
export default Resume;
