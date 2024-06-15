import { Typography } from "@mui/material";
import { Gender, Patient } from "../types";
import { useEffect, useState } from "react";

import EntryView from "./EntryView";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import patientService from "../services/patients";

interface Props {
  patientId: string | null;
}

const showGender = (gender: Gender) => {
  switch (gender) {
    case Gender.Female:
      return <FemaleIcon />;
    case Gender.Male:
      return <MaleIcon />;
    case Gender.Other:
      return <TransgenderIcon />;
    default:
      return null;
  }
};

const PatientViewPage = ({ patientId }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatientById = async () => {
      if (!patientId) return;
      const returnedPatient = await patientService.getById(patientId);
      console.log(returnedPatient);

      setPatient(returnedPatient);
    };

    fetchPatientById();
  }, [patientId]);

  if (!patientId || !patient) {
    return null;
  }

  return (
    <div>
      <Typography variant="h4" style={{ marginTop: "1em" }}>
        {patient.name} {showGender(patient.gender)}
      </Typography>
      <Typography variant="body1" style={{ marginTop: "0.5em" }}>
        ssh: {patient.ssn}
      </Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
      
      <EntryView entries={patient.entries} />
    </div>
  );
};

export default PatientViewPage;
