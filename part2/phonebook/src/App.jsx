import { useState } from "react";
import "./App.css";

const Persons = ({ persons }) => {
  return persons.map((p) => {
    return (
      <p key={p.id}>
        {p.name} {p.number}
      </p>
    );
  });
};

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

const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personToAdd = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const isNameExist =
      persons.filter((p) => p.name == newName).length != 0 ? true : false;

    if (isNameExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersons = persons.concat(personToAdd);
      setPersons(newPersons);
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        text={"filter shown with"}
        persons={persons}
        searchName={searchName}
        handleSearchNameChange={handleSearchNameChange}
      />

      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
