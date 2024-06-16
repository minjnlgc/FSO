import { useEffect, useState } from "react";
import { Typography, Button, Collapse } from "@mui/material";

import { Diagnosis, Entry } from "../../types";
import diagnosisService from "../../services/diagnoses";
import HospitalEntryView from "./HospitalEntryView";
import OccupationalEntryView from "./OccupationalEntryView";
import HealthCheckEntryView from "./HealthCheckEntryView";
import AddEntryForm from "../AddEntryForm";

interface Props {
  entries: Entry[];
}

const EntryView = ({ entries }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [close, setClose] = useState(false);

  const handleButtonClick = () => {
    setClose(!close);
  };

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const returnedDiagnoses = await diagnosisService.getAll();
      setDiagnoses(returnedDiagnoses);
    };

    fetchDiagnoses();
  }, [entries]);

  const assertNever = (value: never): never => {
    throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryView entry={entry} diagnoses={diagnoses} />;
      case "OccupationalHealthcare":
        return <OccupationalEntryView entry={entry} diagnoses={diagnoses} />;
      case "HealthCheck":
        return <HealthCheckEntryView entry={entry} diagnoses={diagnoses} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ marginTop: "1em" }}
        onClick={handleButtonClick}
      >
        Add New Entry
      </Button>
      <Collapse in={close} timeout="auto" unmountOnExit>
        <AddEntryForm />
      </Collapse>
      <Typography variant="h5" style={{ marginTop: "1em" }}>
        entires
      </Typography>
      <div style={{ marginTop: "1em" }}>
        {entries.map((entry) => (
          <div key={entry.id}>
            <EntryDetails entry={entry} />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntryView;
