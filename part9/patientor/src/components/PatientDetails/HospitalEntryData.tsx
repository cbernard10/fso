import { Entry } from "../../types";
import DiagnosisData from "../DiagnosisData";

type Props = {
  entry: Entry;
};
function HospitalEntryData({ entry }: Props) {
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
          <path d="M212,152a12,12,0,1,1-12-12A12,12,0,0,1,212,152Zm-4.55,39.29A48.08,48.08,0,0,1,160,232H136a48.05,48.05,0,0,1-48-48V143.49A64,64,0,0,1,32,80V40A16,16,0,0,1,48,24H64a8,8,0,0,1,0,16H48V80a48,48,0,0,0,48.64,48c26.11-.34,47.36-22.25,47.36-48.83V40H128a8,8,0,0,1,0-16h16a16,16,0,0,1,16,16V79.17c0,32.84-24.53,60.29-56,64.31V184a32,32,0,0,0,32,32h24a32.06,32.06,0,0,0,31.22-25,40,40,0,1,1,16.23.27ZM224,152a24,24,0,1,0-24,24A24,24,0,0,0,224,152Z"></path>
        </svg>
      </div>

      
      {entry.diagnosisCodes && <h3>Health check</h3>}
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <DiagnosisData key={code} code={code} />
        ))}
      </ul>
      <p>{entry.description}</p>
      <p>Diagnosed by {entry.specialist}</p>
      <p>
        Discharged {entry.discharge.date}. {entry.discharge.criteria}
      </p>
    </div>
  );
}

export default HospitalEntryData;
