
import styled, { createGlobalStyle } from "styled-components";
import theme from "./theme";

export const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
 


`;


export const GlobalStyle = createGlobalStyle`
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};

}
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

a {
      color: ${theme.colors.primary};
  text-decoration: none;

  &:hover {
    color: ${theme.colors.secondary};
    text-decoration: underline;
  }
}

button {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.buttonText};
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    margin: 1rem;
    font-size: 1rem;
    cursor: pointer;
    
    &:hover {
        background-color: ${theme.colors.secondary};
    }
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;

}

`;

