const Timer = (props) => {
  if (props.timeLeft == null || props.timeLeft == 0)
    return <div/>
  return <h1>Time left: {props.timeLeft}</h1>
}
