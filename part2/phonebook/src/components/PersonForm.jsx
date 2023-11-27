import React from "react";

function PersonForm({handleChange, handleNumberChange, handleSubmit}) {
  return (
    <form>
      <div>
        name: <input onChange={handleChange} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </div>
    </form>
  );
}

export default PersonForm;
