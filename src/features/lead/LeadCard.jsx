import React from "react";
const priorityColors = {
  High: "danger",
  Medium: "warning",
  Low: "success",
};

export default function LeadCard({ lead }) {
  return (
    <div className="row g-4">
      {/* Left Column */}
      <div className="col-md-6">
        <div className="card h-100 border-0 bg-light">
          <div className="card-body">
            <h5 className="card-title mb-4">Basic Information</h5>
            <dl className="row mb-0">
              <dt className="col-sm-4">Status</dt>
              <dd className="col-sm-8">
                <span
                  className={`badge bg-${lead?.status === "Closed" ? "success" : "primary"}`}
                >
                  {lead?.status}
                </span>
              </dd>

              <dt className="col-sm-4">Priority</dt>
              <dd className="col-sm-8">
                <span className={`badge bg-${priorityColors[lead?.priority]}`}>
                  {lead?.priority}
                </span>
              </dd>

              <dt className="col-sm-4">Source</dt>
              <dd className="col-sm-8">{lead?.source}</dd>
            </dl>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="col-md-6">
        <div className="card h-100 border-0 bg-light">
          <div className="card-body">
            <h5 className="card-title mb-4">Additional Details</h5>
            <dl className="row mb-0">
              <dt className="col-sm-4">Sales Agents</dt>
              <dd className="col-sm-8">{lead?.salesAgent?.name}</dd>

              <dt className="col-sm-4">Time to Close</dt>
              <dd className="col-sm-8">{lead?.timeToClose} days</dd>

              <dt className="col-sm-4">Tags</dt>
              <dd className="col-sm-8">
                {lead?.tags?.map((tag) => (
                  <span key={tag} className="badge bg-secondary me-1">
                    {tag}
                  </span>
                ))}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
