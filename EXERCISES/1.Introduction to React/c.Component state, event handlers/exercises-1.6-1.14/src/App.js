import { useState } from "react";

const Feedback = () => {
  const [click, setClick] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const eventHandler = (event) => {
    if(event.target.childNodes[0].data === 'Good') {
      setClick({
        ...click,
        good: click.good + 1
      })
      
    }
    else if (event.target.childNodes[0].data === 'Neutral') {
      setClick({
        ...click,
        neutral: click.neutral + 1
      })
    }
    else {
      setClick({
        ...click,
        bad: click.bad + 1
      })
    }
  }
  let totalClicks = click.good + click.neutral + click.bad
  if (totalClicks) {
    return (
      <div>
        <h1>Give Feedback</h1>
        <button onClick={eventHandler}>Good</button>
        <button onClick={eventHandler}>Neutral</button>
        <button onClick={eventHandler}>Bad</button>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <tr>
              <td>Good: </td>
              <td>{click.good}</td>
            </tr>
            <tr>
              <td>Neutral: </td>
              <td>{click.neutral}</td>
            </tr>
            <tr>
              <td>Bad: </td>
              <td>{click.bad}</td>
            </tr>
            <tr>
              <td>All: </td>
              <td>{totalClicks}</td>
            </tr>
            <tr>
              <td>Positive: </td>
              <td> {(click.good / totalClicks) * 100 }</td>
            </tr>
          </tbody>
        </table>
      </div>
        
    ) 
  } else {
    return (
      <div>
        <h1>Give Feedback</h1>
        <button onClick={eventHandler}>Good</button>
        <button onClick={eventHandler}>Neutral</button>
        <button onClick={eventHandler}>Bad</button>
        <h2>Statistics</h2>
        <p>No Feedback given</p>
      </div>
    )
  }
}

const Anecdotes = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const nextAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0])
  const copy = [...votes]
  const vote = ( )=> {
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotesAnecdote = [anecdotes[0], votes[0]]
  for (let i in votes)
  {
   if(votes[i] > mostVotesAnecdote[1] ) {
     mostVotesAnecdote[1] = votes[i]
     mostVotesAnecdote[0] = anecdotes[i]
   }

  }




  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]}</p> 
      <button onClick={vote}>Vote</button>
      <button onClick={nextAnecdote}>Next Anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{mostVotesAnecdote[0]}</p>
      <p>Has {mostVotesAnecdote[1]}</p>
    </>
  )
}


const App = () => {
  return (
  <>
    <Feedback />
    <Anecdotes />
  </>

  )}

export default App;
