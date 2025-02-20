import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editLead, fetchComments, postComment, postLead } from "../leadSlice";
import useLead from "./useLead";
import useLeadStatuses from "../../../hooks/useLeadStatuses";

export default function useHandlers() {
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState(false);
  const [commentContent, setCommentContent] = useState({
    author: "",
    commentText: "",
  });
  const navigate = useNavigate();

  const { leadID } = useLead();

  const handleEdit = async (editedLeadData) => {
    try {
      dispatch(editLead({ leadID: leadID, editedLeadData }));
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

  const { postLeadStatus } = useLeadStatuses();

  useEffect(() => {
    if (postLeadStatus === "success") {
      setTimeout(() => {
        navigate("/lead-list");
      }, 3000);
    } else if (postLeadStatus === "error") {
      console.log("Error adding lead. Please try again.");
    }
  }, [postLeadStatus, navigate]);

  const handleAddLead = async (formData) => {
    try {
      await dispatch(postLead(formData)).unwrap();
    } catch (error) {
      console.error("Error saving the lead:", error);
    }
  };

  return {
    handleEdit,
    handleAddComment,
    showEditForm,
    setShowEditForm,
    commentContent,
    setCommentContent,
    handleAddLead,
  };
}
