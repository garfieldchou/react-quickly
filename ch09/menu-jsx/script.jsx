class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menus: ['Menu']
    }
  }
  componentDidMount() {
    fetch(this.props['data-url'])
      .then(response=> response.json())
      .then(menus=>{this.setState({menus: menus.indexPage})})
  }
  render() {
    return (
      <div>
        {this.state.menus.map((v,i) => {
          return <div key={i}><Link label={v}/></div>
        })}
      </div>
    )
  }
}

class Link extends React.Component {
  render() {
    const url='/'
      + this.props.label
        .toLowerCase()
        .trim()
        .replace(' ', '-')
    return <div>
      <a href={url}>
      {this.props.label}
      </a>
      <br/>
    </div>
  }
}

ReactDOM.render(<Menu data-url='menus.json'/>, document.getElementById('menu'))
