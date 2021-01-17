import logo from './ox-rect.png';
import './App.css';
import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Button, Paper, TextField, Box, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

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

const testValue = `
<div type="edition" xml:space="preserve" xml:lang="la" resp="#JP">
  <ab>
    <lb n="1"/>
    D
    <hi rend="tall">i</hi>
    s
    <g type="interpunct">·</g>
    <expan>
      <abbr>man</abbr>
      <ex>ibus</ex>
    </expan>
    <lb n="2"/>
    Zet
    <hi rend="ligature">hi</hi>
    <lb n="3"/>
    vixit
    <g type="interpunct">·</g>
    <expan>
      <abbr>a</abbr>
      <ex>nnis</ex>
    </expan>
    <g type="interpunct">·</g>
    <num value="6">VI</num>
  </ab>
</div> `

function App() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className="App">
       <Box m={2}><img src={logo} alt="logo" /></Box>
        <Typography variant="h4" component="h1" gutterBottom>
          I.Sicily EpiDoc Viewer
        </Typography>

      <Grid container>
        <Grid item xs={6} spacing={3}>
          <Paper>
            <TextField
              placeholder={`Paste your text division here`}
              multiline
              rows={20}
              rowsMax={20}
              fullWidth
              helperText="Epidoc"
            />
          </Paper>
        </Grid>
        <Grid item xs={6} spacing={3}>
          <Paper>
            <TextField
              placeholder={`The rendered Leiden will appear here`}
              multiline
              rows={20}
              rowsMax={20}
              fullWidth
              helperText="Leiden"
            />
          </Paper>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" className={classes.button}>
          Refresh
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          Clear
        </Button>
    </Container>
  );
}




export default App;
