import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeadById,
  selectLeadById,
  selectLeadStatuses,
  editLead,
  fetchComments,
  postComment,
  selectComments,
  selectLeads,
  fetchLeads,
} from "./leadSlice";
import {
  fetchSalesAgent,
  selectAllSalesAgents,
} from "../salesAgent/agentSlice";
import Form from "../../components/Form";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import ToastNotification from "../../components/ToastNotification";

const priorityColors = {
  High: "danger",
  Medium: "warning",
  Low: "success",
};

export default function LeadDetails() {
  const dispatch = useDispatch();
  const { leadID } = useParams();

  // States
  const [showToast, setShowToast] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedLead, setEditedLead] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: [""],
    timeToClose: 0,
    priority: "",
  });
  const [commentContent, setCommentContent] = useState({
    author: "",
    commentText: "",
  });

  // Selectors
  const leads = useSelector(selectLeads);
  console.log("leads",leads)
  const lead = leads?.find((lead) => lead._id == leadID);
  const comments = useSelector(selectComments);
  const salesAgents = useSelector(selectAllSalesAgents);
  const { fetchLeadByIdStatus, postCommentStatus } =
    useSelector(selectLeadStatuses);

  // Fetch data
  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchComments(leadID));
    dispatch(fetchSalesAgent());
  }, [dispatch, leadID]);

  const salesAgent = useSelector(selectAllSalesAgents);

  const handleEdit = async (editedLeadData) => {
    try {
      // await fetch(`https://crmables-backend.vercel.app/leads/${leadID}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(editedLeadData),
      // });
      dispatch(editLead({ leadID: leadID, editedLeadData }));
      dispatch(fetchLeads());
      console.log("Lead details updated successfully", editedLeadData);
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating lead details:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      await dispatch(
        postComment({
          id: leadID,
          comment: { ...commentContent, lead: leadID },
        })
      ).unwrap();

      setCommentContent({ author: "", commentText: "" });
      dispatch(fetchComments(leadID));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (fetchLeadByIdStatus === "loading") return <Loading />;
  if (fetchLeadByIdStatus === "error") return <Error />;

  return (
    <div className="container-fluid py-4">
      {showToast && (
        <ToastNotification
          message="Lead Updated Successfully"
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Main Info Card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">{lead?.name}</h1>
          <button
            className={`btn ${showEditForm ? "btn-outline-secondary" : "btn-primary"}`}
            onClick={() => setShowEditForm(!showEditForm)}
          >
            {showEditForm ? "Cancel" : "Edit Lead"}
          </button>
        </div>

        <div className="card-body">
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
                      <span
                        className={`badge bg-${priorityColors[lead?.priority]}`}
                      >
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

          {/* Edit Form */}
          {showEditForm && (
            <div className="mt-4">
              <Form
                lead={lead}
                salesAgent={salesAgent}
                onSave={handleEdit}
                type="edit"
              />
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h2 className="h5 mb-0">Comments</h2>
        </div>
        <div className="card-body">
          {/* Comments List */}
          <div className="mb-4">
            {comments?.map((comment) => (
              <div key={comment._id} className="card border-0 bg-light mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">{comment.author.name}</h6>
                    <small className="text-muted">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <p className="card-text mb-0">{comment.commentText}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <div className="border-top pt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddComment();
              }}
            >
              <div className="mb-3">
                <label className="form-label">Author</label>
                <select
                  className="form-select"
                  value={commentContent.author}
                  onChange={(e) =>
                    setCommentContent({
                      ...commentContent,
                      author: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select Author</option>
                  {salesAgents?.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Comment</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={commentContent.commentText}
                  onChange={(e) =>
                    setCommentContent({
                      ...commentContent,
                      commentText: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={!commentContent.author || !commentContent.commentText}
              >
                Add Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
