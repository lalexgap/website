

import {  execaCommandSync } from "execa";

import {Plugin} from "vite";

import fs from 'fs';
import path from 'path';

const GITHUB_RESUME_URL =
  "https://raw.githubusercontent.com/lalexgap/resume/main/resume.md";


 const serveResumePlugin  =(): Plugin=>({
    name: 'pandoc-vite-plugin',
     configureServer(server) {
      return () => {
        server.middlewares.use('/resume.pdf', (_, res,) => {
            // Generate the PDF by calling pandoc to convert the latest markdown to PDF
           execaCommandSync(`pandoc -i ${GITHUB_RESUME_URL} -o ./public/generated/resume.pdf`)
          const pdfPath = path.resolve( 'public/generated/resume.pdf');

          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'inline; filename=Alex Gap Resume.pdf');

          // Read and send the PDF
          const stream = fs.createReadStream(pdfPath);
          stream.pipe(res);
        });
      };
    }
  })

  export default serveResumePlugin;