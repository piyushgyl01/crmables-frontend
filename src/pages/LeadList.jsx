import * as React from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import SelectFilter from "../components/Filter";
import { useState } from "react";
import SortByPriority from "../components/SortByPriority";
import SortByTimeToClose from "../components/SortByTimeToClose";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function LeadList() {
  //STATES
  const [status, setStatus] = useState("All");
  const [agent, setAgent] = React.useState("All");
  const [priority, setPriority] = React.useState("All");
  const [prioritySort, setPrioritySort] = React.useState("");
  const [timeRange, setTimeRange] = React.useState([0, 100]);
  const [sortByPriority, setSortByPriority] = React.useState(false);

  //LEADS FETCH
  const {
    data: leads,
    loading: leadsLoading,
    error: leadError,
  } = useFetch("https://crmables-backend.vercel.app/leads");

  //SALES AGENT FETCH
  const {
    data: salesAgent,
    loading: salesAgentLoading,
    error: salesAgentError,
  } = useFetch("https://crmables-backend.vercel.app/salesAgent");

  //OPTIONS ARRAY
  const statusOptions = ["New", "Contacted", "Qualified", "Closed"];
  const priorityOptions = ["Low", "Medium", "High"];
  const agentOptions = salesAgent ? salesAgent.map((agent) => agent.name) : [];

  //HANDLER FUNCTIONS
  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const handleAgentChange = (selectedAgent) => {
    setAgent(selectedAgent);
  };

  const handlePriorityChange = (selectedPriority) => {
    setPriority(selectedPriority);
  };

  const handlePrioritySort = (event) => {
    setPrioritySort(event.target.value);
  };

  const handleTimeRangeChange = (event, newRange) => {
    setTimeRange(newRange);
  };

  //DATA TO DISPLAY
  const processedData = React.useMemo(() => {
    if (!leads) return [];

    if (leads) {
      let result = leads.filter((lead) => {
        const statusMatch = status === "All" || lead.status === status;
        const agentMatch = agent === "All" || lead.salesAgent.name === agent;
        const priorityMatch = priority === "All" || lead.priority === priority;
        const timeMatch =
          lead.timeToClose >= timeRange[0] && lead.timeToClose <= timeRange[1];
        return statusMatch && agentMatch && priorityMatch && timeMatch;
      });

      if (prioritySort) {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        result = [...result].sort((a, b) => {
          if (prioritySort === "highToLow") {
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          } else {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          }
        });
      }
      return result;
    }

    return leads;
  }, [leads, status, agent, priority, prioritySort, timeRange]);

  return (
    <>
      <main className="container-fluid my-5">
        <h1>Lead List</h1>
        {/* FILTERS */}
        <div className="row">
          <span className="col-md-3 my-4">
            <SelectFilter
              label="Filter By Status"
              options={statusOptions}
              onFilterChange={handleStatusChange}
            />
          </span>
          <span className="col-md-3 my-4">
            <SelectFilter
              label="Filter By Agent"
              options={agentOptions}
              onFilterChange={handleAgentChange}
            />
          </span>
          {sortByPriority && (
            <span className="col-md-3 my-4">
              <SelectFilter
                label="Filter By Priority"
                options={priorityOptions}
                onFilterChange={handlePriorityChange}
              />{" "}
            </span>
          )}
          <span className="col-md-3 my-4">
            <SortByPriority onSort={handlePrioritySort} value={prioritySort} />{" "}
          </span>
          <span className="col-md-3 my-4">
            <SortByTimeToClose
              value={timeRange}
              onChange={handleTimeRangeChange}
            />
          </span>
        </div>
        {/* LEADS TABLE VIEW */}
        {leadsLoading && <Loading />}
        {leadError && <Error />}
        {processedData && (
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Source</th>
                <th scope="col">Sales Agent</th>
                <th scope="col">Status</th>
                <th scope="col">Time To Close (In Days)</th>
                <th scope="col">Priority</th>
              </tr>
            </thead>
            <tbody>
              {processedData?.map((agent) => (
                <tr key={agent._id}>
                  <td>{agent.name}</td>
                  <td>{agent.source}</td>
                  <td>{agent.salesAgent.name}</td>
                  <td>{agent.status}</td>
                  <td>{agent.timeToClose}</td>
                  <td>{agent.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
