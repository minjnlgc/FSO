import {
  Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
  Gender,
  Entry,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const isEntry = (entry: unknown): entry is Entry => {
  if (typeof entry !== "object" || !entry) {
    throw new Error("Incorrect entry: " + entry);
  }
  if (!("type" in entry)) {
    throw new Error("Incorrect entry: " + entry);
  }

  if (
    entry.type === "Hospital" ||
    entry.type === "HealthCheck" ||
    entry.type === "OccupationalHealthcare"
  ) {
    return true;
  }
  return false;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error("Invalid entries: not an array");
  }

  entries.forEach((entry) => {
    if (!isEntry(entry)) {
      throw new Error("Invalid entry: " + JSON.stringify(entry));
    }
  });

  return entries;
};

export const toNonSensitivePatient = (
  patient: Patient
): NonSensitivePatientEntry => {
  if (!patient || typeof patient !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const newPatient: NonSensitivePatientEntry = {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  };

  return newPatient;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "occupation" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "ssn" in object &&
    "entries" in object
  ) {
    const newPatient = {
      name: parseName(object.name),
      occupation: parseOccupation(object.occupation),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      ssn: parseSsn(object.ssn),
      entries: parseEntries(object.entries),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: a field missing");
};
