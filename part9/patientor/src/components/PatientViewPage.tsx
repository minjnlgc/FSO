import { Typography } from "@mui/material";
import { Gender, Patient } from "../types";
import { useEffect, useState } from "react";

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
    console.log("use effect");
    const fetchPatientById = async () => {
      if (!patientId) return;
      const returnedPatient = await patientService.getById(patientId);
      setPatient(returnedPatient);
    };

    fetchPatientById();
  }, [patientId]);

  if (!patientId || !patient) {
    return null;
  }

  return (
    <div>
      <Typography variant="h6" style={{ marginTop: "0.5em" }}>
        {patient.name} {showGender(patient.gender)}
      </Typography>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientViewPage;
