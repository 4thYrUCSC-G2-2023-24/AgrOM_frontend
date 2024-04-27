import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Stepper, Step, StepLabel, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, Button } from "@material-ui/core";
import logo from "./logo.png";
import { sampleQuestions } from "./constants/sampleQuestions";
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';
import Box from '@material-ui/core/Box';
import { Guide } from "./pages/guide";
import Questions from "./questions";

import { containerStyles, containerStyles2, labelStyles, buttonStyles } from "./assets/styles/home";
import { PredictOption } from "./pages/predictOption";
import HomePage from "./pages/homePage";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#ffffff7a',
    },
  },
}))(Button);

const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Poppins"
  },
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 300,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "3em 3em 0 3em",
  },
  mainContainer: {
    // backgroundImage: `url(${image})`,
    // backgroundImage: `url(${image2})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    backgroundColor: 'white',
    height: "100%",
    marginTop: "8px",
    fontFamily: "verdana"
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 300,
    backgroundColor: '#008000',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
    borderRadius: '15px',
  },
  imageCardEmpty: {
    height: 'auto',
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: 'none',
  },
  uploadIcon: {
    background: 'white',
  },
  text: {
    color: 'white !important',
    textAlign: 'center',
  },
  buttonGrid: {
    maxWidth: "600px",
    width: "100%",
    marginBottom: "25px"
  },
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbar: {
    background: '#193a1e',
    boxShadow: 'none',
    color: 'white',
  },
  footer: {
    backgroundColor: '#193a1e',
    marginTop: 'auto',
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  stepper: {
    background: 'transparent',
  },
  step: {
    '& .MuiStepIcon-active': {
      color: 'green', // Change the color of the step icons to green
    },
    '& .MuiStepIcon-completed': {
      color: 'green', // Change the color of the step icons to green
    },
  },

  loader: {
    color: '#be6a77 !important',
  },


  logo: {
    marginLeft: theme.spacing(2), // Add spacing between logo and tabs
  },

  dropZone: {
    height: "315px",

  },

  dropZoneText: {
    "color": '#008000',
    "font-family": "Poppins",
    "font-style": "normal"
  },
  content: {
    margin: "auto"
  }

}));

export const Home = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [disease, setDisease] = useState();
  const [possibleDiseases, setPossibleDiseases] = useState();
  const [selectedTab, setSelectedTab] = React.useState(0);

  const [predictOption, setPredictOption] = useState(0);
  const [predictStep, setPredictStep] = useState(0);

  const handlePredictOption = async (stepOption) => {
    setPredictOption(stepOption);
    if (stepOption === 1) {
      handlePredictStep(1);
    }
    else {
      handlePredictStep(0);
    }
  }

  const handlePredictStep = async (step) => {
    setPredictStep(step);
  }

  let confidence = 0;

  const sendFileAndExtraSymptoms = async (sympom_set) => {

    let ress = await axios({
      method: "post",
      url: '/extra_symptoms',
      headers: {
        "Content-type": "application/json"
      },
      data: sympom_set,
    });

    if (ress.status === 200) {
      console.log("success")
      if (image) {
        let formData = new FormData();

        formData.append("file", selectedFile);
        let res = await axios({
          method: "post",
          mode: 'no-cors',
          url: "/image_upload",
          data: formData,

        });
        if (res.status === 200) {
          console.log(res.data)
          setDisease(res.data.disease)
        }

      } else {
        let res = await axios({
          method: "get",
          mode: 'no-cors',
          url: "/ontology_detection",
        });
        if (res.status === 200) {
          console.log(res.data)
          setPossibleDiseases(res.data.disease)
        }

      }

    }

    // if (image) {
    //   let formData = new FormData();
    //   formData.append("file", selectedFile);
    //   let res = await axios({
    //     method: "post",
    //     mode: 'no-cors',
    //     url: process.env.REACT_APP_API_URL,
    //     data: formData,

    //   });
    //   if (res.status === 200) {
    //     console.log(res.data)

    //   }

    // }


  }

  const [questions] = useState(sampleQuestions);

  const [userAnswers, setUserAnswers] = useState(new Array(questions.length).fill(''));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option, label) => {

    //Select option
    if (userAnswers[currentQuestion] != label) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestion] = label;
      setUserAnswers(newAnswers);
      setSelectedOption(label);
    }

    //Unselect option
    else {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestion] = '';
      setUserAnswers(newAnswers);
      setSelectedOption(null);
    }

  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null); // Clear selected option for the next question
    } else {
      console.log('User Answers:', userAnswers);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(userAnswers[currentQuestion - 1]);
    }
  };

  //relates to circular button
  const handleCircleButtonClick = (index) => {
    setCurrentQuestion(index);
    setSelectedOption(userAnswers[index]);

  };


  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
    setDisease(null);
    setPossibleDiseases(null);

  };

  const steps = [
    'Insert Tomato Leaf image',
    'Answer questions on extra symptoms',
    'Get your result',
  ];

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  // useEffect(() => {
  //   if (!preview) {
  //     return;
  //   }
  //   setIsloading(true);
  //   sendFile();
  // }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    console.log("file")
    console.log(files[0])

    setData(undefined);
    setImage(true);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  const customStyles = {
    control: (base) => ({
      ...base,
      width: '200px',
      margin: 'auto',
      marginTop: '10px',
    }),
    menu: (base) => ({
      ...base,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '400px',
    }),
  };

  const handleSubmit = () => {
    const symptomNames = [
      "hasLeafSymptom",
      "hasLeafSymptomColour",
      "hasLeafHalo",
      "hasStemSymptom",
      "hasStemSymptomColor",
      "hasFruitSymptom",
      "hasFruitSymptomColour",
      "hasFruitHalo",
      "hasBadOdor",
      "hasCrossSection",
      "hasOozeLiquid",
      "hasCracks",
      "hasPlantSymptom",
      "hasCurling",
      "hasFungalColour",

    ];
    var symptom_set = {}

    for (var i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] !== '') {
        symptom_set[symptomNames[i]] = userAnswers[i];
      }
    }

    console.log(symptom_set)


    var x = sendFileAndExtraSymptoms(symptom_set);
  };



  const quizContainerStyle = {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '800px',
    height: '725px',
    overflowY: 'auto',
  };

  const questionStyle = {
    display: 'none',
    fontSize: '25px'
  };

  const activeQuestionStyle = {
    display: 'block',
    fontSize: '25px'

  };

  const optionStyle = {
    margin: '8px 0',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const selectedOptionStyle = {
    ...optionStyle,
    backgroundColor: '#4caf50',
    color: '#fff',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: currentQuestion === 0 ? 'flex-end' : 'space-between',
    marginTop: '20px',
  };

  const buttonStyles2 = {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '20px 40px',
    cursor: 'pointer',
    borderRadius: '10px',
    marginTop: '10px',
    marginLeft: '10px'

  };

  const nextButtonStyle = {
    padding: '10px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const previousButtonStyle = {
    padding: '10px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const hoverButtonStyle = {
    backgroundColor: '#45a049',
  };



  // related to circular button 
  const circleButtonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  };

  const circleButtonStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: '10px',
    backgroundColor: '#fff',
  };

  const highlightedCircleButtonStyle = {
    ...circleButtonStyle,
    backgroundColor: '#4caf50',
    color: '#fff',
  };




  //related to answer image 
  const imageStyle = {
    maxWidth: '150px',
    maxHeight: '150px',
    marginLeft: '10px',
    transition: 'transform 0.3s ease-in-out',
  };

  const handleImageHover = (event) => {
    event.target.style.transform = 'scale(1.2)';
  };

  const handleImageLeave = (event) => {
    event.target.style.transform = 'scale(1)';
  };



  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap href="#" sx={{ flexGrow: 1 }}>
            AgrOM : A Hybrid System
          </Typography>
          <div className={classes.grow} />
          <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="Home" />
            <Tab label="Predict" />
            <Tab label="Guide" />
            {/* Add more tabs as needed */}
          </Tabs>
          <Avatar src={logo} className={classes.logo}></Avatar>
        </Toolbar>
      </AppBar>
      {selectedTab === 0 && <HomePage changeSelectTab={setSelectedTab} />}
      {selectedTab !== 0 &&
        <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
          <Grid
            className={classes.gridContainer}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >

            {selectedTab === 1 && predictOption === 0 &&
              <PredictOption predictOption={predictOption} onOptionChange={handlePredictOption} onStepChange={handlePredictStep} />
            }

            {selectedTab === 1 && predictOption === 2 &&
              <Grid container xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '5px' }}>
                <ColorButton variant="contained" color="primary" component="div" onClick={(e) => { setPredictOption(0) }} >
                  Go Back
                </ColorButton>
                <Questions />

              </Grid>
            }

            {selectedTab === 1 && predictOption === 1 && predictStep === 1 && <Grid item xs={12}>
              <Grid container xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '5px' }}>
                <ColorButton variant="contained" color="primary" component="div" onClick={(e) => { setPredictOption(0) }} >
                  Go Back
                </ColorButton>

                <div style={containerStyles2}>
                  <button onClick={e => handlePredictStep(2)} style={buttonStyles}>Submit</button>
                </div>
              </Grid>
              <Box style={{ backgroundColor: 'white', maxWidth: '100%', padding: '5px', marginBottom: '40px' }}>
                <Stepper activeStep={0} alternativeLabel className={classes.stepper}>
                  {steps.map((label) => (
                    <Step key={label} >
                      <StepLabel className={classes.step}>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`} style={{ height: "350px" }}>
                  {image && <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={preview}
                      component="image"
                      title="Leaf symptom"
                    />
                  </CardActionArea>
                  }
                  {!image && <CardContent className={classes.content}>
                    <DropzoneArea
                      acceptedFiles={['image/*']}
                      dropzoneText={"Drag and drop an image of a tomato plant leaf to process"}
                      onChange={onSelectFile}
                      dropzoneClass={classes.dropZone}
                      dropzoneParagraphClass={classes.dropZoneText}
                    />
                  </CardContent>}
                </Card>
              </Box>

            </Grid>}

            {selectedTab === 1 && predictOption === 1 && predictStep === 2 && <Grid item xs={12}>
              <ColorButton variant="contained" color="primary" component="div" onClick={(e) => { setPredictOption(0) }} >
                Go Back
              </ColorButton>

              <Stepper activeStep={1} alternativeLabel className={classes.stepper}>
                {steps.map((label) => (
                  <Step key={label} >
                    <StepLabel className={classes.step}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`} style={{ height: "350px" }}>
                {image && <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={preview}
                    component="image"
                    title="Leaf symptom"
                  />
                </CardActionArea>
                }
                {!image && <CardContent className={classes.content}>
                  <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText={"Drag and drop an image of a tomato plant leaf to process"}
                    onChange={onSelectFile}
                  />
                </CardContent>}
              </Card>

              <div style={{ "height": "850px", "marginTop": "100px", "paddingTop": "50px", "background": "#90EE90", "borderRadius": "10px" }}>
                <div style={quizContainerStyle}>
                  {/* Circular buttons */}
                  <div style={circleButtonContainerStyle}>
                    {questions.map((q, index) => (
                      <div
                        key={q.id}
                        style={index === currentQuestion ? highlightedCircleButtonStyle : circleButtonStyle}
                        onClick={() => handleCircleButtonClick(index)}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>

                  {/*Questions and Answers */}
                  {questions.map((q, index) => (
                    <div key={q.id} style={index === currentQuestion ? activeQuestionStyle : questionStyle}>
                      <p>{q.question}</p>
                      <ul>
                        {q.options.map((option, optionIndex) => (
                          <li
                            key={optionIndex}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '10px',
                              border: '1px solid #ccc',
                              borderRadius: '5px',
                              marginBottom: '8px',
                              cursor: 'pointer',
                              transition: 'background-color 0.3s',
                              ...(q.labels[optionIndex] === selectedOption ? selectedOptionStyle : optionStyle)
                            }}
                            onClick={() => handleOptionClick(option, q.labels[optionIndex])}
                          >
                            {option}
                            {q.images && q.images[optionIndex] && (
                              <img
                                src={q.images[optionIndex]}
                                alt={`Image for ${option}`}
                                style={{ ...imageStyle }}
                                // style={{ maxWidth: '200px', maxHeight: '250px', marginLeft: '10px' }}
                                onMouseEnter={handleImageHover}
                                onMouseLeave={handleImageLeave}
                              />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div style={buttonContainerStyle}>
                    <button
                      style={{ ...previousButtonStyle, display: currentQuestion === 0 ? 'none' : 'inline-block' }}
                      onClick={handlePreviousQuestion}
                    >
                      Previous Question
                    </button>
                    <button
                      style={Object.assign({}, nextButtonStyle, currentQuestion === questions.length - 1 && hoverButtonStyle)}
                      onClick={handleNextQuestion}
                    >
                      {currentQuestion === questions.length - 1 ? 'Finish' : 'Next Question'}
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "marginTop": "60px" }}>
                <button onClick={handleSubmit} style={{ ...buttonStyles2, "marginBottom": "50px" }}>Submit and predict</button>
              </div>

            </Grid>}

            {data && selectedTab === 1 &&
              <Grid item className={classes.buttonGrid} >

                <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                  Clear
                </ColorButton>
              </Grid>}

            {disease && selectedTab === 1 &&
              <Grid item className={classes.buttonGrid} >

                <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                  {disease}
                </ColorButton>
              </Grid>}

            {possibleDiseases && selectedTab === 1 &&
              <Grid item className={classes.buttonGrid} >

                <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                  {possibleDiseases.map((disease, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && ', '}
                      {disease}
                    </React.Fragment>
                  ))}
                </ColorButton>
              </Grid>}

            {selectedTab === 2 && <Guide />}

            {selectedTab === 3 && <Questions />}

          </Grid >
        </Container >
      }
      <footer className={classes.footer}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Typography variant="body2" align="left" color="textPrimary" component="p" style={{ color: '#D3D3D3', fontSize: '35px', fontFamily: "Poppins" }}>
              Agrom
            </Typography>
          </div>
          <div>
            <Typography variant="body2" align="center" color="textSecondary" component="p" style={{ color: '#D3D3D3', fontSize: '15px', fontFamily: "Poppins" }} >
              Contact
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary" component="p" style={{ color: '#D3D3D3', fontSize: '15px', fontFamily: "Poppins" }} >
              +1 123 456 789
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary" component="p" style={{ color: '#D3D3D3', fontSize: '15px', fontFamily: "Poppins" }}>
              +1 987 654 321
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary" component="p" style={{ color: '#D3D3D3', fontSize: '15px', fontFamily: "Poppins" }}>
              +1 555 555 555
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" align="right" color="textSecondary" component="p" style={{ color: '#D3D3D3', fontSize: '15px', fontFamily: "Poppins" }}>
              Emails:
            </Typography>
            <Typography variant="body2" align="right" color="textSecondary" component="p" style={{ color: '#D3D3D3', fontSize: '15px', fontFamily: "Poppins" }}>
              info@example.com
            </Typography>
            <Typography variant="body2" align="right" color="textSecondary" component="p" style={{ color: '#D3D3D3', fontSize: '15px', fontFamily: "Poppins" }}>
              support@example.com
            </Typography>
            <Typography variant="body2" align="right" color="textSecondary" component="p" style={{ color: '#D3D3D3', fontSize: '15px', fontFamily: "Poppins" }}>
              sales@example.com
            </Typography>
          </div>
        </div>

      </footer>
    </React.Fragment >
  );
};




