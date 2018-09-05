const Timer = (props) => {
  if (props.timeLeft == 0) {
    document.getElementById('end-of-time').play()
  }
  if (props.timeLeft == null || props.timeLeft == 0)
    return <div/>
  return <h1>Time left: {props.timeLeft}</h1>
}

class Button extends React.Component {
  startTimer(event) {
    return this.props.startTimer(this.props.time)
  }
  render() {
    let text = ''
    let handleClick = null
    switch (this.props.func) {
      case 'pauseResume':
        text = 'Pause/Resume'
        handleClick = this.props.pauseResume
        break
      default:
        text = `${this.props.time} seconds`
        handleClick = ()=>{this.props.startTimer(this.props.time)}
    }
    return <button
      type="button"
      className='btn-default btn'
      onClick={handleClick}>
      {text}
    </button>
  }
}

class TimerWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state =  {timeLeft: null, timer: null, pause: false}
    this.startTimer = this.startTimer.bind(this)
    this.pauseResume = this.pauseResume.bind(this)
  }
  startTimer(timeLeft) {
    clearInterval(this.state.timer)
    let timer = setInterval(() => {
      console.log('2: Inside of setInterval')
      var timeLeft = this.state.timeLeft - 1
      if (timeLeft == 0) clearInterval(timer)
      this.setState({timeLeft: timeLeft})
    }, 1000)
    console.log('1: After setInterval')
    return this.setState({timeLeft: timeLeft, timer: timer, pause: false})
  }
  pauseResume() {
    if (this.state.timer === null) return;
    if (!this.state.pause) {
      clearInterval(this.state.timer)
    } else {
      this.startTimer(this.state.timeLeft)
    }
    this.setState({pause: !this.state.pause})
  }
  render() {
    return (
      <div className="row-fluid">
        <h2>Timer</h2>
        <div className="btn-group" role="group" >
          <Button time="5" startTimer={this.startTimer}/>
          <Button time="10" startTimer={this.startTimer}/>
          <Button time="15" startTimer={this.startTimer}/>
          <Button func="pauseResume" pauseResume={this.pauseResume}/>
        </div>
        <Timer timeLeft={this.state.timeLeft}/>
      <audio id="end-of-time" src="flute_c_long_01.wav" preload="auto"></audio>
      </div>
    )
  }
}

ReactDOM.render(
  <TimerWrapper/>,
  document.getElementById('timer-app')
)
