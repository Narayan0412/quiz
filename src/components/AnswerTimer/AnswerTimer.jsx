import React, { useEffect, useState, useRef } from 'react';
import './AnswerTimer.css';

const AnswerTimer = ({ duration, onTimeUp }) => {
  const [counter, setCounter] = useState(0);
  const [progressLoader, setProgressLoader] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((curr) => curr + 0.1);
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (counter >= duration) {
      setProgressLoader(100);
      clearInterval(intervalRef.current);
      setTimeout(() => {
        onTimeUp();
      }, 100);
    } else {
      setProgressLoader(100 * (counter / duration));
    }
  }, [counter, onTimeUp]);

  return (
    <div className='answer-timer-container'>
      <div
        className='progress'
        style={{
          width: `${progressLoader}%`
        }}
      />
    </div>
  );
};

export default AnswerTimer;
