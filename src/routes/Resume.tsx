import Markdown from "react-markdown";
import { FileText } from "lucide-react";
import resumeMarkdown from "virtual:resume";
import PageMeta from "../PageMeta";

// The resume markdown is fetched from GitHub at build time (see
// convert-resume-plugin.ts), so the page renders in one pass with no
// loading state or layout shift. A nightly rebuild keeps it current.
const SOURCE_URL = "https://github.com/lalexgap/resume/blob/main/resume.md";

function Resume() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4">
      <PageMeta title="Resume" path="/resume" />
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
          {resumeMarkdown ? (
            <Markdown>{resumeMarkdown}</Markdown>
          ) : (
            <div className="p-8 text-center">
              The resume couldn&apos;t be loaded here.{" "}
              <a href={SOURCE_URL}>View it on GitHub</a>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Resume;
