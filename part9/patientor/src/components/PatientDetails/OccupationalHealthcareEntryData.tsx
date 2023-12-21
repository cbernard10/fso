import { Entry } from "../../types";
import DiagnosisData from "../DiagnosisData";

type Props = {
  entry: Entry;
};

function OccupationalHealthcareEntryData({ entry }: Props) {
  return (
    <div style={{ border: "solid 2px", borderColor: "black", padding: "4px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <p>{entry.date}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H216Z"></path>
        </svg>
        <p>{entry.employerName}</p>
      </div>

      {entry.diagnosisCodes && <h3>Health check</h3>}
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <DiagnosisData key={code} code={code} />
        ))}
      </ul>
      <p>{entry.description}</p>
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
}

export default OccupationalHealthcareEntryData;
