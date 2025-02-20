import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import FormLabel from "@mui/material/FormLabel";
import { useSelector } from 'react-redux'; // Import useSelector

export default function SortByTimeToClose({ onChange }) {
  const timeRangeFilter = useSelector(state => state.leads.filters.timeRange); // Get timeRange from Redux

  return (
    <Box sx={{ width: 300 }}>
      <FormLabel>Sort by Time to Close (in days)</FormLabel>
      <Slider
        value={timeRangeFilter} // Use timeRangeFilter from Redux state
        onChange={(_, newValue) => onChange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={200} // Match max from leadSlice initial state
      />
    </Box>
  );
}