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
      case 'cancel':
        text = 'Cancel'
        handleClick =  this.props.cancel
        break
      case 'reset':
        text = 'Reset'
        handleClick =  this.props.cancel
        break
      default:
        text = `${this.props.time} seconds`
        handleClick = (event)=>{this.props.startTimer(this.props.time, event)}
    }
    return <button
      type="button"
      className='btn-default btn'
      onClick={handleClick}>
      {text}
    </button>
  }
}
