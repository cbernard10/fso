import { useState, useEffect } from "react";
import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import { useMatch } from "react-router-dom";
import PatientData from "./components/PatientDetails/PatientData";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();

    const fetchDiagnosisList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosisList();
  }, []);

  const match = useMatch("/patients/:id");
  const patient = match
    ? patients.find((p: Patient): boolean => p.id === match.params.id)
    : null;

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={
              <PatientData
                patient={patient as Patient}
                patients={patients}
                setPatients={setPatients}
                diagnosisList={diagnoses}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
