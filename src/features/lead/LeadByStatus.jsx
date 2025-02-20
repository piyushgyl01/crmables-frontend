import SelectFilter from "../../components/Filter";
import SortByPriority from "../../components/SortByPriority";
import SortByTimeToClose from "../../components/SortByTimeToClose";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useFilteredLeads from "../../hooks/useFilteredLeads";
import useLeadStatuses from "../../hooks/useLeadStatuses";
import useSelectOptions from "../../hooks/useSelectOptions";
import useFilterHandlers from "../../hooks/useFilterHandlers";
import NotFound from "../../components/NotFound";
import LeadsTable from "./LeadsTable";

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
      <LeadsTable status={true} filteredLeads={filteredLeads} />
      {filteredLeads.length === 0 && (
        <NotFound
          heading="No leads found"
          message="Try adjusting your filters"
        />
      )}
    </div>
  );
}
