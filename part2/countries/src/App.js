import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountry = ({country}) => (
  <>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <h2>languages:</h2>
    <ul>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      {/* {[country.languages].map(language => <li key={language.name.common}>{language.name.common}</li>)} */}
    </ul>
    <img src={country.flags.png} alt={country.name.common} width="200"/>
  </>
)

const Display = ({input, countries}) => {
  if (input.length === 0)
    return null
  let matchedCountries = countries.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase()))
  if (matchedCountries.length > 10)
    return <p>too many matches, specify another filter</p>
  if (matchedCountries.length === 1)
  {
    console.log(matchedCountries[0])
    return <DisplayCountry country={matchedCountries[0]}/>
  }
  return <ul>{matchedCountries.map(country => <li key={country.name.common}>{country.name.common}</li>)}</ul>
}

const App = () => {
  const [inputFind, setInputFind] = useState('')

  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleInputFindChange = (event) => {
    event.preventDefault()
    setInputFind(event.target.value)
  }

  return (
    <>
      <p>find countries <input onChange={handleInputFindChange} value={inputFind}/></p>
      <Display input={inputFind} countries={countries}/>
    </>
  )
}

export default App;
