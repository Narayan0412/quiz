import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css';
import { resultInitialState } from '../../constants';
import AnswerTimer from '../AnswerTimer/AnswerTimer';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [inputAnswer, setInputAnswer] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/quiz');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const { question, choices, correctAnswer, type } = questions[currentQuestion];

  const onAnswerClick = (answer, index) => {
    setAnswerIndex(index);
    setAnswer(answer === correctAnswer);
  };

  const onClickNext = async () => {
    setAnswerIndex(null);
    setShowTimer(false);

    setResult((prev) =>
      answer
        ? { ...prev, score: prev.score + 5, correctAnswers: prev.correctAnswers + 1 }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
      
      try {
        await axios.post('http://localhost:3001/api/score', {
          username: username,
          score: result.score
        });
      } catch (error) {
        console.error('Error saving score:', error);
      }
      
    }

    setTimeout(() => {
      setShowTimer(true);
    }, 100); // Add a small delay to ensure timer reset
  };

  const handleTimeout = () => {
    setAnswer(false); // Set the answer to false on timeout
    onClickNext();
  };

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
    setCurrentQuestion(0); // Reset to the first question
    setAnswerIndex(null);
    setAnswer(null);
    setInputAnswer("");
  };

  const handleInput = (event) => {
    const value = event.target.value;
    setInputAnswer(value);

    if (value === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const handleUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  }

  const getAnswerUI = () => {
    console.log(type);
    if(type === 'username'){
      return <input value={username} onChange={handleUsername}></input>
    }
    if (type === 'FIB') {
      return <input value={inputAnswer} onChange={handleInput} />;
    }
    return (
      <ul>
        {choices.map((answer, index) => (
          <li
            key={answer}
            onClick={() => onAnswerClick(answer, index)}
            className={answerIndex === index ? 'selected' : ''}
          >
            {answer}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='quiz-container'>
      {!showResult ? (
        <>
          {showTimer && <AnswerTimer duration={10} onTimeUp={handleTimeout} />}
          <span className='active-question-no'>{currentQuestion + 1}</span>
          <span className='total-question'>/{questions.length}</span>
          <h2>{question}</h2>
          {getAnswerUI()}
          <div className='footer'>
            <button
              onClick={onClickNext}
              disabled={answerIndex === null && !inputAnswer && !username}
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </>
      ) : (
        <div className='result'>
          <h3>Result</h3>
          <p>
            Total Questions: <span>{questions.length-1}</span>
          </p>
          <p>
            Total Score: <span>{result.score}</span>
          </p>
          <p>
            Correct Answers: <span>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers: <span>{result.wrongAnswers-1}</span>
          </p>
          <button onClick={onTryAgain}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
