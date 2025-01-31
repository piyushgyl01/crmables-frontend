import { useState } from "react";
import Form from "../components/Form";
import ToastNotification from "../components/ToastNotification";
import { useNavigate } from "react-router-dom";

export default function AddNewLead() {
  //NAVIGATE
  const navigate = useNavigate()

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

  //HANDLE ADD LEAD FUNCTION
  const handleAddLead = async (formData) => {
    console.log("Data being sent:", formData);

    try {
      const response = await fetch(
        "https://crmables-backend.vercel.app/leads",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Server error:", errorData);
      }

      if (response.ok) {
        setFormData({
          name: "",
          source: "",
          salesAgent: "",
          status: "",
          tags: [],
          timeToClose: 0,
          priority: "",
        });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        navigate("/lead-list")
      }
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
      <Form
        formData={formData}
        setFormData={setFormData}
        titleText={"Add new Lead"}
        buttonText={"Add Lead"}
        handleSubmit={handleAddLead}
      />
    </>
  );
}
