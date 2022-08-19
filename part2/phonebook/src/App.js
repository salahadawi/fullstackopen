import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ filter, onChange }) => (
  <div>filter shown with <input onChange={onChange} value={filter}/></div>
)

const PersonForm = ({ addName, newName, newNumber, handleNameChange, handleNumberChange }) => (
  <form onSubmit={addName}>
    <div>name: <input onChange={handleNameChange} value={newName}/></div>
    <div>number: <input onChange={handleNumberChange} value={newNumber}/></div>
    <div><button type="submit">add</button></div>
  </form>
)

const Persons = ({ persons, filter}) => (
  <ul>
    {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => <li key={person.name}>{person.name} {person.number}</li>)}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }

    const newPerson = { name: newName, number: newNumber }

    personService.create(newPerson)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  useEffect(() => {
    console.log('effect')
    personService.getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App