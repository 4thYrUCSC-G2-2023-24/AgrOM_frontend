import { useState, useEffect, useRef } from "react";
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
import { Paper, CardActionArea, CardMedia, Grid, Button, CircularProgress } from "@material-ui/core";
import logo from "./logo.png";
import { sampleQuestions } from "./constants/sampleQuestions";
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';
import Box from '@material-ui/core/Box';
import { Guide } from "./pages/guide";
import Questions from "./questions";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import { containerStyles, containerStyles2, labelStyles, buttonStyles, buttonStyleNext, buttonStylePrevious } from "./assets/styles/home";
import { PredictOption } from "./pages/predictOption";
import HomePage from "./pages/homePage";
import { CenterFocusStrong } from "@material-ui/icons";
import { initialQuestion, sampleLeafQuestions, sampleFruitQuestions, sampleStemQuestions, sampleSpecialQuestions, sampleFlowerQuestions } from "./constants/sampleQuestions";

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
    height: 400,
    backgroundSize: 'cover',
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
    height: 400,
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
  },

  descriptionBoxContent: {
    textAlign: 'center',
    padding: theme.spacing(3),
  }

}));


export const Home = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [detectedLeavesImageFile, setDetectedLeavesImageFile] = useState();
  const [detectedSymtomsImageFile, setDetectedSymtomsImageFile] = useState();
  const [segmentationMaskImageFile, setSegmentationMaskImageFile] = useState();
  const [segmentedImageFile, setSegmentedImageFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [detectedLeavesImage, setDetectedLeavesImage] = useState(false);
  const [detectedSymtomsImage, setDetectedSymtomsImage] = useState(false);
  const [segmentationMaskImage, setSegmentationMaskImage] = useState(false);
  const [segmentedImage, setSegmentedImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disease, setDisease] = useState();
  const [possibleDiseases, setPossibleDiseases] = useState();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [detectedLeavesCount, setDetectedLeavesCount] = useState();
  const [detectedSymtoms, setDetectedSymtoms] = useState([]);
  const [possibleDiseasesBaseOnSymptoms, setPossibleDiseasesBaseOnSymptoms] = useState();
  const [possibleDiseasesAfterSegmentation, setPossibleDiseasesAfterSegmentation] = useState([]);

  const [predictOption, setPredictOption] = useState(0);
  const [predictStep, setPredictStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [leafDetectionErrorCount, setLeafDetectionErrorCount] = useState(0);
  const [tempRespData, setTempRespData] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [flag, setFlag] = useState(0);

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

  const handleDialogClose = () => {
    setTempRespData(null)
    setOpenDialog(false);
  };

  const handleDialogContinue = () => {
    setDetectedLeavesImageFile(createImageUrl(tempRespData['boundingbox_image']))
    setDetectedLeavesImage(true)
    setDetectedLeavesCount(tempRespData['leaves_detected'])
    setCurrentStep(currentStep + 1);
    setTempRespData(null)
    setOpenDialog(false);
  };

  const handleImageClick = () => {
    // If image is already selected, let the user choose another image
    setImage(null);
    setPreview(null);
  };

  // Helper function to create a data URL from the image array
  function createImageUrl(base64Image) {
    return `data:image/png;base64,${base64Image}`;
  }

  const uploadProcessImageFile = async() => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);

      let res = await axios({
        method: "post",
        mode: 'no-cors',
        url: "/upload_process_image",
        data: formData,
      });

      if (res.status === 200) {
        if ((res.data['leaves_detected']) === 0) {
          if(leafDetectionErrorCount < 3){
            setErrorMessage("Please Upload a Leaf Image/High Quality Image to Proceed");
            setLeafDetectionErrorCount(leafDetectionErrorCount + 1)
            setOpenSnackbar(true);
          }
          else{
            setTempRespData(res.data)
            setOpenDialog(true);
          }
        } else {
          setDetectedLeavesImageFile(createImageUrl(res.data['boundingbox_image']))
          setDetectedLeavesImage(true)
          setDetectedLeavesCount(res.data['leaves_detected'])
          setCurrentStep(currentStep + 1); // Move to the next step
        }
      }

    }
  }
  
  const uploadDetectSymptoms = async() => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);

      let res = await axios({
        method: "post",
        mode: 'no-cors',
        url: "/upload_detect_symptoms",
        data: formData,
      });

      if (res.status === 200) {
        setDetectedSymtomsImageFile(createImageUrl(res.data['boundingbox_image']))
        setDetectedSymtoms(res.data['symptoms_detected'])
        setDetectedSymtomsImage(true)
        handleTypeOptionClick('Leaf symptom', 'leaf_symp')

        // const updateAnswer = (questionId, uid, label) => {
        //   setUserAnswers(prevUserAnswers => ({
        //     ...prevUserAnswers,
        //     [questionId]: uid // Assuming questionId is a unique identifier for the question
        //   }));
        // };
        
        // for (let i = 0; i < items.length; i++) {
        //   console.log(symptom);
        //   let label = detectedSymtoms[key]
        //   let label_split = label.split(" ")
        //   let symptom = label_split[1]
        //   let color = label_split[0]
        //   updateAnswer(i, uid, Option) 
        // }
        // updateAnswer(index, uid, Option)
        // console.log(userAnswers)


        
        // let label = symp.split(" ")
        // let symptom = splitValue[1]
        // let color = splitValue[0]
        
        // symptom = splitValue[1]
        // color = splitValue[0]
        

        // var index1 = sampleLeafQuestions[0].labels.indexOf(splitValue[1])
        // var Option =  sampleLeafQuestions[0].options[index1]
        // var uid = sampleLeafQuestions[0].uid

        // const updateAnswer = (questionId, uid, label) => {
        //   setUserAnswers(prevUserAnswers => ({
        //     ...prevUserAnswers,
        //     [questionId]: uid // Assuming questionId is a unique identifier for the question
        //   }));
        // };
        // updateAnswer(uid, Option)

        // console.log(userAnswers)

        // setSelectedOption(splitValue[1])
        // console.log(index1)
        // console.log(Option)
        // var index2 = sampleLeafQuestions[1].labels.indexOf(splitValue[0])
        // var Option2 =  sampleLeafQuestions[1].options[index2]
        
        // handleOptionClick(Option2, splitValue[0])
        setCurrentStep(currentStep + 1); // Move to the next step
      }

    }
  }

  const uploadSegmentLeaves = async() => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);

      let res = await axios({
        method: "post",
        mode: 'no-cors',
        url: "/upload_segment_leaves",
        data: formData,
      });

      if (res.status === 200) {
        setSegmentationMaskImageFile(createImageUrl(res.data['mask_image']))
        setSegmentationMaskImage(true)
        setSegmentedImageFile(createImageUrl(res.data['segment_image']))
        setSegmentedImage(true)

        // let formData = new FormData();
        // formData.append("file", selectedFile);

        // let res = await axios({
        //   method: "post",
        //   mode: 'no-cors',
        //   url: "/predict_disease",
        //   data: formData,
        // });

        // if (res.status === 200) {
        //   setPossibleDiseasesAfterSegmentation(res.data['disease'])
        // }
        setCurrentStep(currentStep + 1); // Move to the next step
      }
    }
  }

  const sendFileAndExtraSymptoms = async (sympom_set) => {
    setIsLoading(true);

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
          setIsLoading(false);

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
          setIsLoading(false);

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

  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option, label) => {
    console.log(option)
    console.log(label)
    if (userAnswers[currentQuestion]) {
      if (userAnswers[currentQuestion].label !== label) {
        setUserAnswers(prevAnswers => ({
          ...prevAnswers,
          [currentQuestion]: { label: label, uid: questions[currentQuestion].uid }
        }));
        setSelectedOption(label);
      } else {
        setUserAnswers(prevAnswers => ({
          ...prevAnswers,
          [currentQuestion]: ''
        }));
        setSelectedOption(null);
      }

      console.log(userAnswers);
    } else {
      setUserAnswers(prevAnswers => ({
        ...prevAnswers,
        [currentQuestion]: { label: label, uid: questions[currentQuestion].uid }
      }));
      setSelectedOption(label);
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
        setSelectedOption(userAnswers[currentQuestion - 1].label);
    }
};

//relates to circular button
const handleCircleButtonClick = (index) => {
    setCurrentQuestion(index);
    const selectedAnswer = userAnswers[index];
    setSelectedOption(selectedAnswer ? selectedAnswer.label : null);

};

  const handleTypeOptionClick = (option, label) => {

    console.log(option);
    console.log(label);
    // Check if the option is already selected
    const isOptionSelected = selectedOptions.includes(label);

    // If the option is selected, remove it from the selected options
    if (isOptionSelected) {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== label));
    } else {
      // If the option is not selected, add it to the selected options
      setSelectedOptions([...selectedOptions, label]);
    }
  };


  const handleTypeSubmission = () => {
    let concatenatedQuestions = [];
    let idCounter = 1; // Initialize ID counter
    selectedOptions.forEach((selection) => {
      let questionsToAdd = [];
      switch (selection) {
        case 'leaf_symp':
          questionsToAdd = sampleLeafQuestions.map((question) => ({ ...question, id: idCounter++ }));
          break;
        case 'stem_symp':
          questionsToAdd = sampleStemQuestions.map((question) => ({ ...question, id: idCounter++ }));
          break;
        case 'fruit_symp':
          questionsToAdd = sampleFruitQuestions.map((question) => ({ ...question, id: idCounter++ }));
          break;
        case 'flower_symp':
          questionsToAdd = sampleFlowerQuestions.map((question) => ({ ...question, id: idCounter++ }));
          break;
        case 'special_symp':
          questionsToAdd = sampleSpecialQuestions.map((question) => ({ ...question, id: idCounter++ }));
          break;
        default:
          break;
      }
      concatenatedQuestions = concatenatedQuestions.concat(questionsToAdd);
    });

    setQuestions(concatenatedQuestions);
    setFlag(1);

  }

  const goBack = () => {
    handlePredictOption(0);
    clearData();
  }

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
    setDisease(null);
    setPossibleDiseases(null);
    setDetectedLeavesImageFile(null);
    setDetectedSymtomsImageFile(null);
    setSegmentationMaskImageFile(null);
    setSegmentedImageFile(null);
    setDetectedLeavesImage(false);
    setDetectedSymtomsImage(false);
    setSegmentationMaskImage(false);
    setSegmentedImage(false);
    setCurrentStep(0);
    setLeafDetectionErrorCount(0);
    setTempRespData(null);    
    setUserAnswers({});
    setCurrentQuestion(0);
    setSelectedOption(null);
    setFlag(0);
    setSelectedOptions([]);
  };

  const steps = [
    'Upload Tomato Leaf Image',
    'Detect Disease Leaves',
    'Segment Disease Leaves',
    'Detect Disease Symptoms',
    'Answer Questions On Extra Symptoms'
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const total_steps = steps.length; // Total number of steps

  const getButtonText = () => {
    if (currentStep < (total_steps-1)) {
      return "Next"; // Show "Next" until the final step
    } else {
      return "Submit and Predict"; // Show "Submit" on the final step
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNextStep = async (event) => {
    // Your logic for handling each step
    if (currentStep < (total_steps-1)) {
      if (!image) {
        setErrorMessage('Please upload an image before continuing.');
        setOpenSnackbar(true);
        return;
      }
      if(currentStep === 0){      
        setIsLoading(true);
        try{
          await uploadProcessImageFile();
        } catch (error) {
          setErrorMessage('Error uploading image: '+ error.message);
          setOpenSnackbar(true);
        } finally {
          setIsLoading(false);
        }
      }
      else if(currentStep === 1){
        setIsLoading(true);
        try{
          await uploadSegmentLeaves();
        } catch (error) {
          setErrorMessage('Error uploading image: ', error.message);
          setOpenSnackbar(true);
        } finally {
          setIsLoading(false);
        }
      }
      else if(currentStep === 2){
        setIsLoading(true);
        try{
          await uploadDetectSymptoms();
        } catch (error) {
          setErrorMessage('Error uploading image: ', error.message);
          setOpenSnackbar(true);
        } finally {
          setIsLoading(false);
        }  
      }
      else if(currentStep === 3){
        setCurrentStep(currentStep + 1);
      }
    } else {
      handleSubmit();
    }
  };

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
      "hasLeafHaloColour",
      "hasStemSymptom",
      "hasStemSymptomColor",
      "hasFruitSymptom",
      "hasFruitSymptomColour",
      "hasFruitHalo",
      "hasOdorSymptom",
      "hasCrossSection",
      "hasOozeLiquid",
      "hasCracks",
      "hasPlantSymptom",
      "hasCurling",
      "hasFungalColour",
      "hasWebbing",
      "hasFlowerSymptom"
    ];
    var symptom_set = {}
    for (var i = 0; i < questions.length; i++) {

      if (userAnswers[i]) {
        if (userAnswers[i].label !== '') {
          var property = symptomNames[userAnswers[i].uid - 1]
          console.log(property)
          symptom_set[property] = userAnswers[i].label;
        }
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
    width: 'auto',
    height: 'auto',
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

            {selectedTab === 1 && predictOption === 1 && <Grid item xs={12}>
              <Grid container xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '5px' }}>
                <ColorButton variant="contained" color="primary" component="div" onClick={(e) => { goBack() }} >
                  Go Back
                </ColorButton>

                <div style={containerStyles2}>
                  { currentStep > 0 && <button onClick={e => handlePreviousStep()} style={buttonStylePrevious}>
                    {'Previous'}
                  </button> }

                  <button disabled={isLoading} onClick={e => handleNextStep()} style={buttonStyleNext}>
                    {isLoading ? <CircularProgress /> : getButtonText()}
                  </button>
                  
                </div>
              </Grid>

              <Stepper activeStep={currentStep} alternativeLabel className={classes.stepper}>
                {steps.map((label) => (
                  <Step key={label} >
                    <StepLabel className={classes.step}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
                  {errorMessage}
                </MuiAlert>
              </Snackbar>

              {currentStep===0 && <Box style={{ backgroundColor: 'white', maxWidth: '100%', padding: '5px', marginBottom: '40px' }}>

                <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`} style={{ maxHeight: "350px" }}>
                  {image && <CardActionArea onClick={handleImageClick}>
                    <CardMedia
                      className={classes.media}
                      image={preview}
                      component="image"
                      title="Leaf Image"
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

                <Dialog
                  open={openDialog}
                  onClose={handleDialogClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                    {"Non-Leaf Image Detected?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Our systems expect high quality leaf images as input. Image you have inputed is a low resolution or a blurry image. 
                      Since our detection model didn't detect any leaf image so, system won't work as expected. Do you want to continue?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleDialogClose}>
                      Abort
                    </Button>
                    <Button onClick={handleDialogContinue} autoFocus>
                      Continue
                    </Button>
                  </DialogActions>
                </Dialog>

              </Box>}

              {currentStep===1 && <Box style={{ backgroundColor: 'white', maxWidth: '100%', padding: '5px', marginBottom: '40px' }}>

                <Card className={`${classes.imageCard} ${!detectedLeavesImage ? classes.imageCardEmpty : ''}`} style={{ maxHeight: "350px" }}>
                  {detectedLeavesImage && <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={detectedLeavesImageFile}
                      component="image"
                      title="Detected Leaf Image"
                    />
                  </CardActionArea>
                  }
                </Card>

                <Box className={classes.descriptionBoxContent}>
                  <Typography variant="h5" gutterBottom>
                    Disease leaf detection model detect {detectedLeavesCount} disease leaves
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                  </Typography>
                </Box>
              </Box>}

              {currentStep===2 && <Box style={{ backgroundColor: 'white', maxWidth: '100%', padding: '5px', marginBottom: '40px'}}>

                <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                  <Card className={`${classes.imageCard} ${!segmentationMaskImage ? classes.imageCardEmpty : ''}`} style={{ maxHeight: '350px', margin: '10px', width: '100%' }}>
                    {segmentationMaskImage && <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={segmentationMaskImageFile}
                        component="image"
                        title="Segmentation Mask Image"
                      />
                    </CardActionArea>
                    }
                  </Card>

                  <Card className={`${classes.imageCard} ${!segmentedImage ? classes.imageCardEmpty : ''}`} style={{ maxHeight: "350px", margin: '10px', width: '100%' }}>
                    {segmentedImage && <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={segmentedImageFile}
                        component="image"
                        title="Segmented Image"
                      />
                    </CardActionArea>
                    }
                  </Card>
                </Box>

                <Box className={classes.descriptionBoxContent}>
                  <Typography variant="h6" gutterBottom>
                    Segmentation Mask and Segmented Image of disease leaves
                  </Typography>
                  {/* <Typography variant="h5" gutterBottom>
                    Predicted Disease: {possibleDiseasesAfterSegmentation} 
                  </Typography> */}
                </Box>
              </Box>}

              {currentStep===3 && <Box style={{ backgroundColor: 'white', maxWidth: '100%', padding: '5px', marginBottom: '40px' }}>

                <Card className={`${classes.imageCard} ${!detectedSymtomsImage ? classes.imageCardEmpty : ''}`} style={{ maxHeight: "350px" }}>
                  {detectedSymtomsImage && <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={detectedSymtomsImageFile}
                      component="image"
                      title="Detected Symptoms Image"
                    />
                  </CardActionArea>
                  }
                </Card>

                <Box className={classes.descriptionBoxContent}>
                  <Typography variant="h6" gutterBottom>
                    Symptoms detection model detect {detectedSymtoms} in disease leaves
                  </Typography>
                  {/* <Typography variant="h5" gutterBottom>
                    Expected diseases are: 
                  </Typography> */}
                </Box>
              </Box>}

              {currentStep===4 && <div style={{ "height": "auto", "paddingTop": "50px", "borderRadius": "10px" }}>
              {flag == 0 ?
                <div style={quizContainerStyle}>
                  {/*Questions and Answers */}
                  <div style={activeQuestionStyle}>
                    <p>{initialQuestion.question}</p>
                    <ul>
                      {initialQuestion.options.map((option, optionIndex) => (
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
                            ...(selectedOptions.includes(initialQuestion.labels[optionIndex]) ? selectedOptionStyle : optionStyle)
                          }}
                          onClick={() => handleTypeOptionClick(option, initialQuestion.labels[optionIndex])}
                        >

                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={buttonContainerStyle}>
                    <button
                      style={Object.assign({}, nextButtonStyle, currentQuestion === questions.length - 1 && hoverButtonStyle)}
                      onClick={handleTypeSubmission}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                :  
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
              }
                <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "marginTop": "60px" }}>
                  <button onClick={handleSubmit} style={{ ...buttonStyles2, "marginBottom": "50px" }}>{isLoading ? <CircularProgress /> : "Submit and Predict"}</button>
                </div>
              </div>}

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
              AgrOM
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




