import React from 'react'

const Persons = ({ persons }) => {
  return (
    <div>
    {persons.map(person =>
      <Person key={person.name} name={person.name} number={person.number} />
    )}
  </div>
  )
}

const Person = ({ name, number }) => {
  return (
    <div>
      {name} {number}
    </div>
  )
}

export default Persons
