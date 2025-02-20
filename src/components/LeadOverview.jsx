export default function LeadOverview({
  newLeads,
  contactedLeads,
  qualifiedLeads,
}) {
  return (
    <div className="row g-4 mb-4">
      <div className="col-12 col-md-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body d-flex align-items-center">
            <div className="rounded-circle bg-primary bg-opacity-10 p-4 me-3">
              <i className="bi bi-plus-lg text-primary fs-4"></i>
            </div>
            <div>
              <h6 className="text-muted mb-1">New Leads</h6>
              <h2 className="mb-0">{newLeads}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body d-flex align-items-center">
            <div className="rounded-circle bg-warning bg-opacity-10 p-4 me-3">
              <i className="bi bi-telephone-outbound text-warning fs-4"></i>
            </div>
            <div>
              <h6 className="text-muted mb-1">Contacted</h6>
              <h2 className="mb-0">{contactedLeads}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body d-flex align-items-center">
            <div className="rounded-circle bg-success bg-opacity-10 p-4 me-3">
              <i className="bi bi-check2-circle text-success fs-4"></i>
            </div>
            <div>
              <h6 className="text-muted mb-1">Qualified</h6>
              <h2 className="mb-0">{qualifiedLeads}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
