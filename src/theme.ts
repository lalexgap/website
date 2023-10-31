import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    action:{selected:"#e55812"},
    primary: {
      main: '#294C60',
    
    },
    background: {
        default: '#a3d9ff',
        paper:"#ffffff"
    
        },
        text:{
            primary:'#001B2E',
            secondary:'#e55812'
        }
  },
  

});

export default theme;