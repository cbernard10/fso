import { useState } from "react";
import patientService from "../../services/patients";
import { EntryWithoutId, Entry } from "../../types";
import { Select, MenuItem, FormControl, Input } from "@mui/material";
import { Diagnosis } from "../../types";
import { SelectChangeEvent } from "@mui/material";

interface Props {
  patientId: string;
  setNotification: React.Dispatch<
    React.SetStateAction<{ content: string; type: string }>
  >;
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  diagnosisList: Diagnosis[];
}

function NewEntryForm({
  patientId,
  setNotification,
  setEntries,
  diagnosisList,
}: Props) {
  console.log("diagnosisList", diagnosisList);
  const [show, setShow] = useState<boolean>(false);

  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  if (!show)
    return (
      <button onClick={() => setShow(true)}>Add new health check entry</button>
    );

  const formStyle = {
    border: "solid 1px",
    borderColor: "black",
    borderRadius: "4px",
    padding: "4px",
  };

  const inputStyle = {
    display: "flex",
    width: "80%",
  };

  const handleCodeSelection = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    console.log("e.target.value", event.target.value);
    setSelectedCodes(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEntry: EntryWithoutId = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      diagnosisCodes: selectedCodes,
      healthCheckRating,
    };

    patientService
      .addEntry(newEntry, patientId)
      .then((responseEntry) => {
        console.log("responseEntry", responseEntry);
        setEntries((entries: Entry[]): Entry[] =>
          entries.concat(responseEntry)
        );
        setNotification({ content: "Entry added", type: "success" });
        setTimeout(() => {
          setNotification({ content: "", type: "" });
        }, 1000);
        setShow(false);
      })
      .catch((e) => {
        // console.log("error", e);
        console.log("setting notification...", {
          message: e.message,
          type: "error",
        });
        setNotification({ content: e.message, type: "error" });
        setTimeout(() => {
          setNotification({ content: "", type: "" });
        }, 1000);
      });
  };

  return (
    <div>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label>New Healthcheck entry</label>
        <div>
          <label>Description</label>
          <input
            style={inputStyle}
            type="string"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Date</label>
          <Input
            style={inputStyle}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label>Specialist</label>
          <input
            style={inputStyle}
            type="string"
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </div>
        <label>Diagnosis codes</label>
        <FormControl sx={{ m: 0, width: "90%" }}>
          <Select multiple value={selectedCodes} onChange={handleCodeSelection}>
            {diagnosisList.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code} {diagnosis.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          <label>Health check rating</label>
          <input
            style={inputStyle}
            type="number"
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          />
        </div>

        <button type="submit">ADD</button>
        <button type="button" onClick={() => setShow(false)}>
          close
        </button>
      </form>
    </div>
  );
}

export default NewEntryForm;
