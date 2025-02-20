import React from "react";
import { Link } from "react-router-dom";
import { AvatarGenerator } from "random-avatar-generator";

export default function AgentTable({ salesAgent }) {
  const generator = new AvatarGenerator();

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th className="ps-4">Name</th>
                <th>Email</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {salesAgent?.map((agent) => (
                <tr key={agent._id}>
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={generator.generateRandomAvatar()}
                        className="rounded-circle me-3"
                        alt="Avatar"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <span className="fw-medium">{agent.name}</span>
                    </div>
                  </td>
                  <td className="align-middle">{agent.email}</td>

                  <td className="text-end pe-4 align-middle">
                    <div className="btn-group">
                      <Link
                        to={`/sales-agent-details/${agent._id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View Details
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
