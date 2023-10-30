import { ThemeProvider } from "styled-components";
import theme from "../theme";

function Landing() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        Hello I'm Alex! Check out my <a href="/resume">resume</a> or some of my{" "}
        <a href="/projects">projects</a>.
      </div>
    </ThemeProvider>
  );
}

export default Landing;
