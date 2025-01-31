import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Form from "../components/Form";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useState } from "react";
import ToastNotification from "../components/ToastNotification";

export default function LeadDetails() {
  //STATES
  const [showToast, setShowToast] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: [],
    timeToClose: 0,
    priority: "",
  });
  //GETTING ID WITH USEPARAM
  const { leadID } = useParams();

  //DATA FETCH
  const { data, loading, error, refetch } = useFetch(
    "https://crmables-backend.vercel.app/leads"
  );

  //FOUND LEAD FUNCTION
  const foundLead = data?.find((lead) => lead._id === leadID);

  //HANDLE EDIT LEAD FUNCTION
  const handleEditLead = async () => {
    try {
      const response = await fetch(
        `https://crmables-backend.vercel.app/leads/${leadID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Server error:", errorData);
      }

      if (response.ok) {
        refetch();
        setShowEditForm(false);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error saving the lead:", error);
    }
  };

  return (
    <>
      {/* TOAST NOTIFICATION */}
      {showToast && (
        <ToastNotification
          toastMessage={"Lead Edited"}
          setShowToast={showToast}
        />
      )}
      <main className="container my-5">
        {loading && <Loading />}
        {error && <Error />}
        {/* LEAD DETAILS */}
        {data && (
          <>
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h1 className="display-5 mb-0">{foundLead?.name}</h1>
              </div>
              <div className="card-body">
                <dl className="row mb-0">
                  <dt className="col-sm-3">Status</dt>
                  <dd className="col-sm-9">
                    <span className="badge bg-primary">
                      {foundLead?.status}
                    </span>
                  </dd>

                  <dt className="col-sm-3">Source</dt>
                  <dd className="col-sm-9">{foundLead?.source}</dd>

                  <dt className="col-sm-3">Priority</dt>
                  <dd className="col-sm-9">
                    <span className="badge bg-warning">
                      {foundLead?.priority}
                    </span>
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
                <button
                  className={
                    showEditForm
                      ? "btn btn-danger mt-2"
                      : "btn btn-primary mt-2"
                  }
                  onClick={() => setShowEditForm(!showEditForm)}
                >
                  {showEditForm ? "Dismiss" : "Edit Details"}
                </button>
              </div>
            </div>
          </>
        )}
      </main>
      {showEditForm && (
        <Form
          titleText={`Edit Details of ${foundLead?.name}`}
          buttonText={"Save Changes"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleEditLead}
        />
      )}
    </>
  );
}
