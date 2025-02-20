import { useDispatch } from "react-redux";
import {
  setAgentFilter,
  setPriorityFilter,
  setPrioritySort,
  setStatusFilter,
  setTimeRange,
} from "../features/lead/leadSlice";

export default function useFilterHandlers() {
  const dispatch = useDispatch();

  const onStatusChange = (status) => {
    dispatch(setStatusFilter(status));
  };

  const onAgentChange = (agent) => {
    dispatch(setAgentFilter(agent));
  };

  const onPriorityChange = (agent) => {
    dispatch(setPriorityFilter(agent));
  };

  const onSortChange = (value) => {
    dispatch(setPrioritySort(value));
  };

  const onRangeChange = (value) => dispatch(setTimeRange(value));

  return {
    onStatusChange,
    onAgentChange,
    onPriorityChange,
    onSortChange,
    onRangeChange,
  };
}
