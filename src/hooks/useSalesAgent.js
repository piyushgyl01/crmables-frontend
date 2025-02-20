import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSalesAgent,
  selectAllSalesAgents,
} from "../features/salesAgent/agentSlice";

export default function useSalesAgent() {
  const dispatch = useDispatch();
  const salesAgent = useSelector(selectAllSalesAgents);

  useEffect(() => {
    dispatch(fetchSalesAgent());
  }, [dispatch]);

  return salesAgent;
}
