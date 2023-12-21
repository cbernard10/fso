import { Entry } from "../../types";

import HealthCheckIcon from "./HealthCheckIcon";
import DiagnosisData from "../DiagnosisData";

type Props = {
  entry: Entry;
};

function HealthCheckEntryData({ entry }: Props) {
  console.log(entry.diagnosisCodes);

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
          <path d="M216,64H176V56a24,24,0,0,0-24-24H104A24,24,0,0,0,80,56v8H40A16,16,0,0,0,24,80V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM96,56a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,208H40V80H216V208Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V152H104a8,8,0,0,1,0-16h16V120a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,144Z"></path>
        </svg>
      </div>

      {entry.diagnosisCodes && <h3>Health check</h3>}
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <DiagnosisData key={code} code={code} />
        ))}
      </ul>

      <p>{entry.description}</p>
      <HealthCheckIcon rating={entry.healthCheckRating} />
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
}

export default HealthCheckEntryData;
