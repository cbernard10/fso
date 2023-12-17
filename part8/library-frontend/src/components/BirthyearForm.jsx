import React from "react";
import { useState } from "react";

import { SET_BIRTHYEAR, ALL_AUTHORS } from "../queries";
import { useMutation, useQuery } from "@apollo/client";

import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function BirthyearForm() {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const [selectedOption, setSelectedOption] = useState(null);

  const allAuthors = useQuery(ALL_AUTHORS);
  const options = allAuthors.data.allAuthors.map((a) => ({
    value: a.name,
    label: a.name,
  }));

  const [changeBirthYear, result] = useMutation(
    SET_BIRTHYEAR,

    { refetchQueries: [{ query: ALL_AUTHORS }] }
  );

  function submit(event) {
    event.preventDefault();

    console.log(typeof year);
    changeBirthYear({
      variables: { name: selectedOption.value, setBornTo: year },
    });

    setName("");
    setYear("");
  }

  const handleSelect = (e) => {
    setName(e.value);
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        {/* <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
        <Select
          defaultValue={allAuthors[0]}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          year
          <input
            value={year}
            onChange={({ target }) => setYear(target.value / 1)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
}

export default BirthyearForm;
