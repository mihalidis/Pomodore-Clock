import { useState, useEffect } from 'react'

function RoundProgressBar(props) {
  const [seconds, setSeconds] = useState(60);
  const [minutes, setMinutes] = useState(props.sessionMinute);
  const [sessionType, setSessionType] = useState("Session");
  // circle bar values
  const [max, setMax] = useState(props.sessionMinute * 60);
  const [value, setValue] = useState(props.sessionMinute * 60);

  const audioElement = document.getElementById("beep");

  const size = props.size;
  const radius = (props.size - props.strokeWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * value) / max;

  const percentage = ((value / max) * 100).toFixed();

  useEffect(() => {
    setValue(props.sessionMinute * 60);
    setMax(props.sessionMinute * 60);
  }, [props.sessionMinute]);

  useEffect(() => {
    setMinutes(props.sessionMinute);
  }, [props.sessionMinute]);

  useEffect(() => {
    let timerId = null;

    if (props.play && !(minutes === 0 && seconds === 0)) {
      timerId = setTimeout(() => {
        if (seconds === 60) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [props.play, minutes, seconds]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      if (sessionType === "Session") {
        setSessionType("Break");
        setMinutes(props.breakMinute);
        setSeconds(60);
        handlePlaySound();
      } else {
        setSessionType("Session");
        setMinutes(props.sessionMinute);
        setSeconds(60);
        handlePlaySound();
      }
    }
  }, [minutes, seconds]);

  useEffect(() => {
    if (!props.reset) {
      setValue(value - 1);
    }
  }, [seconds]);

  useEffect(() => {
    if (props.reset) {
      setSessionType("Session");
      setMinutes(props.sessionMinute);
      setSeconds(60);
    }
  }, [props.reset]);

  function handlePlaySound() {
    audioElement.volume = 1;
    audioElement.play();
  }

  return <>
    <div className="timer-wrapper">
      <span id="timer-label" className="timer-label">
        {sessionType}
      </span>
      <span
        id="time-left"
        className="time-left"
        style={{
          fontSize: "2.5rem",
          fontFamily: "IBM Plex Sans",
          fontWeight: "bold",
          textShadow: "4px 1px 5px rgba(39,43,69,0.73)"
        }}
      >
        {`${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds === 60 ? "00" : seconds
        }`}
      </span>
      <svg width={props.size} height={props.size} viewBox={viewBox}>
        <circle
          fill={"none"}
          stroke={"#3C4163"}
          cx={props.size / 2}
          cy={props.size / 2}
          r={radius}
          strokeWidth={`${props.strokeWidth}px`}
        />
        <circle
          fill={"none"}
          stroke={sessionType === "Session" ? "#612FF5" : "#FFAA5C"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          cx={props.size / 2}
          cy={props.size / 2}
          r={radius}
          strokeWidth={`${props.strokeWidth}px`}
          transform={`rotate(-90 ${props.size / 2} ${props.size / 2})`}
        />
      </svg>
    </div>
  </>;
}

export default RoundProgressBar;