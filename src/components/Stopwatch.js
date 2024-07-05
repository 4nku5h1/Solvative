import React, { useState, useRef, useEffect } from "react";
import "./stopwatch.scss";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [lap, setLap] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
    setIsStopped(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsStopped(true);
    setLap(time);
    setTime(0);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsStopped(false);
    setTime(0);
  };

  const getTime = (time) => {
    return new Date(time * 1000).toISOString().substr(11, 8);
  };

  return (
    <div className="stopwatch-container flex-center">
      <h1 className="header">Stopwatch</h1>
      <div className="stopwatch flex-center">
        <h2 className="display">{getTime(time)}</h2>

        <div className="controls">
          <button
            className={isRunning ? "pause" : "start"}
            onClick={handleStartPause}
          >
            {isRunning ? "Pause" : time > 0 ? "Resume" : "Start"}
          </button>
          <button
            className="stop"
            onClick={handleStop}
            disabled={isStopped || time === 0}
          >
            Stop
          </button>
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
        {isStopped && 
        <p className="laps">Stopped at: {getTime(lap)}</p>}
      </div>
    </div>
  );
};

export default Stopwatch;
