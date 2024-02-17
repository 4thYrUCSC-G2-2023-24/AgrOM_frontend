import React, { useState } from 'react';
import lesion from './Lesion.PNG';
import spot from './Spots.PNG';
import rings from './rings.jpg';

const Questions = () => {
    const [questions] = useState([
        {
            id: 1,
            question: 'Is there any specific type of leaf symptoms in that plant?',
            options: ['Yes', 'No'],
            images: [lesion, spot],
        },
        {
            id: 2,
            question: 'What is the type of Leaf symptom?',
            options: ['Lesion', 'Spot', 'Concentric ring'],
            images: [lesion, spot, rings],
        },
        {
            id: 3,
            question: 'Is there any Stem symptoms in that plant?',
            options: ['Yes', 'No'],
        },
        {
            id: 4,
            question: 'What is the type of stem symptom? (You can use the guide and based on that select the option)',
            options: ['Lesion', 'Spot', 'Concentric ring', 'Irregular'],
        },
        {
            id: 5,
            question: 'Is there a bad odor coming out from the plant?',
            options: ['Yes', 'No'],
        },
    ]);

    const [userAnswers, setUserAnswers] = useState(new Array(questions.length).fill(''));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestion] = option;
        setUserAnswers(newAnswers);
        setSelectedOption(option);
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

    const quizContainerStyle = {
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };

    const questionStyle = {
        display: 'none',
    };

    const activeQuestionStyle = {
        display: 'block',
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

    return (
        <div style={quizContainerStyle}>
            <h1>Please answer the following questions to make a more accurate prediction</h1>
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
                                    ...(option === selectedOption ? selectedOptionStyle : optionStyle)
                                }}
                                onClick={() => handleOptionClick(option)}
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
    );
};

export default Questions;
