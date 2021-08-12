import React, { useState } from 'react'

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
      <h1>statistics</h1>
      <Display text="good" value={good}/>
      <Display text="neutral" value={neutral}/>
      <Display text="bad" value={bad}/>
    </div>
  )
}

const Display = ({ text, value }) => <div>{text} {value}</div>

const Button = ({ onClick, text}) => 
    <button onClick={onClick}>
      {text}
    </button>

export default App