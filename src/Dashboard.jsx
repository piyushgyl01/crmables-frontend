import Error from "./components/Error";
import Loading from "./components/Loading";
import SelectFilter from "./components/Filter";
import LeadView from "./components/LeadView";
import useFilteredLeads from "./hooks/useFilteredLeads";
import useLeadStatuses from "./hooks/useLeadStatuses";
import useFilterHandlers from "./hooks/useFilterHandlers";
import useSelectOptions from "./hooks/useSelectOptions";
import LeadOverview from "./components/LeadOverview";
import NotFound from "./components/NotFound";

export default function Dashboard() {
  const { filteredLeads, newLeads, contactedLeads, qualifiedLeads } =
    useFilteredLeads();
  const { fetchLeadStatus } = useLeadStatuses();
  const { statusOptions } = useSelectOptions();
  const { onStatusChange } = useFilterHandlers();

  return (
    <div className="container-fluid py-4">
      {fetchLeadStatus === "error" && <Error text="Unable to fetch the data" />}
      {fetchLeadStatus === "loading" ? (
        <div className="text-center py-5">
          <Loading />
        </div>
      ) : (
        <>
          <div className="row g-4 mb-4">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center bg-white p-4 rounded shadow-sm">
                <h1 className="h3 mb-0">Dashboard</h1>
                <div style={{ width: "200px" }}>
                  <SelectFilter
                    label="Filter By Status"
                    options={statusOptions}
                    onFilterChange={onStatusChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <LeadOverview
            newLeads={newLeads}
            contactedLeads={contactedLeads}
            qualifiedLeads={qualifiedLeads}
          />
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0">Recent Leads</h5>
            </div>
            <div className="card-body">
              {fetchLeadStatus === "success" && (
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                  {filteredLeads.map((lead) => (
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
              )}
              {fetchLeadStatus === "success" && filteredLeads.length === 0 && (
                <NotFound
                  heading="No leads found"
                  message="Try adjusting your filters"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
