import { ThemeProvider } from "styled-components";
import theme from "../theme";
import { StyledLink } from "../style";

function Landing() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        Hello I'm Alex! Check out my{" "}
        <StyledLink href="/resume">resume</StyledLink> or some of my{" "}
        <StyledLink href="/projects">projects</StyledLink>.
      </div>
    </ThemeProvider>
  );
}

export default Landing;
