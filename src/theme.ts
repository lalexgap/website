import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#294C60',
    },
    secondary: {
      main: '#70F8BA',
    },
    
    background: {
        default: '#A3D9FF',
    
        },
        text:{
            primary:'#001B2E',
            secondary:"#70F8BA"
        }
  },
  // Add other theme configurations here
});

export default theme;