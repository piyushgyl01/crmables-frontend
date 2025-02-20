import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../lead/leadSlice";
import { getPipelineReport, selectPipelineReport } from "./reportSlice";
import { fetchSalesAgent } from "../salesAgent/agentSlice";
import useSalesAgent from "../../hooks/useSalesAgent";
import useLeads from "../../hooks/useLeads";
import LeadsByStatus from "./LeadsByStatus";
import LeadsClosedByAgents from "./LeadsClosedByAgents";
import LeadsClosedReport from "./LeadsClosedReport";

export default function Reports() {
  const dispatch = useDispatch();
  const leads = useLeads();
  const salesAgents = useSalesAgent();
  const pipelineReport = useSelector(selectPipelineReport);

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(getPipelineReport());
    dispatch(fetchSalesAgent());
  }, [dispatch]);

  return (
    <div className="container-fluid py-4">
      <h1 className="h3 mb-4">Reports Dashboard</h1>
      <div className="row">
        <LeadsByStatus leads={leads} />
        <LeadsClosedByAgents leads={leads} salesAgents={salesAgents} />
        <LeadsClosedReport leads={leads} pipelineReport={pipelineReport} />
      </div>
    </div>
  );
}
