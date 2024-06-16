import {
  Card,
  CardContent,
  Typography,
  TextField,
  Input,
  MenuItem,
  Button,
} from "@mui/material";
import { HealthCheckRating } from "../../types";

const HealthCheckEntryForm = () => {
  const handleSubmit = () => {
    console.log("submit!");
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom>
          <strong>New HealthCheck entry</strong>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            id="description"
            fullWidth
            label="Description"
            multiline
            maxRows={4}
          />

          <Input type="date" sx={{ mb: 1.5, mt: 2.5, ml: 1 }} />

          <TextField
            id="specialist"
            label="Specialist"
            fullWidth
            sx={{ mb: 2, mt: 2 }}
          />

          <TextField
            id="healthcheckrating"
            select
            label="Health check rating"
            defaultValue=""
            fullWidth
            sx={{ mb: 2, mt: 2 }}
          >
            {Object.keys(HealthCheckRating)
              .filter((key) => isNaN(Number(key))) // Filters out numeric keys
              .map((key) => {
                const value =
                  HealthCheckRating[key as keyof typeof HealthCheckRating];
                return (
                  <MenuItem key={value} value={value}>
                    {key}
                  </MenuItem>
                );
              })}
          </TextField>

          {/* diagnosis codes */}
          <TextField
            id="diagnosisCodes"
            label="Diagnosis Codes"
            fullWidth
            sx={{ mb: 2, mt: 2 }}
          />

          <Button variant="contained" color="error">
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HealthCheckEntryForm;
