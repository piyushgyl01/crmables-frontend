import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { selectFilters } from "../features/lead/leadSlice";
import { useSelector } from "react-redux";

export default function SortByPriority({ onSort }) {
  const { prioritySort } = useSelector(selectFilters);

  const handleChange = (event) => {
    onSort(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="priority-sort-label">Sort by Priority</FormLabel>
      <RadioGroup
        row
        value={prioritySort || ""}
        onChange={handleChange}
        aria-labelledby="priority-sort-label"
      >
        <FormControlLabel
          value="lowToHigh"
          control={<Radio />}
          label="Low to High"
        />
        <FormControlLabel
          value="highToLow"
          control={<Radio />}
          label="High to Low"
        />
      </RadioGroup>
    </FormControl>
  );
}
