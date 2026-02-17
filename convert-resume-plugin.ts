import { execaCommandSync } from "execa";

import { Plugin } from "vite";

import fs from "fs";

const GITHUB_RESUME_URL =
  "https://raw.githubusercontent.com/lalexgap/resume/main/resume.md";

const GENERATED_FILEPATH = "./public/generated/resume.pdf";

const PDF_AGE_LIMIT = 1000 * 60 * 60 * 6; // 6 hours

const serveResumePlugin = (): Plugin => ({
  name: "pandoc-vite-plugin",
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

          const command = `pandoc ${GITHUB_RESUME_URL} -o ${GENERATED_FILEPATH}`;
          execaCommandSync(command);
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
      const outputPath = "./dist/resume.pdf";
      const command = `pandoc ${GITHUB_RESUME_URL} -o ${outputPath}`;
      execaCommandSync(command);
      console.log("Resume PDF generated at dist/resume.pdf");
    } catch (error) {
      console.error("Error generating PDF during build:", error);
    }
  },
});

export default serveResumePlugin;
