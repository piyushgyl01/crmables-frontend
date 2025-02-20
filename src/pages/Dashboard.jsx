import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLeads, selectFilteredLeads, selectLeadStatuses, setStatusFilter } from "../features/lead/leadSlice";
import Error from "../components/Error";
import Loading from "../components/Loading";
import SelectFilter from "../components/Filter";
import LeadView from "../components/LeadView";

export default function Dashboard() {
  const dispatch = useDispatch();
  const filteredLeads = useSelector(selectFilteredLeads);
  const { fetchLeadStatus } = useSelector(selectLeadStatuses);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const statusOptions = ["New", "Contacted", "Qualified", "Closed"];

  const newLeads = filteredLeads.filter(lead => lead.status === "New").length;
  const contactedLeads = filteredLeads.filter(lead => lead.status === "Contacted").length;
  const qualifiedLeads = filteredLeads.filter(lead => lead.status === "Qualified").length;

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center bg-white p-4 rounded shadow-sm">
            <h1 className="h3 mb-0">Dashboard</h1>
            <div style={{ width: "200px" }}>
              <SelectFilter
                label="Filter By Status"
                options={statusOptions}
                onFilterChange={(status) => dispatch(setStatusFilter(status))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
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

      {/* Leads Section */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0">Recent Leads</h5>
        </div>
        <div className="card-body">
          {fetchLeadStatus === "loading" && (
            <div className="text-center py-5">
              <Loading />
            </div>
          )}
          {fetchLeadStatus === "error" && <Error />}
          {fetchLeadStatus === "success" && (
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
              {filteredLeads.map((lead) => (
                <div key={lead._id} className="col">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <LeadView
                        name={lead.name}
                        source={lead.source}
                        salesAgent={lead.salesAgent.name}
                        status={lead.status}
                        tags={lead.tags.join(", ")}
                        timeToClose={lead.timeToClose}
                        priority={lead.priority}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {fetchLeadStatus === "success" && filteredLeads.length === 0 && (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-inbox fs-1 mb-3 d-block"></i>
              <h5>No leads found</h5>
              <p className="mb-0">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}