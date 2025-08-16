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
    console.log("🔧 Configuring pandoc plugin...");

    server.middlewares.use("/resume.pdf", (req, res) => {
      console.log("🔍 PDF middleware triggered for:", req.url);

      try {
        console.log("📁 Checking file exists:", GENERATED_FILEPATH);
        console.log("📁 File exists:", fs.existsSync(GENERATED_FILEPATH));

        // If the file doesn't exist or is older than PDF_AGE_LIMIT minute, regenerate it
        // This guarantees that the latest github resume is always served
        if (
          !fs.existsSync(GENERATED_FILEPATH) ||
          Date.now() - fs.statSync(GENERATED_FILEPATH).mtime.getTime() >
            PDF_AGE_LIMIT
        ) {
          console.log("🔄 Regenerating resume from github link");
          console.log("📡 Fetching from:", GITHUB_RESUME_URL);
          console.log("📄 Output path:", GENERATED_FILEPATH);

          // Ensure directory exists
          const dir = GENERATED_FILEPATH.substring(
            0,
            GENERATED_FILEPATH.lastIndexOf("/"),
          );
          if (!fs.existsSync(dir)) {
            console.log("📁 Creating directory:", dir);
            fs.mkdirSync(dir, { recursive: true });
          }

          const command = `pandoc ${GITHUB_RESUME_URL} -o ${GENERATED_FILEPATH}`;
          console.log("⚡ Running command:", command);

          execaCommandSync(command);
          console.log("✅ Pandoc completed successfully");
        }

        if (!fs.existsSync(GENERATED_FILEPATH)) {
          console.error(
            "❌ PDF file still doesn't exist after generation attempt",
          );
          res.statusCode = 500;
          res.end("PDF generation failed");
          return;
        }

        console.log("📤 Serving PDF file");
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          "inline; filename=Alex Gap Resume.pdf",
        );

        const stream = fs.createReadStream(GENERATED_FILEPATH);
        stream.pipe(res);
        console.log("✅ PDF served successfully");
      } catch (error) {
        console.error("❌ Error in PDF generation:", error);
        res.statusCode = 500;
        res.end(`PDF generation error: ${error}`);
      }
    });
  },
});

export default serveResumePlugin;
