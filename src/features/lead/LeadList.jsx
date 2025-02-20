import { Link } from "react-router-dom";
import SelectFilter from "../../components/Filter";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useLeadStatuses from "../../hooks/useLeadStatuses";
import useFilteredLeads from "../../hooks/useFilteredLeads";
import useSelectOptions from "../../hooks/useSelectOptions";
import useFilterHandlers from "../../hooks/useFilterHandlers";

export default function LeadList() {
  const { filteredLeads } = useFilteredLeads();
  const { fetchLeadStatus } = useLeadStatuses();
  const { onStatusChange, onAgentChange, onPriorityChange } =
    useFilterHandlers();
  const { statusOptions, priorityOptions, agentOptions } = useSelectOptions();

  if (fetchLeadStatus === "loading") {
    return (
      <div className="container-fluid py-5 text-center">
        <Loading />
      </div>
    );
  }

  if (fetchLeadStatus === "error") {
    return (
      <div className="container-fluid py-5">
        <Error text="Error occurred while fetching data" />
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h1 className="h3 mb-0">Lead Management</h1>
        <div className="d-flex gap-3">
          <div className="card border-primary border-2">
            <div className="card-body p-2 px-3">
              <div className="text-primary">
                <div className="h4 mb-0">{filteredLeads.length}</div>
                <div className="small">Total Leads</div>
              </div>
            </div>
          </div>
          <Link
            to="/add-lead"
            className="btn btn-primary d-flex align-items-center px-3"
          >
            Add New Lead
          </Link>
        </div>
      </div>

      {/* Filters Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <SelectFilter
                label="Filter by Status"
                options={statusOptions}
                onFilterChange={onStatusChange}
              />
            </div>
            <div className="col-md-4">
              <SelectFilter
                label="Filter by Agent"
                options={agentOptions}
                onFilterChange={onAgentChange}
              />
            </div>
            <div className="col-md-4">
              <SelectFilter
                label="Filter by Priority"
                options={priorityOptions}
                onFilterChange={onPriorityChange}
              />
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
                  <th className="ps-4">Name</th>
                  <th>Source</th>
                  <th>Sales Agent</th>
                  <th>Status</th>
                  <th>Time to Close</th>
                  <th>Priority</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead._id}>
                    <td className="ps-4 py-3">
                      <span className="fw-medium">{lead.name}</span>
                    </td>
                    <td>{lead.source}</td>
                    <td>{lead.salesAgent.name}</td>
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
                    <td>{lead.timeToClose} days</td>
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

      {filteredLeads.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-inbox display-1 text-muted mb-3 d-block"></i>
          <h5 className="text-muted">No leads found</h5>
          <p className="text-muted mb-0">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
