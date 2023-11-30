// QuizApp.js

import React, { useState } from 'react';

const Questions = () => {
    const [questions] = useState([
        {
            id: 1,
            question: 'Is there any fruit symptoms in that plant?',
            options: ['Yes', 'No'],
        },
        {
            id: 2,
            question: 'What is the type of fruit symptom? (You can use the guide and based on that select the option)',
            options: ['Lesion', 'Spot', 'Concentric ring', 'Irregular'],
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

    const nextButtonStyle = {
        marginTop: '10px',
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
            <h1>Please answer the follwoing questions to make more accurate prediction</h1>
            {questions.map((q, index) => (
                <div key={q.id} style={index === currentQuestion ? activeQuestionStyle : questionStyle}>
                    <p>{q.question}</p>
                    <ul>
                        {q.options.map((option, optionIndex) => (
                            <li
                                key={optionIndex}
                                style={option === selectedOption ? selectedOptionStyle : optionStyle}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <button
                style={Object.assign({}, nextButtonStyle, currentQuestion === questions.length - 1 && hoverButtonStyle)}
                onClick={handleNextQuestion}
            >
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next Question'}
            </button>
        </div>
    );
};

export default Questions;

