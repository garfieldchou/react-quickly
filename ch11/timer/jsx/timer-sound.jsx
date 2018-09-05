class Audio extends React.Component {
  constructor(props) {
    super(props)
    this.handleTimeUp = this.handleTimeUp.bind(this)
  }
  handleTimeUp() {
    let audioNode = ReactDOM.findDOMNode(this)
    audioNode.play()
  }
  componentDidUpdate() {
    if (this.props.timeLeft == 0) this.handleTimeUp()
  }
  render() {
    return <audio src={this.props.src} preload="auto"></audio>
  }
}
