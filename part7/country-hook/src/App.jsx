import { useState } from 'react'
import './App.css'
import { useCountry, useField } from './hooks';

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h2>{country.data.name}</h2>
      <div>Capital: {country.data.capital}</div>
      <div>Population: {country.data.population}</div>
      <br />
      <img src={country.data.flag} height={'100'} alt={`flag of ${country.data.name}`} />
    </div>
  )
}

const App = () => {

  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        {" "}
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
