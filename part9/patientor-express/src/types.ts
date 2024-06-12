export enum Gender {
  Female = "female",
  Other = "other",
  male = "male",
}

export interface Diagnosis {
  code: String;
  name: String;
  latin?: String;
}

export interface Patient {
  id: String;
  name: String;
  dateOfBirth: string;
  gender: Gender;
  occupation: String;
  ssn: String;
}

export type NonSensitivePatientEntry = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, "id">;
