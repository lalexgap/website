import styled, { createGlobalStyle } from "styled-components";

const theme = {
  colors: {
    primary: '#FC766A',
    secondary: '#783937',
    background: '#F1AC88',
  },
};

export default theme;

export const StyledLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.colors.secondary};
    text-decoration: underline;
  }
`;



export const GlobalStyle = createGlobalStyle`
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  background-color: ${theme.colors.background};

}
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}


body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

`;