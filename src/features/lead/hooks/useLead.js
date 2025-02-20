import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useLeads from "../../../hooks/useLeads";
import { fetchLeads } from "../leadSlice";

export default function useLead() {
  const dispatch = useDispatch();
  const { leadID } = useParams();
  const leads = useLeads();
  const lead = leads?.find((lead) => lead._id == leadID);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch, leadID]);

  return { lead, leadID };
}
