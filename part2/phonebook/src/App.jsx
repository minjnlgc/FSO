import { useState, useEffect } from "react";
import "./App.css";

import personService from "./services/persons";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [operationMessage, setMessage] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`) === true) {
      personService
        .remove(id)
        .then((deletedPerson) => {
          console.log(`Successfully deleted ${deletedPerson}`);
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((e) => {
          console.log(`ERROR: ${e.message}`);
        });
    } else {
      console.log("Okie!");
    }
  };

  const addPerson = (event) => {
    event.preventDefault();

    const personToAdd = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      if (existingPerson.number !== newNumber) {
        if (
          window.confirm(
            `${newName}? is already added to phonebook, replace the old number with a new one?`
          ) === true
        ) {
          personService
            .update(existingPerson.id, personToAdd)
            .then((returnedPerson) => {
              setPersons(
                persons.map((p) =>
                  p.id !== existingPerson.id ? p : returnedPerson
                )
              );
              setNewName("");
              setNewNumber("");

              setMessage(`Updated ${returnedPerson.name}'s number`);
              setTimeout(() => {
                setMessage(null);
              }, 3000);
            })
            .catch((e) => {
              
              console.log("Error updating person:", e);

              setMessage(`Information of ${newName} has already been removed from the server`);
              setTimeout(() => {
                setMessage(null);
              }, 3000);

            });
        }
      }
    } else {
      personService
        .create(personToAdd)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");

          setMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((error) => {
          console.log(error.response.data.error);

          setMessage(`Added ${error.response.data.error}`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={operationMessage} />
      <Filter
        text={"filter shown with"}
        persons={persons}
        searchName={searchName}
        handleSearchNameChange={handleSearchNameChange}
        handleDelete={handleDelete}
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
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
