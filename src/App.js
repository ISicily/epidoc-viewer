import logo from './Oxford-University-rectangle-logo.png';
import './App.css';
import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Paper, TextField, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {LeidenViewer} from '@isicily/epidoc-viewer-core'

import InterpretedToggle from './components/InterpretedToggle'

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

  const [tei, setTei] = useState()

  const [showInterpreted, setShowInterpreted] = React.useState(true);

  const overridingRules = {} // here is where someone could add their own rules or override existing rules
    
  const handleChange = (event) => {
    setShowInterpreted(event.target.checked);
  };

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/ISicily/ISicily/master/alists/ISic-all-example.xml')
      .then(res => res.text())
      .then (res => setTei(res))
  }, []);

  const classes = useStyles();

  return (
    <Container maxWidth={false} className="App">
       <Box m={2}><img src={logo} alt="logo" height={100}/></Box>
        <Typography variant="h4" component="h1" gutterBottom>
        CSAD EpiDoc Viewer
        </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6} >
          <Paper>
          <h4>Epidoc</h4>
          <Box height={'32em'}>
            
            <TextField
              placeholder={`Paste your text division here`}
              multiline
              rows={26}
              rowsMax={26}
              fullWidth
              value={tei}
              onChange={e => setTei(e.target.value)}
            />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} >
          <Paper >
            <Grid container direction="row"
  justify="center"
  alignItems="center"
>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}><h4>Leiden</h4></Grid>
              <Grid item xs={4}><span style={{float: 'right', minWidth: '200px'}}><InterpretedToggle checked={showInterpreted} onChange={handleChange}/></span></Grid>
            </Grid>
            <Box height={'32em'} overflow="auto" >
            <LeidenViewer tei={tei} showInterpreted={showInterpreted}/>
          </Box>
          </Paper>
        </Grid>
      </Grid>

    </Container>
  );
}




export default App;

/* 
{ 
  width:200px; 
  height:200px; 
  position: fixed; 
  background-color: blue; 
  top: 50%; 
  left: 50%; 
  margin-top: -100px; 
  margin-left: -100px; 
}  */