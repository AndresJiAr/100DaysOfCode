const PLAY = "fas fa-play";
const PAUSE = "fas fa-pause";
const RESET = "fas fa-undo";
const INCREMENT = "fas fa-plus";
const DECREMENT = "fas fa-minus";
const BEEP = "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3";

const BREAK = 5;
const SESSION = 25;

const DEFAULT = {
  break: BREAK,
  session: SESSION,
  currentInterval: "Session",
  currentDuration: SESSION * 60,
  counting: false
};

class Clock extends React.Component {
  constructor() {
    super();
    this.state = DEFAULT;
  }
  
  componentDidMount = () => {
    this.audio = document.getElementById("beep");
  }

  handleClick = event => {
    const element = event.target.id;
    switch (element) {
      case "start_stop":
      case "reset":
        this.toggleTimer(element);
        break;
      case "break-increment":
      case "break-decrement":
      case "session-increment":
      case "session-decrement":
        this.toggleLength(element);
        break;
    }
  };

  toggleTimer = element => {

    switch (element) {
      case "start_stop":
        this.toggleStartStop();
        break;
      case "reset":
        this.audio.pause();
        this.audio.currentTime = 0;
        if (this.timerId) {
          clearInterval(this.timerId);
        }
        this.setState(DEFAULT);
        break;
    }
  };

  toggleStartStop = () => {
    if (this.state.counting) {
      clearInterval(this.timerId);
      this.setState({ counting: false });
    } else {
      this.setState({ counting: true });
      this.timerId = setInterval(this.tick, 1000);
    }
  };

  tick = () => {
    const currentDuration = this.state.currentDuration
    if (!currentDuration) {
      this.changeInterval()
    } else {
      const newDuration = currentDuration - 1;
      if (newDuration === 0) {
        let count = 0
        this.audio.onended = () => {
          if (count < 2) {
            count ++
            this.audio.play()
          }
        }
        this.audio.play()
      }
      this.setState({
        currentDuration: newDuration
      })
    }
  };

  changeInterval = () => {
    const newInterval = this.state.currentInterval === "Session" ? "Break" : "Session"
    const newDuration = this.state[newInterval.toLowerCase()] * 60
    this.setState({
      currentInterval: newInterval,
      currentDuration: newDuration
    })
  }

  toggleLength = element => {
    if (!this.state.counting) {
      const interval = element.split("-")[0];
      const change = element.split("-")[1];
      const currentDuration = this.state[interval]
      let newDuration
      if (change === "increment" && currentDuration < 60) {
        newDuration = currentDuration + 1
      } else if (change === "decrement" && currentDuration > 1) {
        newDuration = currentDuration - 1
      } else {
        newDuration = currentDuration
      }
      let newState = {};
      newState[interval] = newDuration;
      if (
        this.state.currentInterval ===
        interval[0].toUpperCase() + interval.slice(1)
      ) {
        newState.currentDuration = newDuration * 60;
      }
      this.setState(newState);
    }
  };

  render() {
    return (
      <div id="clock">
        <h1>Pomodoro Clock</h1>
        <div className="setter-container">
          <Setter
            setType="break"
            length={this.state.break}
            onClick={this.handleClick}
          />
          <Setter
            setType="session"
            length={this.state.session}
            onClick={this.handleClick}
          />
        </div>
        <Timer
          currentInterval={this.state.currentInterval}
          currentDuration={this.state.currentDuration}
        />
        <div className="timerButton-container">
          <TimerButton
            buttonType="start_stop"
            onClick={this.handleClick}
            counting={this.state.counting}
          />
          <TimerButton
            buttonType="reset"
            onClick={this.handleClick}
            counting={this.state.counting}
          />
        </div>
        <audio id="beep" src={BEEP} preload="auto"/>
      </div>
    );
  }
}

const Timer = props => {
  const minutes = Math.floor(props.currentDuration / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (props.currentDuration % 60).toString().padStart(2, "0");
  return (
    <div id="timer">
      <h2 id="timer-label">{props.currentInterval}</h2>
      <time id="time-left">
        {minutes}:{seconds}
      </time>
    </div>
  );
};

const TimerButton = props => {
  const icon =
    props.buttonType === "start_stop" ? (props.counting ? PAUSE : PLAY) : RESET;
  return <i id={props.buttonType} className={icon} onClick={props.onClick} />;
};

const Setter = props => {
  const labelId = `${props.setType}-label`;
  const label = `${props.setType[0].toUpperCase() +
    props.setType.slice(1)} Length`;
  const lengthId = `${props.setType}-length`;
  const length = props.length;
  const incrementId = `${props.setType}-increment`;
  const decrementId = `${props.setType}-decrement`;
  return (
    <div className="setter">
      <h2 id={labelId}>{label}</h2>
      <SetButton buttonId={decrementId} onClick={props.onClick} />
      <span id={lengthId}>{length}</span>
      <SetButton buttonId={incrementId} onClick={props.onClick} />
    </div>
  );
};

const SetButton = props => {
  const icon =
    props.buttonId.split("-")[1] === "increment" ? INCREMENT : DECREMENT;
  return <i id={props.buttonId} className={icon} onClick={props.onClick} />;
};

ReactDOM.render(<Clock />, document.getElementById("root"));
