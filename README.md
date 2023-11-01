# My Personal Website

This is my personal website that I self-host at www.alexgap.ca

It was generated using Vite and uses React and Typescript, and makes heavy use of the material UI component library.

## Resume Fetching

This website will always fetch the latest version of my resume from [github](https://github.com/lalexgap/resume). This markdown is rendered `react-markdown` to html in the browser. To generate the pdf a [custom plugin](convert-resume-plugin.ts) is used that runs `pandoc` to convert the markdown to a pdf.
