import { useParams } from "react-router-dom";
import useSalesAgent from "../../../hooks/useSalesAgent";
import useFilteredLeads from "../../../hooks/useFilteredLeads";

export default function useAgent() {
  const { salesAgentID } = useParams();
  const agents = useSalesAgent();

  const currentAgent = agents.find((agent) => agent._id === salesAgentID);
  const { filteredLeads } = useFilteredLeads();
  const agentLeads = filteredLeads.filter(
    (lead) => lead.salesAgent?._id === currentAgent?._id
  );
  const activeLeads = agentLeads.filter((lead) => lead.status !== "Closed");

  return { currentAgent, agentLeads, activeLeads };
}
