import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ personsToShow, setPersonsToShow ] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
      })
  }, [])

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
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1))
  }

  const deletePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
          setPersonsToShow(persons.filter(n => n.id !== id))
        })
    } else {
      console.log('Cancelling')
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(n => n.name === newName)
    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {
          ...person,
          number: newNumber
        }
        personService
          .update(person.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setPersonsToShow(personsToShow.map(p => p.id !== person.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setPersonsToShow(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleSubmit={searchPerson} search={search} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm handleSubmit={addPerson} name={newName} number={newNumber}
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App
