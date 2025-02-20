import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchLeads,
  selectFilteredLeads,
  selectLeadStatuses,
  setStatusFilter,
  setAgentFilter,
  setPriorityFilter,
  setPrioritySort,
  setTimeRange,
} from "./leadSlice";
import SelectFilter from "../../components/Filter";
import SortByPriority from "../../components/SortByPriority";
import SortByTimeToClose from "../../components/SortByTimeToClose";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useFetch from "../../useFetch";
import {
  fetchSalesAgent,
  selectAllSalesAgents,
} from "../salesAgent/agentSlice";

export default function LeadList() {
  const dispatch = useDispatch();
  const filteredLeads = useSelector(selectFilteredLeads);
  const { fetchLeadStatus } = useSelector(selectLeadStatuses);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const salesAgent = useSelector(selectAllSalesAgents);
 
  useEffect(() => {
    dispatch(fetchSalesAgent());
  }, [dispatch]);

  const statusOptions = ["New", "Contacted", "Qualified", "Closed"];
  const priorityOptions = ["Low", "Medium", "High"];
  const agentOptions = salesAgent ? salesAgent.map((agent) => agent.name) : [];

  return (
    <main className="container-fluid my-5">
      <h1>Lead List</h1>

      <div className="row">
        <span className="col-md-3 my-4">
          <SelectFilter
            label="Filter By Status"
            options={statusOptions}
            onFilterChange={(status) => dispatch(setStatusFilter(status))}
          />
        </span>
        <span className="col-md-3 my-4">
          <SelectFilter
            label="Filter By Agent"
            options={agentOptions}
            onFilterChange={(agent) => dispatch(setAgentFilter(agent))}
          />
        </span>
        <span className="col-md-3 my-4">
          <SelectFilter
            label="Filter By Priority"
            options={priorityOptions}
            onFilterChange={(priority) => dispatch(setPriorityFilter(priority))}
          />
        </span>
      </div>

      {fetchLeadStatus === "loading" && <Loading />}
      {fetchLeadStatus === "error" && <Error />}
      {fetchLeadStatus === "success" && (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Source</th>
              <th>Sales Agent</th>
              <th>Status</th>
              <th>Time To Close (In Days)</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead._id}>
                <td>
                  <Link
                    className="text-dark"
                    to={`/lead-list/${lead.name}/${lead._id}`}
                  >
                    {lead.name}
                  </Link>
                </td>
                <td>{lead.source}</td>
                <td>{lead.salesAgent.name}</td>
                <td>{lead.status}</td>
                <td>{lead.timeToClose}</td>
                <td>{lead.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
