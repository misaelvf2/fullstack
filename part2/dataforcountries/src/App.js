import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountrySearch = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        find countries
        <input search={props.search} onChange={props.handleSearchChange} />
      </form>
    </div>
  )
}

const Country = (props) => {
  return (
    <div>
      <h2>{props.country.name}</h2>
      <div>capital {props.country.capital}</div>
      <div>population {props.country.population}</div>

      <h3>languages</h3>
      <ul>
        {props.country.languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={props.country.flag} height="100px" weight="100px" alt="Flag" />
    </div>
  )
}

const SearchResults = ({ countriesToShow }) => {
  if (countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
    return (
      <div>
        {countriesToShow.map(country =>
          <div key={country.name}>{country.name}</div>
        )}
      </div>
    )
  } else {
    return (
      <div>
        {countriesToShow.map(country =>
          <Country key={country.name} country={country} />
        )}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const searchCountry = (event) => {
    event.preventDefault()
    setCountriesToShow(countries.filter(country => country.name.toLowerCase().indexOf(search.toLocaleLowerCase()) !== -1))
  }

  return (
    <div>
      <CountrySearch handleSubmit={searchCountry} search={search} handleSearchChange={handleSearchChange} />
      <SearchResults countriesToShow={countriesToShow} />
    </div>
  )
}

export default App
