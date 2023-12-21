import { Patient, Diagnosis } from "../../types";
import { useState } from "react";
import Notification from "../Notification";
import Entries from "./Entries";

type Props = {
  patient: Patient;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  diagnosisList: Diagnosis[];
};

function PatientData({ patient, diagnosisList }: Props) {
  const [notification, setNotification] = useState<{
    content: string | null;
    type: string | null;
  }>({
    content: null,
    type: null,
  });

  const genders = {
    female: "♀",
    male: "♂",
    other: "⚧",
  };

  if (!patient) return <div>loading...</div>;
  return (
    <div>
      <div>
        <h2>
          {patient.name} {genders[patient.gender]}
        </h2>
      </div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <div>date of birth: {patient.dateOfBirth}</div>

      <Notification message={notification} />

      <h2>entries</h2>
      <Entries patient={patient} setNotification={setNotification} diagnosisList={diagnosisList} />
    </div>
  );
}

export default PatientData;
