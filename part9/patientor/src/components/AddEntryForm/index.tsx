import { Card, CardContent, Input, TextField, Typography } from "@mui/material";
import diagnoses from "../../services/diagnoses";

const AddEntryForm = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom>
          <strong>New HealthCheck entry</strong>
        </Typography>
        {/* description */}
        <TextField
          id="description"
          fullWidth
          label="description"
          multiline
          maxRows={4}
        />

        {/* date */}
        <Input type="date" />

        {/* specialist */}
        <TextField
            id="specialist"
            label="specialist"
            fullWidth
        />

        {/* healthcheckrating */}
        {/* diagnosis codes */}
      </CardContent>
    </Card>
  );
};

export default AddEntryForm;
