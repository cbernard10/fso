import express from "express";

import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";
import { Entry, EntryWithoutId } from "../types";
import { v1 as uuid } from "uuid";
import { toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(patientService.getEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientService
    .getEntries()
    .find((p) => p.id === req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  const newPatientEntry = toNewPatientEntry(req.body);
  const newPatient = patientService.addPatient(newPatientEntry);
  res.json(newPatient);
});

router.post("/:id/entries", (req, res) => {
  const patient = patientService
    .getEntries()
    .find((p) => p.id === req.params.id);
  if (patient) {
    try {
      const newEntry: EntryWithoutId = toNewEntry(req.body);
      const newEntryWithId: Entry = { ...newEntry, id: uuid() };
      patient.entries.push(newEntryWithId);
      res.json(newEntryWithId);
    } catch (e) {
      const error = e as Error;
      res.status(400).send(error.message);
    }
  } else {
    res.sendStatus(404);
  }
});

export default router;
