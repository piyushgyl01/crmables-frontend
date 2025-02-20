import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../components/Form";
import ToastNotification from "../../components/ToastNotification";
import { useNavigate } from "react-router-dom";
import { postLead, selectLeadStatuses } from "./leadSlice";
import {
  fetchSalesAgent,
  selectAllSalesAgents,
} from "../salesAgent/agentSlice";

export default function AddNewLead() {
  //NAVIGATE
  const navigate = useNavigate();

  //STATES
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: [],
    timeToClose: 0,
    priority: "",
  });
  const dispatch = useDispatch();

  const salesAgent = useSelector(selectAllSalesAgents);

  useEffect(() => {
    dispatch(fetchSalesAgent());
  }, [dispatch]);

  const { postLeadStatus } = useSelector(selectLeadStatuses);

  useEffect(() => {
    if (postLeadStatus === "success") {
      // Check for 'success' status
      setFormData({
        // Reset the form data
        name: "",
        source: "",
        salesAgent: "",
        status: "",
        tags: [],
        timeToClose: 0,
        priority: "",
      });
      setShowToast(true); // Show success toast
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      navigate("/lead-list"); // Navigate to lead list page
    }
  }, [postLeadStatus, navigate]); // Dependencies: postLeadStatus and navigate

  //HANDLE ADD LEAD FUNCTION
  const handleAddLead = async (formData) => {
    console.log("Data being sent:", formData);

    try {
      dispatch(postLead(formData));
      // const response = await fetch(
      //   "https://crmables-backend.vercel.app/leads",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(formData),
      //   }
      // );
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   console.log("Server error:", errorData);
      // }

      // if (response.ok) {
      //   setFormData({
      //     name: "",
      //     source: "",
      //     salesAgent: "",
      //     status: "",
      //     tags: [],
      //     timeToClose: 0,
      //     priority: "",
      //   });
      //   setShowToast(true);
      //   setTimeout(() => {
      //     setShowToast(false);
      //   }, 3000);
      //   navigate("/lead-list")
      // }
    } catch (error) {
      console.error("Error saving the lead:", error);
    }
  };

  return (
    <>
      {/* TOAST NOTIFICATION */}
      {showToast && (
        <ToastNotification
          toastMessage={"Lead Added"}
          setShowToast={showToast}
        />
      )}
      <Form salesAgent={salesAgent} onSave={handleAddLead} type="add" />
    </>
  );
}
