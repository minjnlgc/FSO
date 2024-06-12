import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getAllPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newNonSensitivePatient = patientService.addPatient(newPatientEntry);
    res.json(newNonSensitivePatient);
    
  } catch (error: unknown) {
    console.log("error");
  }
});

export default router;
