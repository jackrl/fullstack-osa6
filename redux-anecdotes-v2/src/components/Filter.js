import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from './../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (e) => {
    e.preventDefault()
    this.props.setFilter(e.target.value)
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

export default connect(
  null,
  { setFilter }
)(Filter)
