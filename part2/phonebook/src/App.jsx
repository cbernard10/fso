import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import axios from "axios";
import phonebookService from "./services/phonebook";

const Notification = ({ message }) => {
  return message.message === null ? (
    <></>
  ) : (
    <div className={message.type}>{message.message}</div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ type: "success", message: null });

  const baseUrl = "http://localhost:3001/persons";

  useEffect(() => {
    axios.get(baseUrl).then((res) => setPersons(res.data));
  }, []);

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDelete = (id) => {
    phonebookService
      .del(id)
      .then(setPersons(persons.filter((person) => person.id !== id)));
  };

  const handleUpdatePhone = (id, number) => {
    phonebookService
      .updateNumber(id, { name: newName, number: number })
      .catch((err) => {
        setMessage({ type: "error", message: `${newName} added` });
        setTimeout(() => {
          setMessage({...message, message: null});
        }, 5000);
      })
      .then((res) => {
        phonebookService.getAll().then((res) => setPersons(res));
      })
      .then((_) => {
        setMessage({ type: "success", message: `Number updated` });
        setTimeout(() => {
          setMessage({...message, message: null});
        }, 5000);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    phonebookService.getAll().then((res) => {
      const persons = res;
      const person = persons.find((p) => p.name === newName); // is the person already in the database?

      if (person) {
        // if so, update number
        if (window.confirm("update number?")) {
          handleUpdatePhone(person.id, newNumber);
        } else {
          alert("cannot add new person: already present in database");
          throw new Error("number already in db");
        }
      } else {
        // otherwise add the number
        phonebookService
          .create({ name: newName, number: newNumber })
          .then((res) => {
            setPersons([...persons, res]);
          })
          .then((_) => {
            setMessage({ type: "success", message: `${newName} added` });
            setTimeout(() => {
              setMessage({...message, message: null});
            }, 5000);
          });
      }
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter {...{ filter, setFilter }} />
      <h2>Add new</h2>
      <PersonForm {...{ handleChange, handleNumberChange, handleSubmit }} />
      <h2>Numbers</h2>
      <Persons {...{ persons, filter, handleDelete }} />
    </div>
  );
};

export default App;
