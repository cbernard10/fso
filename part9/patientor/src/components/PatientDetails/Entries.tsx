import { Patient, Entry, Diagnosis } from "../../types";
import NewHealthCheckForm from "./NewHealthCheckForm";
import NewOccuppationalHealthcareForm from "./NewOccupationalHealthcareForm";
import NewHospitalForm from "./NewHospitalForm";
import HealthCheckEntryData from "./HealthCheckEntryData";
import HospitalEntryData from "./HospitalEntryData";
import OccupationalHealthcareEntryData from "./OccupationalHealthcareEntryData";
import { useState } from "react";

type Props = {
  patient: Patient;
  setNotification: React.Dispatch<
    React.SetStateAction<{ content: string | null; type: string | null }>
  >;
  diagnosisList: Diagnosis[];
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryData entry={entry} />;
    case "Hospital":
      return <HospitalEntryData entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryData entry={entry} />;
    default:
      return <div>Unknown entry type</div>;
  }
};

function Entries({ patient, setNotification, diagnosisList }: Props) {
  const [entries, setEntries] = useState<Entry[]>(patient.entries);
  if (!patient) return <div>loading...</div>;

  return (
    <div>
      <NewHealthCheckForm
        patientId={patient.id}
        setNotification={setNotification}
        setEntries={setEntries}
        diagnosisList={diagnosisList}
      />
      <NewOccuppationalHealthcareForm
        patientId={patient.id}
        setNotification={setNotification}
        setEntries={setEntries}
        diagnosisList={diagnosisList}
      />
      <NewHospitalForm
        patientId={patient.id}
        setNotification={setNotification}
        setEntries={setEntries}
        diagnosisList={diagnosisList}
      />
      <div style={{ gap: "8px", display: "flex", flexDirection: "column" }}>
        {entries.map((entry: Entry) => (
          <div key={entry.id}>
            <EntryDetails entry={entry} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Entries;
