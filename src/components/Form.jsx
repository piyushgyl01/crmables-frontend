import useFetch from "../useFetch";
import { useState } from "react";

export default function Form({ titleText, buttonText, handleSubmit, formData, setFormData }) {
  //STATES

  //SALES AGENT DATA FETCH
  const {
    data: salesAgent,
    loading: salesAgentLoading,
    error: salesAgentError,
  } = useFetch("https://crmables-backend.vercel.app/salesAgent");

  //OPTIONS ARRAYS
  const sources = [
    "Website",
    "Referral",
    "Cold Call",
    "Advertisement",
    "Email",
    "Other",
  ];
  const statusOptions = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];
  const priorityOptions = ["High", "Medium", "Low"];

  return (
    <>
      <main className="container my-5">
        <h1>{titleText}</h1>

        <div className="mb-3">
          <label htmlFor="leadNameInput" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="leadNameInput"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="leadSourceSelect" className="form-label">
            Source:
          </label>
          <select
            id="leadSourceSelect"
            className="form-select"
            value={formData.source}
            onChange={(e) =>
              setFormData({ ...formData, source: e.target.value })
            }
          >
            <>
              <option value="">Select Source</option>
              {sources.map((source) => (
                <option value={source}>{source}</option>
              ))}
            </>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="salesAgentSelect" className="form-label">
            Sales Agent:
          </label>
          <select
            id="salesAgentSelect"
            className="form-select"
            value={formData.salesAgent}
            onChange={(e) =>
              setFormData({ ...formData, salesAgent: e.target.value })
            }
          >
            <>
              <option value="">Select Sales Agent</option>
              {salesAgent?.map((agent) => (
                <option value={agent._id}>{agent.name}</option>
              ))}
            </>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="leadStatusSelect" className="form-label">
            Status:
          </label>
          <select
            id="leadStatusSelect"
            className="form-select"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <>
              <option value="">Select status</option>
              {statusOptions?.map((status) => (
                <option value={status}>{status}</option>
              ))}
            </>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="tagsInputField" className="form-label">
            Tags:
          </label>
          <input
            type="text"
            id="tagsInputField"
            className="form-control"
            value={formData.tags}
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prioritySelect" className="form-label">
            Priority:
          </label>
          <select
            id="prioritySelect"
            className="form-select"
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
          >
            <>
              <option value="">Select priority</option>
              {priorityOptions?.map((priority) => (
                <option value={priority}>{priority}</option>
              ))}
            </>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="timeToCloseInput" className="form-label">
            Time to Close:
          </label>
          <input
            type="number"
            id="timeToCloseInput"
            className="form-control"
            min="1"
            value={formData.timeToClose}
            onChange={(e) =>
              setFormData({ ...formData, timeToClose: parseInt(e.target.value) })
            }
          />
        </div>
        <button
          className="btn btn-primary mt-2"
          onClick={() => handleSubmit(formData)}
        >
          {buttonText}
        </button>
      </main>
    </>
  );
}
