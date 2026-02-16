import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: (palette) => ({
    h1: {
      fontFamily: "'Bungee Shade', sans-serif",
      color: palette.text.primary,
    },
    h2: {
      fontFamily: "'Bungee Shade', sans-serif",
      color: palette.text.primary,
    },
    h3: {
      fontFamily: "'Bungee Shade', sans-serif",
      color: palette.text.primary,
    },
    h4: {
      fontFamily: "'Bungee Shade', sans-serif",
      color: palette.text.secondary,
    },
    body1: {
      fontSize: "1.1rem",
      lineHeight: 1.7,
    },
  }),
  palette: {
    action: { selected: "#e55812" },
    primary: {
      main: "#294C60",
      light: "#3d6a85",
      dark: "#1a3344",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e55812",
      light: "#ff7a3d",
      dark: "#b3450e",
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
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          transition: "all 0.2s ease-in-out",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          transition: "color 0.2s ease-in-out",
        },
      },
    },
  },
});

export default theme;
