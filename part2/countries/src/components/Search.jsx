const Search = ({ searchCountry, handleSearchCountryChange }) => {
  return (
    <>
      <p>
        find countries{" "}
        <input value={searchCountry} onChange={handleSearchCountryChange} />
      </p>
      <div></div>
    </>
  );
};

export default Search;
