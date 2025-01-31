import useFetch from "../useFetch";
import { useState } from "react";
import Error from "../components/Error";
import Loading from "../components/Loading";
import SelectFilter from "../components/Filter";
import LeadView from "../components/LeadView";

export default function Dashboard() {
  //STATES
  const [status, setStatus] = useState("All");
  const [visibleLeads, setVisibleLeads] = useState(3);
  const itemsPerPage = 3;

  //DATA FETCH
  const { data, loading, error } = useFetch(
    "https://crmables-backend.vercel.app/leads"
  );

  //HANDLER FUNCTIONS
  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
    setVisibleLeads(3); // Reset to initial state when filter changes
  };

  const statusOptions = ["New", "Contacted", "Qualified", "Closed"];

  const filteredData =
    status === "All" ? data : data?.filter((lead) => lead.status === status);

  const loadMore = () => {
    setVisibleLeads((prev) => prev + itemsPerPage);
  };

  //LEAD STATUS OVERVIEW FUNCTION
  const newLead = data?.filter((lead) => lead.status === "New").length || 0;
  const contactedLead =
    data?.filter((lead) => lead.status === "Contacted").length || 0;
  const qualifiedLead =
    data?.filter((lead) => lead.status === "Qualified").length || 0;

  return (
    <>
      {/* LEAD VIEW */}
      <div className="container-fluid my-5">
        <div className="row mb-3 align-items-center">
          <div className="col-md-6">
            <h1 className="h2 mb-0">Lead Status Overview</h1>
          </div>
          <div className="col-md-6 mb-4">
            <SelectFilter
              label="Filter By Status"
              options={statusOptions}
              onFilterChange={handleStatusChange}
            />
          </div>
        </div>
        {loading && <Loading />}
        {error && <Error />}
        {filteredData?.length > 0 ? (
          <>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filteredData.slice(0, visibleLeads).map((lead) => (
                <div key={lead._id} className="col">
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
              ))}
            </div>
            {visibleLeads < filteredData.length && (
              <div className="text-center mt-4">
                <button onClick={loadMore} className="btn btn-primary px-5">
                  Show More ({filteredData.length - visibleLeads} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <p>No Leads Found</p>
        )}
      </div>
      {/* LEAD STATUS OVERVIEW VIEW */}
      <main className="container-fluid my-5">
        <div className="row mb-4">
          <div className="col">
            <h2 className="h4 mb-3">Lead Status Overview</h2>
            {loading && <Loading />}
            {error && <Error />}
            {data && (
              <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                  <div className="card h-100 border-start border-primary border-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <span className="text-muted small">New Leads</span>
                          <h3 className="mb-0">{newLead}</h3>
                        </div>
                        <div className="bg-primary text-white rounded-circle p-3">
                          <i className="bi bi-plus-lg fs-4"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100 border-start border-warning border-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <span className="text-muted small">Contacted</span>
                          <h3 className="mb-0">{contactedLead}</h3>
                        </div>
                        <div className="bg-warning text-white rounded-circle p-3">
                          <i className="bi bi-telephone-outbound fs-4"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100 border-start border-success border-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <span className="text-muted small">Qualified</span>
                          <h3 className="mb-0">{qualifiedLead}</h3>
                        </div>
                        <div className="bg-success text-white rounded-circle p-3">
                          <i className="bi bi-check2-circle fs-4"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
