import React from "react";

function Person({ name, number, id, handleDelete, handleUpdatePhone }) {
  const handleDeletePerson = () => {
    if (window.confirm(`Delete ${name} ?`)) {
      handleDelete(id);
    }
  };

  return (
    <p>
      {name} {number}
      <button onClick={() => handleDeletePerson(id)}>delete</button>
    </p>
  );
}

export default Person;
