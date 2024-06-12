import patientData from "../../data/patients";

import { Patient, NonSensitivePatientEntry } from "../types";

const patients: Patient[] = patientData;

const getAllPatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};


export default {
    getAllPatients
}