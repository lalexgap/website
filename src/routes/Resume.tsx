import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Box, Button } from "@mui/material";
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
    <div>
      <Box sx={{ padding: "1rem" }}>
        <Button onClick={() => window.open("/resume.pdf")}>Download</Button>

        <Markdown>{resumeMarkdown}</Markdown>
      </Box>
    </div>
  );
}
export default Resume;
