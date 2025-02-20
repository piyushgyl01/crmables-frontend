import { Link } from "react-router-dom";
import SelectFilter from "../../components/Filter";
import SortByTimeToClose from "../../components/SortByTimeToClose";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useFilterHandlers from "../../hooks/useFilterHandlers";
import useSelectOptions from "../../hooks/useSelectOptions";
import useLeadStatuses from "../../hooks/useLeadStatuses";
import useAgent from "./hooks/useAgent";

export default function SalesAgentView() {
  const { fetchLeadStatus } = useLeadStatuses();
  const { currentAgent, agentLeads, activeLeads } = useAgent();
  const { statusOptions, priorityOptions } = useSelectOptions();
  const { onStatusChange, onPriorityChange, onRangeChange } =
    useFilterHandlers();

  if (fetchLeadStatus === "loading") {
    return (
      <div className="container-fluid py-5 text-center">
        <Loading />
      </div>
    );
  }

  if (fetchLeadStatus === "error" || !currentAgent) {
    return (
      <div className="container-fluid py-5">
        <Error message="Could not load agent data" />
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h1 className="h3 mb-0">Agent Dashboard</h1>
        <div className="d-flex gap-3">
          <div className="card border-primary border-2">
            <div className="card-body p-2 px-3">
              <div className="text-primary">
                <div className="h4 mb-0">{agentLeads.length}</div>
                <div className="small">Total Leads</div>
              </div>
            </div>
          </div>
          <div className="card border-success border-2">
            <div className="card-body p-2 px-3">
              <div className="text-success">
                <div className="h4 mb-0">{activeLeads.length}</div>
                <div className="small">Active Leads</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Info Card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
              style={{ width: "60px", height: "60px", fontSize: "24px" }}
            >
              {currentAgent.name.charAt(0)}
            </div>
            <div>
              <h2 className="h4 mb-1">{currentAgent.name}</h2>
              <p className="text-muted mb-0">{currentAgent.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <SelectFilter
                label="Status Filter"
                options={statusOptions}
                onFilterChange={onStatusChange}
              />
            </div>
            <div className="col-md-4">
              <SelectFilter
                label="Priority Filter"
                options={priorityOptions}
                onFilterChange={onPriorityChange}
              />
            </div>
            <div className="col-md-4">
              <SortByTimeToClose onChange={onRangeChange} />
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th className="ps-4">Lead Name</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Time to Close</th>
                  <th className="text-end pe-4">Details</th>
                </tr>
              </thead>
              <tbody>
                {agentLeads.map((lead) => (
                  <tr key={lead._id}>
                    <td className="ps-4 py-3">
                      <span className="fw-medium">{lead.name}</span>
                    </td>
                    <td>
                      <span
                        className={`badge bg-${
                          lead.status === "New"
                            ? "primary"
                            : lead.status === "Qualified"
                              ? "success"
                              : lead.status === "Closed"
                                ? "secondary"
                                : "warning"
                        }-subtle text-${
                          lead.status === "New"
                            ? "primary"
                            : lead.status === "Qualified"
                              ? "success"
                              : lead.status === "Closed"
                                ? "secondary"
                                : "warning"
                        } px-3 py-2`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge bg-${
                          lead.priority === "High"
                            ? "danger"
                            : lead.priority === "Medium"
                              ? "warning"
                              : "info"
                        }-subtle text-${
                          lead.priority === "High"
                            ? "danger"
                            : lead.priority === "Medium"
                              ? "warning"
                              : "info"
                        } px-3 py-2`}
                      >
                        {lead.priority}
                      </span>
                    </td>
                    <td>{lead.timeToClose} days</td>
                    <td className="text-end pe-4">
                      <Link
                        to={`/lead-list/${lead.name}/${lead._id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {agentLeads.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-inbox display-1 text-muted mb-3"></i>
          <h5 className="text-muted">No leads found</h5>
          <p className="text-muted mb-0">
            This agent currently has no assigned leads
          </p>
        </div>
      )}
    </div>
  );
}
