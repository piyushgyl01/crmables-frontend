import { Link } from "react-router-dom";
import SelectFilter from "../../components/Filter";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useLeadStatuses from "../../hooks/useLeadStatuses";
import useFilteredLeads from "../../hooks/useFilteredLeads";
import useSelectOptions from "../../hooks/useSelectOptions";
import useFilterHandlers from "../../hooks/useFilterHandlers";
import NotFound from "../../components/NotFound";
import LeadsTable from "./LeadsTable";

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
            to="/add-new-lead"
            className="btn btn-primary d-flex align-items-center px-3"
          >
            Add New Lead
          </Link>
        </div>
      </div>
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
      <LeadsTable status={false} filteredLeads={filteredLeads} />
      {filteredLeads.length === 0 && (
        <NotFound
          heading="No leads found"
          message="Try adjusting your filters"
        />
      )}
    </div>
  );
}
