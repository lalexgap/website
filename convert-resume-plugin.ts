import { execFileSync } from "node:child_process";

import { Plugin } from "vite";

import fs from "fs";

const GITHUB_RESUME_URL =
  "https://raw.githubusercontent.com/lalexgap/resume/main/resume.md";

const GENERATED_FILEPATH = "./public/generated/resume.pdf";

const PDF_AGE_LIMIT = 1000 * 60 * 60 * 6; // 6 hours

// `import resume from "virtual:resume"` gives the resume markdown, fetched
// from GitHub at build time so the page renders without a client fetch.
const VIRTUAL_ID = "virtual:resume";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

const serveResumePlugin = (): Plugin => {
  let outDir = "dist";
  let isBuild = false;
  return {
    name: "pandoc-vite-plugin",
    configResolved(config) {
      outDir = config.build.outDir;
      isBuild = config.command === "build";
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    async load(id) {
      if (id !== RESOLVED_ID) return undefined;
      try {
        const res = await fetch(GITHUB_RESUME_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const markdown = await res.text();
        if (!markdown.trim()) throw new Error("empty resume");
        return `export default ${JSON.stringify(markdown)};`;
      } catch (error) {
        // Never ship a build with an empty resume page.
        if (isBuild)
          throw new Error(`Could not fetch resume: ${error}`, { cause: error });
        console.error("Could not fetch resume (dev):", error);
        return `export default "";`;
      }
    },
    configureServer(server) {
      server.middlewares.use("/resume.pdf", (_, res) => {
        try {
          // If the file doesn't exist or is older than PDF_AGE_LIMIT minute, regenerate it
          // This guarantees that the latest github resume is always served
          if (
            !fs.existsSync(GENERATED_FILEPATH) ||
            Date.now() - fs.statSync(GENERATED_FILEPATH).mtime.getTime() >
              PDF_AGE_LIMIT
          ) {
            console.log("Regenerating resume PDF...");

            // Ensure directory exists
            const dir = GENERATED_FILEPATH.substring(
              0,
              GENERATED_FILEPATH.lastIndexOf("/"),
            );
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }

            execFileSync("pandoc", [
              GITHUB_RESUME_URL,
              "-o",
              GENERATED_FILEPATH,
            ]);
          }

          if (!fs.existsSync(GENERATED_FILEPATH)) {
            console.error("PDF generation failed");
            res.statusCode = 500;
            res.end("PDF generation failed");
            return;
          }

          res.setHeader("Content-Type", "application/pdf");
          res.setHeader(
            "Content-Disposition",
            "inline; filename=Alex Gap Resume.pdf",
          );

          const stream = fs.createReadStream(GENERATED_FILEPATH);
          stream.pipe(res);
        } catch (error) {
          console.error("Error generating PDF:", error);
          res.statusCode = 500;
          res.end(`PDF generation error: ${error}`);
        }
      });
    },
    closeBundle() {
      try {
        console.log("Generating resume PDF for production build...");
        const outputPath = `${outDir}/resume.pdf`;
        execFileSync("pandoc", [GITHUB_RESUME_URL, "-o", outputPath]);
        console.log(`Resume PDF generated at ${outputPath}`);
      } catch (error) {
        console.error("Error generating PDF during build:", error);
      }
    },
  };
};

export default serveResumePlugin;
