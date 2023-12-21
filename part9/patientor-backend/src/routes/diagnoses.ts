import express from "express";

import diagnosisService from "../services/diagnosisService";

// import { toNewDiagnosisEntry } from "../../utils";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(diagnosisService.getEntries());
});

router.get("/:code", (req, res) => {
  const diagnosis = diagnosisService
    .getEntries()
    .find((d) => d.code === req.params.code);
  if (diagnosis) {
    res.send(diagnosis);
  } else {
    res.sendStatus(404);
  }
});

// router.post("/", (req, res) => {
//   const newDiagnosisEntry = toNewDiagnosisEntry(req.body);
//   const newDiagnosis = diagnosisService.addDiagnosis(newDiagnosisEntry);
//   res.json(newDiagnosis);
// });

export default router;
