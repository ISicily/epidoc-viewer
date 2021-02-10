import logo from './Oxford-University-rectangle-logo.png';
import './App.css';
import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Paper, TextField, Box, Grid } from '@material-ui/core';
import ISic000014 from './sampleData/ISic000014'
import { makeStyles } from '@material-ui/core/styles';

import LeidenView from './components/LeidenView'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  button: {
    maxWidth: '100px', 
    maxHeight: '40px', 
    minWidth: '100px', 
    minHeight: '40px'
  }
});


function App() {
  const [tei, setTei] = useState(ISic000014)
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className="App">
       <Box m={2}><img src={logo} alt="logo" height={100}/></Box>
        <Typography variant="h4" component="h1" gutterBottom>
          I.Sicily EpiDoc Viewer
        </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6} >
          <Paper>
          <Box height={'32em'}>
            <h4>Epidoc</h4>
            <TextField
              placeholder={`Paste your text division here`}
              multiline
              rows={20}
              rowsMax={20}
              fullWidth
              //helperText="Epidoc"
              value={tei}
              onChange={e => setTei(e.target.value)}
            />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} >
          <Paper>
            <Box height={'32em'} >
            <h4>Leiden</h4>
            <LeidenView tei={tei}/>
            
          </Box>
          </Paper>
        </Grid>
      </Grid>

    </Container>
  );
}




export default App;
