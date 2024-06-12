import patientData from "../../data/patients";
import { v1 as uuidv1 } from 'uuid';

import { Patient, NonSensitivePatientEntry, NewPatientEntry } from "../types";
import { toNonSensitivePatient } from "../utils";

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

const addPatient = (entry: NewPatientEntry ): NonSensitivePatientEntry => {
    const newPatient = {
        ...entry,
        id: uuidv1()
    }

    //patients.push(newPatientEntry);

    const newNonSensitivePatient = toNonSensitivePatient(newPatient);
    return newNonSensitivePatient;
}


export default {
    getAllPatients,
    addPatient
}