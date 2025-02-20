import { AvatarGenerator } from "random-avatar-generator";
import SelectFilter from "../../components/Filter";
import SortByTimeToClose from "../../components/SortByTimeToClose";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useFilterHandlers from "../../hooks/useFilterHandlers";
import useSelectOptions from "../../hooks/useSelectOptions";
import useLeadStatuses from "../../hooks/useLeadStatuses";
import useAgent from "./hooks/useAgent";
import NotFound from "../../components/NotFound";
import LeadsTable from "../lead/LeadsTable";
import AgentDetailHeader from "./AgentDetailHeader";

export default function SalesAgentView() {
  const { fetchLeadStatus } = useLeadStatuses();
  const { currentAgent, agentLeads, activeLeads } = useAgent();
  const { statusOptions, priorityOptions } = useSelectOptions();
  const { onStatusChange, onPriorityChange, onRangeChange } =
    useFilterHandlers();
  const generator = new AvatarGenerator();

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
        <AgentDetailHeader activeLeads={activeLeads} agentLeads={agentLeads} />
      </div>
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-3">
            <img
              src={generator.generateRandomAvatar()}
              className="rounded-circle me-3"
              alt="Avatar"
              style={{ width: "60px", height: "60px" }}
            />
            <div>
              <h2 className="h4 mb-1">{currentAgent.name}</h2>
              <p className="text-muted mb-0">{currentAgent.email}</p>
            </div>
          </div>
        </div>
      </div>
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
      <LeadsTable status={true} filteredLeads={agentLeads} />
      {agentLeads.length === 0 && (
        <NotFound
          heading="No leads found"
          message="This agent currently has no assigned leads"
        />
      )}
    </div>
  );
}
