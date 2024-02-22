import React from 'react';
import { Box, Button, Container, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

import bg from './../tomato-bg.JPG';
import bg2 from './../tomato-bg2.jpg';
import bg3 from './../tomato-bg3.jpg';
import bg4 from './../green-bg.jpg';
import bg5 from './../seedling-bg.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
  },
  section1: {
    backgroundImage: `url(${bg3})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: theme.spacing(5),
    height: "50%",
    color: '#ffffff',
  },
  section1Title: {
    marginBottom: '10px',
    padding: '10px',
    fontFamily: 'Poppins',
    maxWidth: '50%',
    backgroundColor: '#2f0f0f',
    [theme.breakpoints.down('xs')]: {
      fontSize: '40px',
      maxWidth: '100%',
      padding: '5px',
      backgroundColor: '#2f0f0f',
    },
  },
  section1Button: {
    padding: '10px',
    position: 'relative',
    top: '50%',
    backgroundColor: 'white',
    marginBottom: '10px',
    fontWeight: 'bolder',
    padding: '10px',
    borderRadius: '10px',
    '&:hover': {
      background: "#0f0f0f",
    }
  },
  section2: {
    backgroundColor: 'white',
    padding: theme.spacing(5),
  },
  section2Title: {
    marginBottom: '10px',
    padding: '10px',
    fontFamily: 'Poppins'
  },
  section: {
    borderRadius: '30px',
    textAlign: 'center',
    backgroundColor: '#193a1e',
    color: '#ffffff',
    padding: theme.spacing(5),
  },

  sectionText: {
    fontFamily: 'Poppins'
  },

  section3: {
    backgroundImage: `url(${bg5})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: theme.spacing(5),
    marginBottom: theme.spacing(2),
    height: "50%",
  },
  section3Title: {
    marginBottom: '10px',
    padding: '10px',
    fontFamily: 'Poppins',
    maxWidth: '60%',
  },
}));

const HomePage = ({ changeSelectTab }) => {
  const classes = useStyles();

  const onButtonClick = async (value) => {
    changeSelectTab(value);
  }

  return (
    <Container className={classes.root}>
      <Box className={classes.section1}>
        <Typography variant="h4" gutterBottom className={classes.section1Title}>
          AgrOM
        </Typography>
        <Typography variant="h3" gutterBottom className={classes.section1Title}>
          A Hybrid Tomato Disease Detection System.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" className={classes.section1Button} onClick={e => onButtonClick(1)}>
              Diagnose your plant
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.section2}>
        <Typography variant="h4" gutterBottom className={classes.section2Title}>
          The Three Step Process
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} className={classes.section}>
              <Typography variant="h6" className={classes.sectionText} utterBottom>
                Step 1
              </Typography>
              <Typography variant="body1" className={classes.sectionText}>
                Add the Tomato Leaf image.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} className={classes.section}>
              <Typography variant="h6" gutterBottom className={classes.sectionText}>
                Step 2
              </Typography>
              <Typography variant="body1" className={classes.sectionText}>
                Answer the Questions about the extra symptoms.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} className={classes.section}>
              <Typography variant="h6" gutterBottom className={classes.sectionText}>
                Step 3
              </Typography>
              <Typography variant="body1" className={classes.sectionText}>
                Get your Predicted tomato disease.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.section3}>
        <Typography variant="h4" gutterBottom className={classes.section3Title}>
          Our Features
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.section3Title}>
          Know more about Tomato disease symptoms.
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.section3Title}>
          Know more about Tomato diseases.
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.section3Title}>
          Diagnose the Tomato plant using images and extra symptoms.
        </Typography>
      </Box>
    </Container>
  );
}

export default HomePage;
