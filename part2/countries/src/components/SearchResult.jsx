import CountryBasicData from "./CountryBasicData";
import Country from "./Country";

const SearchResult = ({ countryData, searchCountry }) => {
  const filteredCountries = countryData.filter((c) =>
    c.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  );

  if (searchCountry !== "" && filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return filteredCountries.map((c) => (
      <Country key={c.name.common} country={c} />
    ));
  } else if (filteredCountries.length === 1) {
    return <CountryBasicData country={filteredCountries[0]} />;
  }
};

export default SearchResult;
