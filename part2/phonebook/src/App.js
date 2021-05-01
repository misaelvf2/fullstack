import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ personsToShow, setPersonsToShow ] = useState(persons)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const searchPerson = (event) => {
    event.preventDefault()
    if (search === '') {
      setPersonsToShow(persons)
    }
    else{
      setPersonsToShow(persons.filter(person =>
        person.name.toLowerCase() === search.toLowerCase()))
    }
    setSearch('')
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      const newPersons = persons.concat(personObject)
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
      setPersonsToShow(newPersons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={searchPerson}>
        <div>
          filter shown with <input value={search} onChange={handleSearchChange} />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person =>
          <div key={person.name}>{person.name} {person.number}</div>
        )}
      </div>
    </div>
  )
}

export default App
