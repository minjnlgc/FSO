export interface Diagnosis {
  code: String;
  name: String;
  latin?: String;
}

export interface Patient {
  id: String;
  name: String;
  dateOfBirth: string;
  gender: String;
  occupation: String;
  ssn: String;
}

export type NonSensitivePatientEntry = Omit<Patient, "ssn">;
