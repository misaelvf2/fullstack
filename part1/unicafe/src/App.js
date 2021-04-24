import React, { useState } from 'react'

const Statistic = ({ text, value }) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / all
  const positive = `${(props.good / all) * 100}%`

  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <Statistic text="good" value={props.good} />
          </tr>
          <tr>
            <Statistic text="neutral" value={props.neutral} />
          </tr>
          <tr>
            <Statistic text="bad" value={props.bad} />
          </tr>
          <tr>
            <Statistic text="all" value={all} />
          </tr>
          <tr>
            <Statistic text="average" value={average} />
          </tr>
          <tr>
            <Statistic text="positive" value={positive} />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App