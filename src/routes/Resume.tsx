import { useEffect, useState } from "react";
import Markdown from "react-markdown";

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
      Download a copy of my resume <a href={"/resume.pdf"}>here</a>.
      <Markdown>{resumeMarkdown}</Markdown>
    </div>
  );
}
export default Resume;
