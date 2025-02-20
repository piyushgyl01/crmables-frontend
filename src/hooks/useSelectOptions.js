import useSalesAgent from "./useSalesAgent";

export default function useSelectOptions() {
  const salesAgent = useSalesAgent();
  const sources = [
    "Website",
    "Referral",
    "Cold Call",
    "Advertisement",
    "Email",
    "Other",
  ];

  const statusOptions = ["New", "Contacted", "Qualified", "Closed"];
  const priorityOptions = ["Low", "Medium", "High"];
  const agentOptions = salesAgent ? salesAgent.map((agent) => agent.name) : [];

  return { statusOptions, priorityOptions, agentOptions, sources };
}
