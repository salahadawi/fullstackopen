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

const Person = ({ person, deletePerson}) => (
  <li>{person.name} {person.number} <button onClick={deletePerson}>delete</button></li>
)

const Persons = ({ persons, filter, deletePerson}) => (
  <ul>
    {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)}/>)}
  </ul>
)

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          }).catch(error => {
            alert(`${error.response.data.error}`)
          }).then(() => {
            setNewName('')
            setNewNumber('')
          }
          )
      }

    } else {

      const newPerson = { name: newName, number: newNumber }

      personService.create(newPerson)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
    setMessage(
      `Added ${newName}`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        }).catch(error => {
          alert(`Information of ${person.name} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== id))
        }
        )
    }
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
      <Notification message={message} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App