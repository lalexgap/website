import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import styled from "styled-components";
import { Centered } from "../style";

const ResumeContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 2rem;
  color: #000000;
a {
    color: unset;
  &:hover {
    color: unset;
  }
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
      <Centered>
        <button onClick={() => window.open("/resume.pdf")}>Download</button>
        <div>
          <ResumeContainer>
            <Markdown>{resumeMarkdown}</Markdown>
          </ResumeContainer>
        </div>
      </Centered>
    </div>
  );
}
export default Resume;
