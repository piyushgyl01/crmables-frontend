import { useSelector } from "react-redux";
import { selectSalesAgentStatuses } from "../features/salesAgent/agentSlice";

export default function useAgentStatuses() {
  const { fetchSalesAgentStatus, postSalesAgentStatus } = useSelector(
    selectSalesAgentStatuses
  );

  return { fetchSalesAgentStatus, postSalesAgentStatus };
}
