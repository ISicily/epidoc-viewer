import ERClogo from './LOGO_ERC-FLAG_EU_cropped.jpg';
import isicilyLogo from './ISicily_english_reduced.jpg';
import oxfordLogo from './2258_ox_brand_blue_pos_rect.png'
import './App.css';
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Paper, TextField, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { LeidenViewer } from '@isicily/epidoc-viewer-core'

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
  },
  titleBox: {
    paddingTop: '1em'
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
      .then(res => setTei(res))
  }, []);

  const classes = useStyles();

  return (
    <Container maxWidth={false} className="App"><Grid container spacing={1} className={classes.titleBox} >

      <Box display="flex"
        height={100}
        m="auto"
        style={{ marginTop: "2em", marginBottom: "1.5em" }}
        alignItems="center">
        <a href="http://sicily.classics.ox.ac.uk"><img src={isicilyLogo} alt="logo" height={100} /></a>
        <Box style={{ marginLeft: "3em" }}>
          <Typography variant="h4" component="h1" >
            I.Sicily EpiDoc Viewer
        </Typography>
          <Typography><div><a href="https://github.com/ISicily/epidoc-viewer">(https://github.com/ISicily/epidoc-viewer)</a></div></Typography>
        </Box>
      </Box>

    </Grid>
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
              <Grid item xs={4}><span style={{ float: 'right', minWidth: '200px' }}><InterpretedToggle checked={showInterpreted} onChange={handleChange} /></span></Grid>
            </Grid>
            <Box height={'32em'} overflow="auto" >
              <LeidenViewer tei={tei} showInterpreted={showInterpreted} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} className={classes.titleBox} >
        <Grid item xs={3} >
          <Box display="flex"
            height={100}
            alignItems="center"
            justifyContent="center">
            <a href="https://erc.europa.eu"><img src={ERClogo} alt="logo" height={100} /></a>
          </Box>
        </Grid>
        <Grid item xs={5} >
          <Box m={1}>
            <Typography variant="body2">
              This project has received funding from the John Fell Fund of the University of Oxford, and from the European Research Council (ERC) under the European Union’s Horizon 2020 research and innovation programme (grant agreement No 885040, “Crossreads”).
                  </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} >
          <Box
            display="flex"
            height={100}
            alignItems="center"
            justifyContent="center">
            <a href="https://www.ox.ac.uk"><img src={oxfordLogo} alt="logo" height={80} /></a>
          </Box>
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