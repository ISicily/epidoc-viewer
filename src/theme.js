import { createMuiTheme } from '@material-ui/core/styles';

// https://medium.com/@weberzt/importing-a-google-font-into-your-react-app-using-material-ui-773760ded532
const ptsans =  "'PT Sans', sans-serif";

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
  typography: {
    fontFamily: ptsans
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
    MuiInputBase: {
      root: {
        fontSize: '14px',
        lineHeight: '17px',
      },
      input: {
        height: '0.95em',
      }
    },
  },
});
export default theme;