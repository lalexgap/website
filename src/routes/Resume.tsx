import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import styled from "styled-components";

const ResumeContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 2rem;
`;
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
      <ResumeContainer>
        <Markdown>{resumeMarkdown}</Markdown>
      </ResumeContainer>
    </div>
  );
}
export default Resume;
