import { useSelector } from "react-redux";
import { selectLeadStatuses } from "../features/lead/leadSlice";

export default function useLeadStatuses() {
  const {
    fetchLeadStatus,
    fetchLeadByIdStatus,
    postLeadStatus,
    editLeadStatus,
    deleteLeadStatus,
    fetchCommentStatus,
    postCommentStatus,
  } = useSelector(selectLeadStatuses);

  return {
    fetchLeadStatus,
    fetchLeadByIdStatus,
    postLeadStatus,
    editLeadStatus,
    deleteLeadStatus,
    fetchCommentStatus,
    postCommentStatus,
  };
}
