import { useSelector, useDispatch } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === '')
      return state.anecdotes
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase()
    .includes(state.filter.toLowerCase()))
  })

  const handleVote = (id) => {
    dispatch(vote(id))
    dispatch(
      setNotificationWithTimeout(
        `you voted '${anecdotes.find(a => a.id === id).content}'`, 5000))
  }

  return (
    <>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList