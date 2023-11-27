import React from "react";
import Person from "./Person";

function Persons({ persons, filter, handleDelete, handleUpdatePhone }) {
  return (
    <div>
      {persons.map((person) => {
        return person.name.toLowerCase().includes(filter) ? (
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            id={person.id}
            handleDelete={handleDelete}
            handleUpdatePhone={handleUpdatePhone}
          />
        ) : (
          <></>
        );
      })}
    </div>
  );
}

export default Persons;
