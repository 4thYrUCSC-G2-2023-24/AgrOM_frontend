import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Tabs, Tab } from '@material-ui/core';
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
//import image from "./bg2.jpg";
import image from "./field.jpeg";

import ooze from "./ooze.png";
import halo from './halo.png';
import cross from './cross_section.png'
import rings from './rings.jpg'
import stem_ring from './stem_rings.PNG'
import lesion from './Lesion.PNG'
import spot from './Spots.PNG'
import fungus from './Fungus.png'
import crack from './cracks.png'
import noimage from './noimage.png'
import curl from './curl.png'
import wilt from './wilt.png'
import gray_fungus from './gray_fungus.png'
import stem_lesions from './stem_lesion.jpg'
import stem_spot from './spot-stem.jpg'
import fruit_spot from './fruit_spot.jpg'
import fruit_ring from './fruit_rings.jpg'
import fruit_lesion from './fruit_lesion.jpg'
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';




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
    containerStyles3: {
        height: "100px",
        width: "-webkit-fill-available",
        borderRadius: "15px",
        padding: "15px 22px",
        color: "#000000a6",
        fontSize: "20px",
        fontWeight: 900,
        marginTop: "10px"
    },
    root: {
        maxWidth: 345,
        flexGrow: 1,
    },
    media: {
        width: 600,
        height: 600,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    gridContainer: {
        justifyContent: "center",
        padding: "4em 1em 0 1em",
    },
    mainContainer: {
        backgroundImage: `url(${image})`,                                 //'#CCCCCC',                              //'#F2F3F5',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: "130vh",
        marginTop: "8px",
    },
    imageCard: {
        margin: "auto",
        maxWidth: 600,
        maxWidth: 600,
        height: 600,
        background: "#008000",
        boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
        borderRadius: '15px',
    },
    imageCardEmpty: {
        height: 'auto',
    },
    noImage: {
        margin: "auto",
        width: 600,
        height: "600 !important",
    },
    input: {
        display: 'none',
    },
    uploadIcon: {
        background: '#008000',
    },

    text: {
        color: 'white !important',
        textAlign: 'center',
    },

    buttonGrid: {
        maxWidth: "600px",
        width: "100%",
    },

    appbar: {
        background: '#008000',
        boxShadow: 'none',
        color: 'white'
    },
    loader: {
        color: '#be6a77 !important',
    },


    logo: {
        marginLeft: theme.spacing(2), // Add spacing between logo and tabs
    },

    dropZone: {
        height: "565px",

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

export const ImageUpload3 = () => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [data, setData] = useState();
    const [image, setImage] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [disease, setDisease] = useState();
    const [possibleDiseases, setPossibleDiseases] = useState();
    const [selectedTab, setSelectedTab] = React.useState(0);

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
    }


    const [questions] = useState([
        {
            id: 1,
            question: 'What is the type of Leaf symptom?',
            options: ['Lesion', 'Spot', 'Concentric ring'],
            labels: ['lesions', 'spot', 'rings'],
            images: [lesion, spot, rings],
        },
        {
            id: 2,
            question: 'What is the color of Leaf symptom?',
            options: ['Black', 'Brown'],
            labels: ['black', 'brown'],
        },
        {
            id: 3,
            question: 'Are there halos in the leaf?',
            options: ['Yes', 'No'],
            labels: ['Yes', 'No'],
            images: [spot, noimage],

        },
        {
            id: 4,
            question: 'What is the type of stem symptom? (You can use the guide and based on that select the option)',
            options: ['Lesion', 'Spot', 'Concentric ring'],
            labels: ['lesions', 'spot', 'rings'],
            images: [stem_lesions, stem_spot, stem_ring],
        },
        {
            id: 5,
            question: 'What is the color of Stem symptom?',
            options: ['Black', 'Brown'],
            labels: ['black', 'brown'],
        },
        {
            id: 6,
            question: 'What is the type of fruit symptom? (You can use the guide to get better understanding)',
            options: ['Lesion', 'Spot', 'Concentric ring'],
            labels: ['lesions', 'spot', 'rings'],
            images: [fruit_lesion, fruit_spot, fruit_ring],
        },
        {
            id: 7,
            question: 'What is the color of Fruit symptom?',
            options: ['Black', 'Brown'],
            labels: ['black', 'brown'],
        },
        {
            id: 8,
            question: 'Are there any halos in the fruit?',
            options: ['Yes', 'No'],
            labels: ['Yes', 'No'],
            images: [halo, noimage],
        },
        {
            id: 9,
            question: 'Is there a bad odor coming out from the plant?',
            options: ['Yes', 'No'],
            labels: ['Yes', 'No'],
        },
        {
            id: 10,
            question: 'Is there any cross section of symptoms appearing when you cut stems?',
            options: ['Yes', 'No'],
            labels: ['Yes', 'No'],
            images: [cross, noimage]
        },
        {
            id: 11,
            question: 'Is there any ooze liquid presence in tomato fruit',
            options: ['Yes', 'No'],
            labels: ['Yes', 'No'],
            images: [ooze, noimage]
        },
        {
            id: 12,
            question: 'Are there any cracks in the middle of the spots?',
            options: ['Yes', 'No'],
            labels: ['Yes', 'No'],
            images: [crack, noimage],
        },
        {
            id: 13,
            question: 'Is your plant showing wilting',
            options: ['Yes', 'No'],
            labels: ['Yes', 'No'],
            images: [wilt, noimage]
        },
        {
            id: 14,
            question: 'Are most of tomato leaves showing curling symptom?',
            options: ['Yes', 'No'],
            labels: ['Yes', 'No'],
            images: [curl, noimage],
        },
        {
            id: 15,
            question: 'Are there any fluffy fungus symptom?',
            options: ['Yes', 'No'],
            labels: ['Yes', 'No'],
            images: [fungus, noimage],
        },

    ]);

    const [userAnswers, setUserAnswers] = useState(new Array(questions.length).fill(''));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option, label) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestion] = label;
        setUserAnswers(newAnswers);
        setSelectedOption(label);
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
    //   sendFileAndExtraSymptoms();
    // }, [preview]);

    const onSelectFile = (files) => {
        if (!files || files.length === 0) {
            setSelectedFile(undefined);
            setImage(false);
            setData(undefined);
            return;
        }
        setSelectedFile(files[0]);
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


    const containerStyles = {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-around',
    };

    const labelStyles = {
        color: 'black', // Change 'red' to the color you desire
        fontSize: '18px',
        marginBottom: '10px', // Add margin-bottom for spacing
    };

    const buttonStyles = {
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '10px',
        marginTop: '10px'

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

    const containerStyles2 = {
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };



    const quizContainerStyle = {
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '600px',
        height: '600px',
        overflowY: 'auto'
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






    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: currentQuestion === 0 ? 'flex-end' : 'space-between',
        marginTop: '20px',
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


    const handleSubmit = () => {
        const symptomNames = [
            "hasLeafSymptom",
            "hasLeafSymptomColour",
            "hasStemSymptom",
            "hasStemSymptomColor",
            "hasFruitSymptom",
            "hasFruitSymptomColour",
            "hasBadOdor",
            "hasCrossSection",
            "hasOozeLiquid",
            "hasCrackInMiddle",
            "hasWilting",
            "hasCurling",
            "hasFungalSymptom",

        ];
        var symptom_set = {}
        for (var i = 0; i < userAnswers.length; i++) {
            if (userAnswers[i] !== '') {
                symptom_set[symptomNames[i]] = userAnswers[i];
            }
        }
        var x = sendFileAndExtraSymptoms(symptom_set);
    };





    return (
        <React.Fragment>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <Typography className={classes.title} style={{
                        "font-family": "Poppins",
                        "font-weight": 300,
                        "font-style": "normal"
                    }} variant="h6" noWrap>
                        AgrOM : Hybrid Tomato Plant Disease Detection System
                    </Typography>
                    <div className={classes.grow} />
                    <Tabs value={selectedTab} onChange={handleTabChange}>
                        <Tab label="Home" />
                        <Tab label="Guide" />


                        {/* Add more tabs as needed */}
                    </Tabs>
                    <Avatar src={logo} className={classes.logo}></Avatar>
                </Toolbar>
            </AppBar>
            <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
                <Grid
                    className={classes.gridContainer}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    {selectedTab === 0 && <Grid item xs={12}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
                                {image && <CardActionArea>
                                    <img
                                        className={classes.media}
                                        src={preview}
                                        alt="Preview"
                                        title="Contemplative Reptile"
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
                            {data && selectedTab === 0 &&
                                <Grid item className={classes.buttonGrid} >

                                    <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                                        Clear
                                    </ColorButton>
                                </Grid>}

                            {disease && selectedTab === 0 &&
                                <Grid item className={classes.buttonGrid} >

                                    <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                                        {disease}
                                    </ColorButton>
                                </Grid>}

                            {possibleDiseases && selectedTab === 0 &&
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

                            {/* Quiz container */}
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
                                                            style={{ maxWidth: '200px', maxHeight: '250px', marginLeft: '10px' }}
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

                        {/* Predict button */}
                        <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "marginTop": "60px" }}>
                            <button onClick={handleSubmit} style={buttonStyles2}>Submit and predict</button>
                            {/* <button onClick={handleSubmitWithPrevious} style={buttonStyles2}>Submit and predict with previous obesrvations</button> */}
                        </div>
                    </Grid>}
                </Grid >
            </Container >
        </React.Fragment >
    );
};