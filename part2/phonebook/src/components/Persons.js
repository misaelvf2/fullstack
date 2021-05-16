import React from 'react'

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
    {persons.map(person =>
      <Person key={person.name} name={person.name} number={person.number} id={person.id} handleDelete={handleDelete} />
    )}
  </div>
  )
}

const Person = ({ name, number, id, handleDelete}) => {
  return (
    <div>
      {name} {number} <button onClick={() => handleDelete(name, id)}>delete</button>
    </div>
  )
}

export default Persons
