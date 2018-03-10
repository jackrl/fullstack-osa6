import React from 'react'
import Filter from './Filter'
import { setNotification } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => () => {
    this.props.store.dispatch({ type: 'VOTE', id: anecdote.id })

    this.props.store.dispatch(
      setNotification(`You voted '${anecdote.content}'`)
    )

    setTimeout(() => {
      this.props.store.dispatch(
        setNotification('')
      )
    }, 5000)
  }

  render() {
    const anecdotesToShow = () => {
      const { filter, anecdotes } = this.props.store.getState()
      if(filter === '') {
        return anecdotes
      }

      return anecdotes.filter(anecdote => {
        return anecdote.content.toUpperCase().includes(filter.toUpperCase())
      })
    }

    const anecdotes = anecdotesToShow()

    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleVote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
