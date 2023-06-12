import { useState, useEffect } from 'react';
import './assets/App.scss';
import RoundProgressBar from './components/RoundProgressBar';
import MinutesCounter from './components/MinutesCounter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

RoundProgressBar.defaultProps = {
  size: 200,
  strokeWidth: 10,
  stroke: "red",
  text: ""
};

function App() {
  const [breakMinute, setBreakMinute] = useState(5);
  const [sessionMinute, setSessionMinute] = useState(25);
  const [play, setPlay] = useState(false);
  const [reset, setReset] = useState(false);
  const audioElement = document.getElementById("beep");

  function handleBreakLength(breakMinute) {
    setBreakMinute(breakMinute);
  }

  function handleSessionLength(sessionMinute) {
    setSessionMinute(sessionMinute);
  }

  function resetPomodore(value) {
    setReset(value);
    if (value) {
      setPlay(false);
      audioElement.pause();
      audioElement.currentTime = 0;
      setBreakMinute(5);
      setSessionMinute(25);
    }
  }

  useEffect(() => {
    if (play) {
      setReset(false);
    }
  }, [play]);

  return (
    <div className="pomodore">
      <div className="pomodore-counters">
        <MinutesCounter
          reset={reset}
          resetPomodore={resetPomodore}
          type={"break"}
          title={"Break Length"}
          defaultMinute={5}
          handleBreakLength={handleBreakLength}
          decrementID={"break-decrement"}
          incrementID={"break-increment"}
          buttonID={"break-label"}
          minuteLengthID={"break-length"}
        />
        <MinutesCounter
          reset={reset}
          resetPomodore={resetPomodore}
          type={"session"}
          title={"Session Length"}
          defaultMinute={25}
          handleSessionLength={handleSessionLength}
          decrementID={"session-decrement"}
          incrementID={"session-increment"}
          buttonID={"session-label"}
          minuteLengthID={"session-length"}
        />
      </div>
      <div className="pomodore-progress">
        <RoundProgressBar
          size={200}
          strokeWidth={5}
          sessionMinute={sessionMinute}
          breakMinute={breakMinute}
          text="25:00"
          play={play}
          reset={reset}
          resetPomodore={resetPomodore}
        />
      </div>
      <div className="button-wrapper">
        <div id="start_stop" onClick={() => setPlay(!play)} className="play-button">
          <FontAwesomeIcon icon={play ? faPause : faPlay} />
        </div>
        <div
          id="reset"
          onClick={() => resetPomodore(true)}
          className="play-button reset-button"
        >
          <FontAwesomeIcon icon={faArrowsRotate} />
        </div>
      </div>
      <audio
        className="clip"
        id="beep"
        src="https://cdn.freesound.org/previews/198/198841_285997-lq.mp3"
      ></audio>
    </div>
  );
}

export default App;
