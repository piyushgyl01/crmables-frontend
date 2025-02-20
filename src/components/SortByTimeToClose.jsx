import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import FormLabel from "@mui/material/FormLabel";
import { useSelector } from "react-redux";

export default function SortByTimeToClose({ onChange }) {
  const timeRangeFilter = useSelector((state) => state.leads.filters.timeRange);

  return (
    <Box sx={{ width: 300 }}>
      <FormLabel>Sort by Time to Close (in days)</FormLabel>
      <Slider
        value={timeRangeFilter}
        onChange={(_, newValue) => onChange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={200}
      />
    </Box>
  );
}
