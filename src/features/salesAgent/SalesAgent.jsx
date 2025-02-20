import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useSalesAgent from "../../hooks/useSalesAgent";
import useAgentStatuses from "../../hooks/useAgentStatuses";
import { Link } from "react-router-dom";

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
      {/* Header Section */}
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
            to="/add-sales-agent"
            className="btn btn-primary d-flex align-items-center px-3"
          >
            Add New Agent
          </Link>
        </div>
      </div>

      {/* Agents Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th className="ps-4">Name</th>
                  <th>Email</th>
                   <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salesAgent?.map((agent) => (
                  <tr key={agent._id}>
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
                          style={{
                            width: "40px",
                            height: "40px",
                            fontSize: "16px",
                          }}
                        >
                          {agent.name.charAt(0)}
                        </div>
                        <span className="fw-medium">{agent.name}</span>
                      </div>
                    </td>
                    <td className="align-middle">{agent.email}</td>
                     
                    <td className="text-end pe-4 align-middle">
                      <div className="btn-group">
                        <Link
                          to={`/sales-agent-details/${agent._id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          View Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {(!salesAgent || salesAgent.length === 0) && (
        <div className="text-center py-5">
          <i className="bi bi-people display-1 text-muted mb-3 d-block"></i>
          <h5 className="text-muted">No Sales Agents Found</h5>
          <p className="text-muted mb-3">
            Start by adding your first sales agent
          </p>
          <Link to="/add-sales-agent" className="btn btn-primary">
            Add Sales Agent
          </Link>
        </div>
      )}
    </div>
  );
}
