import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAgentStatuses from "../../../hooks/useAgentStatuses";
import { postSalesAgent } from "../agentSlice";

export default function useHandlers() {
  const [salesAgentData, setSalesAgentData] = useState({
    name: "",
    email: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { postSalesAgentStatus } = useAgentStatuses();

  useEffect(() => {
    if (postSalesAgentStatus === "success") {
      setSalesAgentData({ name: "", email: "" });
      navigate("/sales-agent-list");
    }
  }, [postSalesAgentStatus, navigate]);
  const handleAddSalesAgent = () => {
    try {
      dispatch(postSalesAgent(salesAgentData));
    } catch (error) {
      console.error("Error occurred while adding sales agent", error);
    }
  };

  return { handleAddSalesAgent, salesAgentData, setSalesAgentData };
}
