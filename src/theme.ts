import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: (palette) => ({
    h3: {
      fontFamily: "'Bungee Shade', sans-serif",
      color: palette.text.primary,
    },
    h4: {
      fontFamily: "'Bungee Shade', sans-serif",
      color: palette.text.secondary,
    },
  }),
  palette: {
    action: { selected: "#e55812" },
    primary: {
      main: "#294C60",
    },
    background: {
      default: "#a3d9ff",
      paper: "#ffffff",
    },
    text: {
      primary: "#001B2E",
      secondary: "#e55812",
    },
  },
});

export default theme;
