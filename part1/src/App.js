import React, { useState } from 'react'

const StatisticLine = ({text, value}) => <tr><td>{text}</td> <td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad
  let average = (good - bad) / all
  let positive = good / all

  if (good === 0 && neutral === 0 && bad === 0)
    return(
      <div>
        No feedback given
      </div>)
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + " %"} />
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood}text="good"/>
      <Button onClick={increaseNeutral}text="neutral"/>
      <Button onClick={increaseBad}text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = ({ onClick, text}) => 
    <button onClick={onClick}>
      {text}
    </button>

export default App