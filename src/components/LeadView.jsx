import { AvatarGenerator } from "random-avatar-generator";

export default function LeadView({
  name,
  source,
  salesAgent,
  status,
  tags,
  timeToClose,
  priority,
}) {
  const generator = new AvatarGenerator();
  const priorityColors = {
    High: "danger",
    Medium: "warning",
    Low: "success",
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-white d-flex align-items-center">
        <img
          src={generator.generateRandomAvatar()}
          className="rounded-circle me-3"
          alt="Avatar"
          style={{ width: "40px", height: "40px" }}
        />
        <h5 className="mb-0">{name}</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <span className="text-muted">Source:</span>
          <span className="ms-2 fw-semibold">{source}</span>
        </div>
        <div className="mb-3">
          <span className="text-muted">Sales Agent:</span>
          <span className="ms-2 fw-semibold">{salesAgent}</span>
        </div>
        <div className="mb-3">
          <span className="text-muted">Status:</span>
          <span
            className={`badge bg-${status === "Closed" ? "success" : "primary"} ms-2`}
          >
            {status}
          </span>
        </div>
        <div className="mb-3">
          <span className="text-muted">Tags:</span>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {tags.split(", ").map((tag, index) => (
              <span key={index} className="badge bg-secondary">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <span className="text-muted">Time to close:</span>
          <span className="ms-2 fw-semibold">{timeToClose} Days</span>
        </div>
        <div className="mb-0">
          <span className="text-muted">Priority:</span>
          <span className={`badge bg-${priorityColors[priority]} ms-2`}>
            {priority}
          </span>
        </div>
      </div>
    </div>
  );
}