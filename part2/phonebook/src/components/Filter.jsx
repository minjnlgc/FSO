import Persons from "./Persons";

const Filter = ({ text, persons, searchName, handleSearchNameChange }) => {
    const filteredPersons = persons.filter((p) => {
      return (
        p.name.toLowerCase().includes(searchName.toLowerCase()) &&
        searchName !== ""
      );
    });
  
    return (
      <>
        <div>
          {text}
          <input value={searchName} onChange={handleSearchNameChange} />
        </div>
        <Persons persons={filteredPersons} />
      </>
    );
  };

export default Filter;