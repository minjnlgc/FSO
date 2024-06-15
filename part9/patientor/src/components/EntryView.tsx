import { Typography } from "@mui/material";
import { Diagnosis, Entry } from "../types";

import diagnosisService from "../services/diagnoses";
import { useEffect, useState } from "react";

interface Props {
  entries: Entry[];
}

const EntryView = ({ entries }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const returnedDiagnoses = await diagnosisService.getAll();
      setDiagnoses(returnedDiagnoses);
    };

    fetchDiagnoses();
  }, [entries]);

  return (
    <div>
      <Typography variant="h5" style={{ marginTop: "1em" }}>
        entires
      </Typography>
      <div style={{ marginTop: "1em" }}>
        {entries.map((entry) => (
          <div key={entry.id}>
            <Typography component="p">
              {entry.date} <i>{entry.description}</i>
            </Typography>
            <ul>
              {entry.diagnosisCodes
                ? entry.diagnosisCodes.map((code) => (
                    <Typography key={code} variant="body2">
                      <li>
                        {code}{" "}
                        {diagnoses.map((d) => {
                          if (d.code === code) {
                            return d.name;
                          }
                        })}
                      </li>
                    </Typography>
                  ))
                : null}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntryView;
