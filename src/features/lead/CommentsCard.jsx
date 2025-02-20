import React from "react";

export default function CommentsCard({
  comments,
  commentContent,
  salesAgents,
  setCommentContent,
  postCommentStatus,
  handleAddComment,
}) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white py-3">
        <h2 className="h5 mb-0">Comments</h2>
      </div>
      <div className="card-body">
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
              disabled={postCommentStatus === "loading"}
            >
              {postCommentStatus === "loading" ? "Adding" : "Add Comment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
