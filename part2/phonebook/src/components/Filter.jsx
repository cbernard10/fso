import React from "react";

function Filter({filter, setFilter}) {
  return (
    <div>
      <span>filter shown with </span>
      <input onChange={(event) => setFilter(event.target.value.toLowerCase())}></input>
    </div>
  );
}

export default Filter;
