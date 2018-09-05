class TimerWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state =  {timeLeft: null, timer: null, pause: false, originalValue: null}
    this.startTimer = this.startTimer.bind(this)
    this.pauseResume = this.pauseResume.bind(this)
    this.cancel = this.cancel.bind(this)
    this.reset = this.reset.bind(this)
  }
  startTimer(timeLeft, event) {
    let originalValue = this.state.originalValue
    if (event) {
      originalValue = event.currentTarget.innerText.match(/(^[\d]+) seconds/)[1]
    }
    clearInterval(this.state.timer)
    let timer = setInterval(() => {
      console.log('2: Inside of setInterval')
      var timeLeft = this.state.timeLeft - 1
      if (timeLeft == 0) clearInterval(timer)
      this.setState({timeLeft: timeLeft})
    }, 1000)
    console.log('1: After setInterval')
    return this.setState({timeLeft: timeLeft, timer: timer, pause: false, originalValue: originalValue})
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
  cancel() {
    clearInterval(this.state.timer)
    this.setState({timeLeft: null, timer: null, pause: false, originalValue: null})
  }
  reset() {
    if (this.state.originalValue) {
      clearInterval(this.state.timer)
      this.startTimer(this.state.originalValue)
    }
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
          <Button func="cancel" cancel={this.cancel}/>
          <Button func="reset" cancel={this.reset}/>
        </div>
        <Timer timeLeft={this.state.timeLeft}/>
      <Audio src="flute_c_long_01.wav" timeLeft={this.state.timeLeft}/>
      </div>
    )
  }
}

ReactDOM.render(
  <div>
    <SliderButtons/>
    <TimerWrapper/>
  </div>,
  document.getElementById('timer-app')
)
