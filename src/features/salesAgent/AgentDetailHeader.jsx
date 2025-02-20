import React from "react";

export default function AgentDetailHeader({ agentLeads, activeLeads }) {
  return (
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
  );
}
