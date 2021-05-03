import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountrySearch = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        find countries
        <input value={props.searchTerms} onChange={props.handleSearchChange} />
      </form>
    </div>
  )
}

const Country = (props) => {
  const [weather, setWeather] = useState('')

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${props.country.capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [props.country])

  if (weather) {
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

        <h3>Weather in {props.country.capital}</h3>
        <b>temperature: </b>{weather.temperature} Celsius
        <div><img src={weather.weather_icons} alt={weather.weather_descriptions}/></div>
        <div><b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}</div>
      </div>
    )
  } else {
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

        <h3>Weather in {props.country.capital}</h3>
        <b>temperature: </b> Celsius
      </div>
    )
  }
}

const SearchResults = ({ searchResults }) => {
  const [countryToShow, setCountryToShow] = useState('')

  if (searchResults.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (searchResults.length > 1 && searchResults.length <= 10) {
    if (countryToShow) {
      return (
        <div>
        {searchResults.map(country =>
          <div key={country.name}>
            {country.name}
            <button onClick={() => setCountryToShow(country)}>show</button>
          </div>
        )}
        <Country country={countryToShow} />
      </div>
      )
    } else {
      return (
        <div>
        {searchResults.map(country =>
          <div key={country.name}>
            {country.name}
            <button onClick={() => setCountryToShow(country)}>show</button>
          </div>
        )}
      </div>
      )
    }
  } else {
    return (
      <div>
        {searchResults.map(country =>
          <Country key={country.name} country={country} />
        )}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerms, setSearchTerms] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerms(event.target.value)
  }

  const searchCountry = (event) => {
    event.preventDefault()
    setSearchResults(countries.filter(country => country.name.toLowerCase().indexOf(searchTerms.toLocaleLowerCase()) !== -1))
  }

  return (
    <div>
      <CountrySearch handleSubmit={searchCountry} searchTerms={searchTerms} handleSearchChange={handleSearchChange} />
      <SearchResults searchResults={searchResults} />
    </div>
  )
}

export default App
