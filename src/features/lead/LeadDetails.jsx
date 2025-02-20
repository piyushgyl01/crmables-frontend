import Form from "../../components/Form";
import Loading from "../../components/Loading";
import useSalesAgent from "../../hooks/useSalesAgent";
import useLead from "./hooks/useLead";
import useComments from "./hooks/useComments";
import useLeadStatuses from "../../hooks/useLeadStatuses";
import useHandlers from "./hooks/useHandlers";
import LeadCard from "./LeadCard";
import CommentsCard from "./CommentsCard";

export default function LeadDetails() {
  const { lead } = useLead();
  const comments = useComments();
  const salesAgents = useSalesAgent();
  const { postCommentStatus, fetchLeadStatus } = useLeadStatuses();
  const {
    handleEdit,
    handleAddComment,
    showEditForm,
    setShowEditForm,
    commentContent,
    setCommentContent,
  } = useHandlers();

  return (
    <div className="container-fluid py-4">
      {fetchLeadStatus === "loading" ? (
        <Loading />
      ) : (
        <>
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
              <LeadCard lead={lead} />
              {showEditForm && (
                <div className="mt-4">
                  <Form lead={lead} onSave={handleEdit} type="edit" />
                </div>
              )}
            </div>
          </div>
          <CommentsCard
            comments={comments}
            commentContent={commentContent}
            salesAgents={salesAgents}
            setCommentContent={setCommentContent}
            postCommentStatus={postCommentStatus}
            handleAddComment={handleAddComment}
          />
        </>
      )}
    </div>
  );
}
