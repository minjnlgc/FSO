import Persons from "./Persons";

const Filter = ({ text, persons, searchName, handleSearchNameChange, handleDelete }) => {
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
        <Persons persons={filteredPersons} handleDelete={handleDelete} />
      </>
    );
  };

export default Filter;