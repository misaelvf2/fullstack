import React from 'react'

const Filter = (props) => {
  return (
  <form onSubmit={props.handleSubmit}>
    <div>
      filter shown with <input value={props.search} onChange={props.handleSearchChange} />
    </div>
  </form>
  )
}

export default Filter
