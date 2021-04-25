import React, { useState } from 'react'

const Anecdote = ({ text, votes=0 }) => {
  return (
    <div>
      <div>
        {text}
      </div>
      <div>
        has {votes} votes
      </div>
    </div>
  )
}

const App = (props) => {
  const next = () => {
    let randomNumber = Math.floor(Math.random() * props.anecdotes.length)
    while (randomNumber === selected) {
      randomNumber = Math.floor(Math.random() * props.anecdotes.length)
    }
    setSelected(randomNumber)
  }

  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1

    setVotes(newVotes)
    if (votes[selected] + 1 > votes[mostVotes]) {
      setMostVotes(selected)
    }
  }

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote text={props.anecdotes[selected]} votes={votes[selected]} />
      <button onClick={vote}>vote</button>
      <button onClick={next}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      <Anecdote text={props.anecdotes[mostVotes]} votes={votes[mostVotes]} />
    </div>
  )
}

export default App
