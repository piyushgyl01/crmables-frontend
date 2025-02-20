import useAgentStatuses from "../../hooks/useAgentStatuses";
import useHandlers from "./hooks/useHandlers";

export default function AddNewSalesAgent() {
  const { postSalesAgentStatus } = useAgentStatuses();
  const { handleAddSalesAgent, salesAgentData, setSalesAgentData } =
    useHandlers();

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white py-3">
        <h2 className="h5 mb-0 text-primary">Add New Sales Agent</h2>
      </div>
      <div className="card-body p-4">
        <div className="mb-4">
          <h6 className="text-muted text-uppercase small mb-3">
            Agent Information
          </h6>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="nameField"
                  placeholder="Enter name"
                  value={salesAgentData.name}
                  onChange={(e) =>
                    setSalesAgentData({
                      ...salesAgentData,
                      name: e.target.value,
                    })
                  }
                  required
                />
                <label htmlFor="nameField">Sales Agent's Name</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="emailField"
                  placeholder="Enter email"
                  value={salesAgentData.email}
                  onChange={(e) =>
                    setSalesAgentData({
                      ...salesAgentData,
                      email: e.target.value,
                    })
                  }
                  required
                />
                <label htmlFor="emailField">Sales Agent's Email</label>
              </div>
            </div>
          </div>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
          <button
            className="btn btn-primary px-4"
            onClick={handleAddSalesAgent}
            disabled={postSalesAgentStatus === "loading"}
            type="button"
          >
            {postSalesAgentStatus === "loading" ? "Adding" : "Add Agent"}
          </button>
        </div>
      </div>
    </div>
  );
}
