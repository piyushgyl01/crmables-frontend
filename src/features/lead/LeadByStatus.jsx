import SelectFilter from "../../components/Filter";
import SortByPriority from "../../components/SortByPriority";
import SortByTimeToClose from "../../components/SortByTimeToClose";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useFilteredLeads from "../../hooks/useFilteredLeads";
import useLeadStatuses from "../../hooks/useLeadStatuses";
import useSelectOptions from "../../hooks/useSelectOptions";
import useFilterHandlers from "../../hooks/useFilterHandlers";

export default function LeadByStatus() {
  const { filteredLeads } = useFilteredLeads();
  const { fetchLeadStatus } = useLeadStatuses();
  const {
    onStatusChange,
    onAgentChange,
    onPriorityChange,
    onSortChange,
    onRangeChange,
  } = useFilterHandlers();
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
        <Error text="Error occurred while fetching leads" />
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h1 className="h3 mb-0">Leads By Status</h1>
        <div className="d-flex gap-3">
          <div className="card border-primary border-2">
            <div className="card-body p-2 px-3">
              <div className="text-primary">
                <div className="h4 mb-0">{filteredLeads.length}</div>
                <div className="small">Filtered Leads</div>
              </div>
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
            <div className="col-md-6">
              <SortByPriority onSort={onSortChange} />
            </div>
            <div className="col-md-6">
              <SortByTimeToClose onChange={onRangeChange} />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th className="ps-4">Name</th>
                  <th>Sales Agent</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Priority</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead._id}>
                    <td className="ps-4 py-3">
                      <span className="fw-medium">{lead.name}</span>
                    </td>
                    <td className="align-middle">{lead.salesAgent.name}</td>
                    <td className="align-middle">
                      <span className={`badge bg-${
                        lead.status === "New" ? "primary" :
                        lead.status === "Qualified" ? "success" :
                        lead.status === "Closed" ? "secondary" : "warning"
                      }-subtle text-${
                        lead.status === "New" ? "primary" :
                        lead.status === "Qualified" ? "success" :
                        lead.status === "Closed" ? "secondary" : "warning"
                      } px-3 py-2`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="text-end pe-4 align-middle">
                      <span className={`badge bg-${
                        lead.priority === "High" ? "danger" :
                        lead.priority === "Medium" ? "warning" : "info"
                      }-subtle text-${
                        lead.priority === "High" ? "danger" :
                        lead.priority === "Medium" ? "warning" : "info"
                      } px-3 py-2`}>
                        {lead.priority}
                      </span>
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