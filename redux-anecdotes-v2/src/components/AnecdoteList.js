import React from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => () => {
    this.props.voteAnecdote(anecdote.id)

    this.props.setNotification(`You voted '${anecdote.content}'`)

    setTimeout(() => {
      this.props.setNotification('')
    }, 5000)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotesToShow.map(anecdote =>
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

const anecdotesToShow = (anecdotes, filter) => {
  if(filter === '') {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  return anecdotes.filter(anecdote => {
    return anecdote.content.toUpperCase().includes(filter.toUpperCase())
  }).sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  {
    voteAnecdote,
    setNotification
  }
)(AnecdoteList)

export default ConnectedAnecdoteList
