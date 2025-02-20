import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SelectFilter from "../../components/Filter";
import { useState, useEffect } from "react";
import SortByPriority from "../../components/SortByPriority";
import SortByTimeToClose from "../../components/SortByTimeToClose";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import {
  fetchLeads,
  selectFilteredLeads,
  selectLeadStatuses,
  setAgentFilter,
  setPriorityFilter,
  setPrioritySort,
  setStatusFilter,
  setTimeRange,
} from "./leadSlice";
import useFetch from "../../useFetch";
import {
  fetchSalesAgent,
  selectAllSalesAgents,
} from "../salesAgent/agentSlice";

export default function LeadByStatus() {
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
    <div className="container-fluid py-4">
      {/* Header & Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h1 className="h3 mb-4">Leads By Status</h1>

          <div className="row g-3">
            <div className="col-md-3">
              <SelectFilter
                label="Filter By Status"
                options={statusOptions}
                onFilterChange={(status) => dispatch(setStatusFilter(status))}
              />
            </div>
            <div className="col-md-3">
              <SelectFilter
                label="Filter By Agent"
                options={agentOptions}
                onFilterChange={(agent) => dispatch(setAgentFilter(agent))}
              />
            </div>
            <div className="col-md-3">
              <SelectFilter
                label="Filter By Priority"
                options={priorityOptions}
                onFilterChange={(priority) =>
                  dispatch(setPriorityFilter(priority))
                }
              />
            </div>
            <div className="col-md-3">
              <SortByPriority
                onSort={(value) => dispatch(setPrioritySort(value))}
              />
            </div>
            <div className="col-md-3">
              <SortByTimeToClose
                onChange={(value) => dispatch(setTimeRange(value))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {fetchLeadStatus === "loading" && (
            <div className="text-center py-5">
              <Loading />
            </div>
          )}

          {fetchLeadStatus === "error" && <Error />}

          {fetchLeadStatus === "success" && (
            <>
              {filteredLeads.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Sales Agent</th>
                        <th scope="col">Status</th>
                        <th scope="col">Priority</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr key={lead._id}>
                          <td className="align-middle">
                            <span className="fw-medium">{lead.name}</span>
                          </td>
                          <td className="align-middle">
                            {lead.salesAgent.name}
                          </td>
                          <td className="align-middle">
                            <span
                              className={`badge bg-${
                                lead.status === "New"
                                  ? "primary"
                                  : lead.status === "Contacted"
                                    ? "warning"
                                    : lead.status === "Qualified"
                                      ? "success"
                                      : "secondary"
                              }`}
                            >
                              {lead.status}
                            </span>
                          </td>
                          <td className="align-middle">
                            <span
                              className={`badge bg-${
                                lead.priority === "High"
                                  ? "danger"
                                  : lead.priority === "Medium"
                                    ? "warning"
                                    : "info"
                              }`}
                            >
                              {lead.priority}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-inbox fs-1 text-muted mb-3 d-block"></i>
                  <h5 className="text-muted">No leads found</h5>
                  <p className="text-muted mb-0">Try adjusting your filters</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
