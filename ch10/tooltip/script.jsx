class Tooltip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {opacity: false}
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    const tooltipNode = ReactDOM.findDOMNode(this)
    this.setState({
      opacity: !this.state.opacity,
      top: tooltipNode.offsetTop,
      left: tooltipNode.offsetLeft
    })
  }
  render() {
    const style = {
      zIndex: (this.state.opacity) ? 1000 : -1000,
      opacity: +this.state.opacity,
      top: (this.state.top || 0) - this.props.moveTop,
      left: (this.state.left || 0) - 30
    }
    console.log(style.top, style.left);
    return (
      <div style={{display: 'inline'}}>
        <span style={{color: 'blue'}}
          onClick={this.props.overOrClick === 'click' ? this.toggle : null}
          onMouseEnter={this.props.overOrClick === 'over' ? this.toggle : null}
          onMouseOut={this.props.overOrClick === 'over' ? this.toggle : null}
          >
          {this.props.children}
        </span>
        <div className="tooltip top" style={style} role="tooltip">
          <div className="tooltip-arrow"></div>
          <div className="tooltip-inner">
            {this.props.text}
          </div>
        </div>
      </div>
    )
  }
}

Tooltip.defaultProps = {overOrClick: 'over', moveTop: 30}

ReactDOM.render(<div>
  <Tooltip text="Master Express.js-The Node.js Framework For Your Web Development" moveTop="65">Pro Express.js</Tooltip> was published in 2014. It was one of the first books on v4.x. And it was my second book published with Apress
    after <Tooltip text="Practical Node.js: Building Real-World Scalable Web Apps" overOrClick="click" moveTop="60">Practical Node.js</Tooltip>.
    ...
    The main focus of this post is to compare the four Node.js/Io.js frameworks: <Tooltip text="HTTP API server">Hapi</Tooltip>, <Tooltip text="Release the Kraken!">Kraken</Tooltip>, <Tooltip text="Sail away">Sails.js</Tooltip> and <Tooltip text="IBM of frameworks">Loopback</Tooltip>. There are many other frameworks to consider, but I had to draw the line somewhere.
  </div>,
  document.getElementById('tooltip'))
