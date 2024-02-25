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
    marginBottom: '50px'
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

  aboutContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '50px'
  },
  aboutHeading: {
    width: 430,
  },
  aboutHeadingText: {
    color: theme.palette.primary.main,
    fontSize: '1rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  aboutHeadingTitle: {
    fontFamily: 'Poppins',
    fontSize: '2.1rem',
    margin: '15px 0',
    lineHeight: '2.8rem',
    color: '#0f0f0f',

  },
  aboutDetails: {
    width: 475,
  },
  aboutDetailsText: {
    fontFamily: 'Poppins',
    color: theme.palette.text.secondary,
    margin: '10px 0',
  },


  finalSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  heading: {
    fontSize: '2.35rem',
    letterSpacing: '1px',
    fontFamily: 'Poppins'
  },
  paragraph: {
    color: theme.palette.text.secondary,
    maxWidth: 700,
    margin: '15px 0',
    letterSpacing: '1px',
    fontFamily: "Poppins"

  },


  strongText: {
    color: '#0f0f0f',
    fontSize: '1rem',
    letterSpacing: '1px',
    fontWeight: 700,
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
        <Grid container className={classes.aboutContainer}>
          <Grid item xs={12} sm={6} className={classes.aboutHeading} data-aos="flip-left">

            <Typography variant="h3" className={classes.aboutHeadingTitle}>
              What is AgrOM?
            </Typography>

          </Grid>
          <Grid item xs={12} sm={6} className={classes.aboutDetails} data-aos="flip-right">
            <Typography variant="body1" className={classes.aboutDetailsText}>
              AgrOM is plant disease prediction system which make use of Hybrid model consists of Images classification model and plant disease ontology. The uniquness of AgrOM is that make prediction with the help of image and domain knowledge. You can predict the disease using image classification model by uploading image of plant leaf. You can also predict the disease by answering questions based on your observation of plant symptoms. Moreover you can upload images and input the answers for questions for more accurate prediction. The image classification model uses VGG16 pretrained model and the ontology model contains domain knowledge of tomato plant disease
            </Typography>
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

      <Box className={classes.section2}>
        <section id="final" data-aos="fade-down" className={classes.finalSection}>
          <Typography variant="subtitle1" className={classes.strongText}>
            What's Next?
          </Typography>
          <Typography variant="h3" className={classes.heading}>
            Diagnose your tomato plant with AgrOM
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            AgrOM can help you to identify the diseases of your tomato plant and provide solutions to cure it
          </Typography>
          <Button variant="contained" className={classes.section1Button} onClick={e => onButtonClick(1)}>
            Diagnose your plant
          </Button>
        </section>

      </Box>
    </Container>
  );
}

export default HomePage;
