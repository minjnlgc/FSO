import { useState, useEffect } from "react";
import "./App.css";

import countryService from "./services/country";
import Search from "./components/Search";
import SearchResult from "./components/SearchResult";

const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    countryService
      .getAll()
      .then((initialCountries) => {
        console.log(initialCountries.length);
        setCountryData(initialCountries);
      })
      .catch((error) => console.log("error getting all countries"));
  }, []);

  const handleSearchCountryChange = (event) => {
    console.log(event.target.value);
    setSearchCountry(event.target.value);
  };

  return (
    <>
      <Search
        searchCountry={searchCountry}
        handleSearchCountryChange={handleSearchCountryChange}
      />
      <SearchResult countryData={countryData} searchCountry={searchCountry} />
    </>
  );
};

export default App;
