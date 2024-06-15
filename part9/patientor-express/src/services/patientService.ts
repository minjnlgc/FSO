import patientData from "../../data/patients";
import { v1 as uuidv1 } from "uuid";

import { Patient, NonSensitivePatientEntry, NewPatientEntry } from "../types";
import { toNonSensitivePatient } from "../utils";

const patients: Patient[] = patientData;

const getAllPatients = (): NonSensitivePatientEntry[] => {
  console.log(patients);
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): NonSensitivePatientEntry => {
  const newPatient = {
    ...entry,
    id: uuidv1(),
  };

  patients.push(newPatient);

  const newNonSensitivePatient = toNonSensitivePatient(newPatient);
  return newNonSensitivePatient;
};

const getPatientById = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);

  if (typeof patient !== "object") {
    throw new Error(`Cannot find patient with id: ${id}`);
  }
  return patient;
};

export default {
  getAllPatients,
  addPatient,
  getPatientById,
};
