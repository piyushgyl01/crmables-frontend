import Alert from "@mui/material/Alert";

export default function Error({text}) {
  return (
    <Alert variant="outlined" severity="error">
      {text}
    </Alert>
  );
}
