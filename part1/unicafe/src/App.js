import { useState } from 'react'

const Button = (props) =>
  <button onClick={props.handleClick}>
    {props.text}
  </button>

const Display = ({text, amount}) => <div>{text} {amount}</div>

const Statistics = ({good, neutral, bad}) => (
  <>
    <h1>statistics</h1>
    <Display text='good' amount={good} />
    <Display text='neutral' amount={neutral} />
    <Display text='bad' amount={bad} />
    <Display text='all' amount={good + neutral + bad} />
    <Display text='average' amount={(good - bad) / (good + neutral + bad)} />
    <Display text='positive' amount={good / (good + neutral + bad) * 100 + " %"} />
  </>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good + 1)} />
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App