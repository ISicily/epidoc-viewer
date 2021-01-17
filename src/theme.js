import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#002147',
      light: '#002147',
      dark: '#002147',
    },
    secondary: {
      main: '#002147',
      light: '#002147',
      dark: '#002147',
    },
    background: {
      default: '#e6e6e6',
    },
    text:{
        primary: "#002147"
      }
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: '30px 30px',
        margin: '30px',
        backgroundColor: '#fff', 
      },
    },
    MuiButton: {
      root: {
        margin: '15px',
      },
    },
  },
});
export default theme;