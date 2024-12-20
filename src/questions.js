import { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React from "react";
import { Paper, CardActionArea, CardMedia, Grid, Button, CircularProgress } from "@material-ui/core";
//import image from "./bg2.jpg";
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';
import { sampleQuestions } from "./constants/sampleQuestions";
import { initialQuestion, sampleLeafQuestions, sampleStemQuestions, sampleFruitQuestions, sampleSpecialQuestions, sampleFlowerQuestions } from "./constants/sampleQuestions";



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
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: "auto",
        marginTop: "8px",
        marginBottom: "16px",
    },
    input: {
        display: 'none',
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

const Questions = () => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [data, setData] = useState();
    const [image, setImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [disease, setDisease] = useState();
    const [possibleDiseases, setPossibleDiseases] = useState();
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [flag, setFlag] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);


    let confidence = 0;

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
    }


    const [questions, setQuestions] = useState([]);

    const [userAnswers, setUserAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);


    const handleOptionClick = (option, label) => {
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

    const clearData = () => {
        setData(null);
        setImage(false);
        setSelectedFile(null);
        setPreview(null);
        setDisease(null);
        setPossibleDiseases(null);
        setUserAnswers({});
        setCurrentQuestion(0);
        setSelectedOption(null);
        setFlag(0);
        setSelectedOptions([]);

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
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: 'auto',
        height: 'auto',
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
            "hasLeafHaloColour",
            "hasStemSymptom",
            "hasStemSymptomColor",
            "hasFruitSymptom",
            "hasFruitSymptomColour",
            "hasFruitHalo",
            "hasOdorSymptom",
            "hasCrossSection",
            "hasOozeSymptom",
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




    if (flag == 0) {
        return (
            <React.Fragment>
                <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
                    {selectedTab === 0 && (
                        <Grid item xs={12}>
                            <div>
                                {/* Quiz container */}
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
                            </div>
                        </Grid>
                    )}
                </Container>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
                    {selectedTab === 0 && <Grid item xs={12}>
                        <div>
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

                        {/* Predict button */}
                        <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "marginTop": "60px" }}>
                            <button onClick={handleSubmit} style={buttonStyles2}>{isLoading ? <CircularProgress /> : "Submit and Predict"}</button>
                            {/* <button onClick={handleSubmitWithPrevious} style={buttonStyles2}>Submit and predict with previous obesrvations</button> */}
                        </div>

                        <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "marginTop": "60px", "marginBottom": "30px" }}>
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
                        </div>
                    </Grid>}
                </Container >
            </React.Fragment >
        );
    }
};

export default Questions