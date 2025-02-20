import { useState, useEffect } from "react";
import useSelectOptions from "../hooks/useSelectOptions";
import useSalesAgent from "../hooks/useSalesAgent";

function Form({ lead, onSave, type = "edit" }) {
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: [],
    timeToClose: 0,
    priority: "",
  });
  const { statusOptions, priorityOptions, sources } = useSelectOptions();

  const salesAgent = useSalesAgent()

  useEffect(() => {
    if (type === "edit" && lead) {
      setFormData({
        name: lead?.name || "",
        source: lead?.source || "",
        salesAgent: lead?.salesAgent?._id || "",
        status: lead?.status || "",
        tags: lead?.tags || [],
        timeToClose: lead?.timeToClose || 0,
        priority: lead?.priority || "",
      });
    }
  }, [lead, type]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "tagsField") {
      setFormData({
        ...formData,
        tags: value.split(",").map((tag) => tag.trim()),
      });
    } else if (name === "timeToClose") {
      setFormData({ ...formData, [name]: parseFloat(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h2 className="h5 mb-0 text-primary">
            {type === "edit" ? `Edit ${lead?.name}` : "Add New Lead"}
          </h2>
        </div>
        <div className="card-body p-4">
          {/* Basic Information Section */}
          <div className="mb-4">
            <h6 className="text-muted text-uppercase small mb-3">
              Basic Information
            </h6>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    id="name"
                    placeholder="Enter name"
                    required
                  />
                  <label htmlFor="name">Lead Name</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="salesAgent"
                    value={formData.salesAgent}
                    onChange={handleInputChange}
                    id="salesAgent"
                    required
                  >
                    <option value="">Select Sales Agent</option>
                    {salesAgent?.map((agent) => (
                      <option value={agent._id} key={agent._id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="salesAgent">Sales Agent</label>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Details Section */}
          <div className="mb-4">
            <h6 className="text-muted text-uppercase small mb-3">
              Lead Details
            </h6>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    id="source"
                    required
                  >
                    <option value="">Select Source</option>
                    {sources.map((source) => (
                      <option value={source} key={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="source">Source</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    id="status"
                    required
                  >
                    <option value="">Select Status</option>
                    {statusOptions.map((sts) => (
                      <option value={sts} key={sts}>
                        {sts}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="status">Status</label>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mb-4">
            <h6 className="text-muted text-uppercase small mb-3">
              Additional Information
            </h6>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    className="form-control"
                    name="timeToClose"
                    value={formData.timeToClose}
                    onChange={handleInputChange}
                    type="number"
                    id="timeToClose"
                    min="0"
                    placeholder="Enter time to close"
                    required
                  />
                  <label htmlFor="timeToClose">Time to Close (hours)</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    id="priority"
                    required
                  >
                    <option value="">Select Priority</option>
                    {priorityOptions.map((prior) => (
                      <option value={prior} key={prior}>
                        {prior}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="priority">Priority</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <input
                    className="form-control"
                    name="tagsField"
                    value={formData.tags.join(",")}
                    onChange={handleInputChange}
                    type="text"
                    id="tagsField"
                    placeholder="Enter tags"
                  />
                  <label htmlFor="tagsField">Tags</label>
                  <small className="form-text text-muted mt-1 d-block">
                    Separate tags with commas (e.g., "urgent, follow-up,
                    new-client")
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
            <button
              className="btn btn-secondary me-md-2"
              type="button"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary px-4"
              onClick={() => onSave(formData)}
              type="button"
            >
              {type === "edit" ? "Save Changes" : "Add Lead"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
