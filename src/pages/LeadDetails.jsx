import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import LeadView from "../components/LeadView";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function LeadDetails() {
  //GETTING ID WITH USEPARAM
  const { leadID } = useParams();

  //DATA FETCH
  const { data, loading, error } = useFetch(
    "https://crmables-backend.vercel.app/leads"
  );

  //FOUND LEAD FUNCTION
  const foundLead = data?.find((lead) => lead._id === leadID);
  return (
    <>
      <main className="container my-5">
        {/* LEAD DETAILS */}
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <h1 className="display-5 mb-0">{foundLead?.name}</h1>
          </div>
          <div className="card-body">
            <dl className="row mb-0">
              <dt className="col-sm-3">Status</dt>
              <dd className="col-sm-9">
                <span className="badge bg-primary">{foundLead?.status}</span>
              </dd>

              <dt className="col-sm-3">Source</dt>
              <dd className="col-sm-9">{foundLead?.source}</dd>

              <dt className="col-sm-3">Priority</dt>
              <dd className="col-sm-9">
                <span className="badge bg-warning">{foundLead?.priority}</span>
              </dd>

              <dt className="col-sm-3">Sales Agent</dt>
              <dd className="col-sm-9">{foundLead?.salesAgent?.name}</dd>

              <dt className="col-sm-3">Time to Close</dt>
              <dd className="col-sm-9">{foundLead?.timeToClose} days</dd>

              <dt className="col-sm-3">Tags</dt>
              <dd className="col-sm-9">
                {foundLead?.tags?.map((tag) => (
                  <span key={tag} className="badge bg-secondary me-1">
                    {tag}
                  </span>
                ))}
              </dd>
            </dl>
          </div>
        </div>
      </main>
      <main className="container my-5">
        {loading && <Loading />}
        {error && <Error />}
        {data && (
          <>
            <div className="row mb-5">
              <div className="col-12">
                <h1 className="display-4 border-bottom pb-3">
                  Lead Details: {foundLead?.name}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title mb-4">Lead Information</h5>
                    <dl className="row">
                      <dt className="col-sm-4">Status</dt>
                      <dd className="col-sm-8">
                        <span className="badge bg-primary">
                          {foundLead?.status}
                        </span>
                      </dd>

                      <dt className="col-sm-4">Source</dt>
                      <dd className="col-sm-8">{foundLead?.source}</dd>

                      <dt className="col-sm-4">Priority</dt>
                      <dd className="col-sm-8">
                        <span className="badge bg-warning">
                          {foundLead?.priority}
                        </span>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title mb-4">Sales Agent Information</h5>
                    <dl className="row">
                      <dt className="col-sm-4">Sales Agent</dt>
                      <dd className="col-sm-8">
                        {foundLead?.salesAgent?.name}
                      </dd>

                      <dt className="col-sm-4">Time to Close</dt>
                      <dd className="col-sm-8">
                        {foundLead?.timeToClose} days
                      </dd>

                      <dt className="col-sm-4">Tags</dt>
                      <dd className="col-sm-8">
                        {foundLead?.tags?.map((tag) => (
                          <span key={tag} className="badge bg-secondary me-1">
                            {tag}
                          </span>
                        ))}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              \
            </div>
          </>
        )}
      </main>
    </>
  );
}
