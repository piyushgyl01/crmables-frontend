import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLeads, selectLeads } from "../features/lead/leadSlice";

export default function useLeads() {
  const dispatch = useDispatch();
  const leads = useSelector(selectLeads);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  return leads;
}
