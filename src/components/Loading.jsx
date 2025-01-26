import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

export default function Loading() {
  return (
    <>
      <Stack spacing={2} direction="row" alignItems="center">
        <CircularProgress size="3rem" />
      </Stack>
    </>
  );
}
