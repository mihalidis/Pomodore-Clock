import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

function MinutesCounter(props) {
  const [minute, setMinute] = useState(props.defaultMinute);

  function increaseMinute() {
    setMinute((pastValue) => {
      return pastValue >= 0 && pastValue < 60 ? pastValue + 1 : pastValue;
    });
  }

  function decreaseMinute() {
    setMinute((pastValue) => {
      return pastValue > 1 ? pastValue - 1 : pastValue;
    });
  }

  useEffect(() => {
    switch (props.type) {
      case "break":
        props.handleBreakLength(minute);
        break;
      case "session":
        props.handleSessionLength(minute);
        break;
    }
  }, [minute]);

  useEffect(() => {
    setMinute(props.defaultMinute);
  }, [props.defaultMinute]);

  useEffect(() => {
    if (props.reset) {
      setMinute(props.defaultMinute);
      props.resetPomodore(false);
    }
  }, [props.reset]);

  return (
    <div className="minutes-counter">
      <span id={props.buttonID} className="counter-title">
        {props.title}
      </span>
      <div className="button-wrapper">
        <FontAwesomeIcon className='arrow' icon={faArrowUp} id={props.incrementID} onClick={increaseMinute} />
        <span id={props.minuteLengthID} className="count">
          {minute}
        </span>
        <FontAwesomeIcon className='arrow' icon={faArrowDown} id={props.decrementID} onClick={decreaseMinute} />
      </div>
    </div>
  );
}

export default MinutesCounter;