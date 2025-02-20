import { Link } from "react-router-dom";

export default function LeadsTable({ filteredLeads, status }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th className="ps-4">Name</th>
                {!status && <th>Source</th>}
                <th>Sales Agent</th>
                {!status && <th>Status</th>}
                <th>Time to Close</th>
                <th>Priority</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead._id}>
                  <td className="ps-4 py-3">
                    <span className="fw-medium">{lead.name}</span>
                  </td>
                  {!status && <td>{lead.source}</td>}
                  <td>{lead.salesAgent.name}</td>
                  {!status && (
                    <td>
                      <span
                        className={`badge bg-${
                          lead.status === "New"
                            ? "primary"
                            : lead.status === "Qualified"
                              ? "success"
                              : lead.status === "Closed"
                                ? "secondary"
                                : "warning"
                        }-subtle text-${
                          lead.status === "New"
                            ? "primary"
                            : lead.status === "Qualified"
                              ? "success"
                              : lead.status === "Closed"
                                ? "secondary"
                                : "warning"
                        } px-3 py-2`}
                      >
                        {lead.status}
                      </span>
                    </td>
                  )}
                  <td>{lead.timeToClose} days</td>
                  <td>
                    <span
                      className={`badge bg-${
                        lead.priority === "High"
                          ? "danger"
                          : lead.priority === "Medium"
                            ? "warning"
                            : "info"
                      }-subtle text-${
                        lead.priority === "High"
                          ? "danger"
                          : lead.priority === "Medium"
                            ? "warning"
                            : "info"
                      } px-3 py-2`}
                    >
                      {lead.priority}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    <Link
                      to={`/lead-list/${lead.name}/${lead._id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      View Details
                    </Link>
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
