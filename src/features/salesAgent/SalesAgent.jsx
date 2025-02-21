import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useSalesAgent from "../../hooks/useSalesAgent";
import useAgentStatuses from "../../hooks/useAgentStatuses";
import { Link } from "react-router-dom";
import AgentTable from "./AgentTable";

export default function SalesAgent() {
  const salesAgent = useSalesAgent();
  const { fetchSalesAgentStatus } = useAgentStatuses();

  if (fetchSalesAgentStatus === "loading") {
    return (
      <div className="container-fluid py-5 text-center">
        <Loading />
      </div>
    );
  }

  if (fetchSalesAgentStatus === "error") {
    return (
      <div className="container-fluid py-5">
        <Error text="Error occurred while fetching sales agents" />
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h1 className="h3 mb-0">Sales Agents</h1>
        <div className="d-flex gap-3">
          <div className="card border-primary border-2">
            <div className="card-body p-2 px-3">
              <div className="text-primary">
                <div className="h4 mb-0">{salesAgent?.length || 0}</div>
                <div className="small">Total Agents</div>
              </div>
            </div>
          </div>
          <Link
            to="/add-new-sales-agent"
            className="btn btn-primary d-flex align-items-center px-3"
          >
            Add New Agent
          </Link>
        </div>
      </div>
      <AgentTable salesAgent={salesAgent} />
    </div>
  );
}
