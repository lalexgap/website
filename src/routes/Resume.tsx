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
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4">
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="button-subtle inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
      >
        Download a PDF copy
        <FileText size={18} />
      </a>
      <div className="content-card w-full p-5 sm:p-6">
        <div className="prose prose-slate prose-sm max-w-none leading-relaxed prose-headings:tracking-tight prose-h1:mb-2 prose-h2:mt-4 prose-h2:mb-2 prose-h3:mt-3 prose-h3:mb-1 prose-p:my-2 prose-ul:my-2 prose-li:my-0.5">
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
    </div>
  );
}

export default Resume;
