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
    return () => {
      server.middlewares.use("/resume.pdf", (_, res) => {
        // If the file doesn't exist or is older than PDF_AGE_LIMIT minute, regenerate it
        // This guarantees that the latest github resume is always served
        if (
          fs.existsSync(GENERATED_FILEPATH) &&
          Date.now() - fs.statSync(GENERATED_FILEPATH).mtime.getTime() >
            PDF_AGE_LIMIT
        ) {
          console.log("Regenerating resume from github link");
          execaCommandSync(
            `pandoc -i ${GITHUB_RESUME_URL} -o ${GENERATED_FILEPATH}`,
          );
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          "inline; filename=Alex Gap Resume.pdf",
        );

        const stream = fs.createReadStream(GENERATED_FILEPATH);
        stream.pipe(res);
      });
    };
  },
});

export default serveResumePlugin;
