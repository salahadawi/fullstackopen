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
    </ul>
    <img src={country.flags.png} alt={country.name.common} width="200"/>
  </>
)

const Display = ({input, countries, countriesShow, setCountriesShow}) => {
  const onShow = (country) => {
    setCountriesShow(countriesShow.concat(country))
  }

  if (input.length === 0)
    return null
  let matchedCountries = countries.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase()))
  if (matchedCountries.length > 10)
    return <p>too many matches, specify another filter</p>
  if (matchedCountries.length === 1)
    return <DisplayCountry country={matchedCountries[0]}/>
  return <ul>{matchedCountries.map(country => {
    return countriesShow.includes(country.name.common) ? <DisplayCountry country={country} key={country.name.common}/> :
  <li key={country.name.common}>{country.name.common} <button onClick={() => onShow(country.name.common)}>show</button></li>
  }
  )}</ul>
}

const App = () => {
  const [inputFind, setInputFind] = useState('')

  const [countries, setCountries] = useState([])

  const [countriesShow, setCountriesShow] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleInputFindChange = (event) => {
    event.preventDefault()
    setInputFind(event.target.value)
    setCountriesShow([])
  }

  return (
    <>
      <p>find countries <input onChange={handleInputFindChange} value={inputFind}/></p>
      <Display input={inputFind} countries={countries} countriesShow={countriesShow} setCountriesShow={setCountriesShow}/>
    </>
  )
}

export default App;
