import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { FileText } from "lucide-react";

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
    <div className="flex flex-col items-center pt-1 max-md:mx-0 max-md:w-full max-md:px-0">
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-2 inline-flex items-center gap-1 text-text-primary underline"
      >
        Download a PDF copy
        <FileText size={20} />
      </a>
      <div className="my-1 rounded-[5px] bg-white p-4 font-[arial] shadow-[0_4px_8px_rgba(0,0,0,0.5)] max-md:mx-0 max-md:w-full max-md:rounded-none max-md:shadow-none">
        {isLoading && <div className="p-8 text-center">Loading resume...</div>}

        {error && (
          <div className="p-8 text-center text-red-600">
            Error loading resume: {error}
          </div>
        )}

        {!isLoading && !error && resumeMarkdown && (
          <Markdown>{resumeMarkdown}</Markdown>
        )}

        {!isLoading && !error && !resumeMarkdown && (
          <div className="p-8 text-center">No resume content available</div>
        )}
      </div>
    </div>
  );
}

export default Resume;
