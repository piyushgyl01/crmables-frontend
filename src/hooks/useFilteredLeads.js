import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLeads, selectFilteredLeads } from "../features/lead/leadSlice";

export default function useFilteredLeads() {
  const dispatch = useDispatch();
  const filteredLeads = useSelector(selectFilteredLeads);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const newLeads = filteredLeads.filter((lead) => lead.status === "New").length;
  const contactedLeads = filteredLeads.filter(
    (lead) => lead.status === "Contacted"
  ).length;
  const qualifiedLeads = filteredLeads.filter(
    (lead) => lead.status === "Qualified"
  ).length;

  return { filteredLeads, newLeads, contactedLeads, qualifiedLeads };
}
