import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchLeads = createAsyncThunk("leads/fetchLeads", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/leads`);
    return response.data;
  } catch (error) {
    console.error("Fetch Error: ", error);
    throw error;
  }
});

export const fetchLeadById = createAsyncThunk(
  "leads/fetchLeadById",
  async (leadID) => {
    try {
      const response = await axios.get(`${BASE_URL}/lead/${leadID}`);
      return response.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
);

export const postLead = createAsyncThunk("leads/postLead", async (formdata) => {
  try {
    const response = await axios.post(`${BASE_URL}/leads`, formdata);
    return response.data;
  } catch (error) {
    console.error("Post Error: ", error);
    throw error;
  }
});

export const editLead = createAsyncThunk(
  "leads/editLead",
  async ({ leadID, editedLeadData }) => {
    try {
      const response = await axios.put(`${BASE_URL}/leads/${leadID}`, editedLeadData);
    console.log("Response data: ", editedLeadData)
      return response.data;
    } catch (error) {
      console.error("Put Error: ", error);
      throw error;
    }
  }
);

export const deleteLead = createAsyncThunk("leads/deleteLead", async (id) => {
  try {
    await axios.delete(`${BASE_URL}/leads/${id}`);
    return { id };
  } catch (error) {
    console.error("Delete Error: ", error);
    throw error;
  }
});

export const fetchComments = createAsyncThunk(
  "leads/getComments",
  async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/leads/${id}/comments`);
      return response.data;
    } catch (error) {
      console.error("Get Comment Error: ", error);
      throw error;
    }
  }
);

export const postComment = createAsyncThunk(
  "leads/postComment",
  async ({ id, comment }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/leads/${id}/comments`,
        comment
      );
      return response.data;
    } catch (error) {
      console.error("Post Comment Error: ", error);
      throw error;
    }
  }
);

export const leadSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    selectedLead: null,
    comments: [],
    filters: {
      status: "All",
      agent: "All",
      priority: "All",
      prioritySort: "",
      timeRange: [0, 200],
    },
    status: {
      fetchLeadStatus: "idle",
      fetchLeadByIdStatus: "idle",
      postLeadStatus: "idle",
      editLeadStatus: "idle",
      deleteLeadStatus: "idle",
      fetchCommentStatus: "idle",
      postCommentStatus: "idle",
    },
    error: null,
  },
  reducers: {
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
    },
    setAgentFilter: (state, action) => {
      state.filters.agent = action.payload;
    },
    setPriorityFilter: (state, action) => {
      state.filters.priority = action.payload;
    },
    setPrioritySort: (state, action) => {
      state.filters.prioritySort = action.payload;
    },
    setTimeRange: (state, action) => {
      state.filters.timeRange = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        status: "All",
        agent: "All",
        priority: "All",
        prioritySort: "",
        timeRange: [0, 200],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.status.fetchLeadStatus = "loading";
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.status.fetchLeadStatus = "success";
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status.fetchLeadStatus = "error";
        state.error = action.error.message;
      })
      .addCase(fetchLeadById.pending, (state) => {
        state.status.fetchLeadByIdStatus = "loading";
      })
      .addCase(fetchLeadById.fulfilled, (state, action) => {
        state.status.fetchLeadByIdStatus = "success";
        state.selectedLead = action.payload;
      })
      .addCase(fetchLeadById.rejected, (state, action) => {
        state.status.fetchLeadByIdStatus = "error";
        state.error = action.error.message;
      })
      .addCase(postLead.pending, (state) => {
        state.status.postLeadStatus = "loading";
      })
      .addCase(postLead.fulfilled, (state, action) => {
        state.status.postLeadStatus = "success";
        state.leads.push(action.payload);
        state.error = null;
      })
      .addCase(postLead.rejected, (state, action) => {
        state.status.postLeadStatus = "error";
        state.error = action.error.message;
      })
      .addCase(editLead.pending, (state) => {
        state.status.editLeadStatus = "loading";
      })
      .addCase(editLead.fulfilled, (state, action) => {
        state.status.editLeadStatus = "success";
        const index = state.leads.findIndex(
          (lead) => lead._id === action.payload._id
        );
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
        if (state.selectedLead?._id === action.payload._id) {
          state.selectedLead = action.payload;
        }
        state.error = null;
      })
      .addCase(editLead.rejected, (state, action) => {
        state.status.editLeadStatus = "error";
        state.error = action.error.message;
      })
      .addCase(deleteLead.pending, (state) => {
        state.status.deleteLeadStatus = "loading";
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.status.deleteLeadStatus = "success";
        state.leads = state.leads.filter(
          (lead) => lead._id !== action.payload.id
        );
        state.error = null;
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.status.deleteLeadStatus = "error";
        state.error = action.error.message;
      })
      .addCase(fetchComments.pending, (state) => {
        state.status.fetchCommentStatus = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status.fetchCommentStatus = "success";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status.fetchCommentStatus = "error";
        state.error = action.error.message;
      })
      .addCase(postComment.pending, (state) => {
        state.status.postCommentStatus = "loading";
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.status.postCommentStatus = "success";
        state.error = null;
      })
      .addCase(postComment.rejected, (state, action) => {
        state.status.postCommentStatus = "error";
        state.error = action.error.message;
      });
  },
});

export const selectLeads = (state) => state.leads.leads;
export const selectLeadById = (state) => state.leads.selectedLead;
export const selectLeadStatuses = (state) => state.leads.status;
export const selectComments = (state) => state.leads.comments;
export const selectFilters = (state) => state.leads.filters;

export const selectFilteredLeads = createSelector(
  [selectLeads, selectFilters],
  (leads, filters) => {
    if (!leads) return [];

    let result = leads.filter((lead) => {
      const statusMatch =
        filters.status === "All" || lead.status === filters.status;
      const agentMatch =
        filters.agent === "All" || lead.salesAgent.name === filters.agent;
      const priorityMatch =
        filters.priority === "All" || lead.priority === filters.priority;
      const timeMatch =
        lead.timeToClose >= filters.timeRange[0] &&
        lead.timeToClose <= filters.timeRange[1];

      return statusMatch && agentMatch && priorityMatch && timeMatch;
    });

    if (filters.prioritySort) {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      result = [...result].sort((a, b) => {
        if (filters.prioritySort === "highToLow") {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        } else {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
      });
    }

    return result;
  }
);

export const {
  setStatusFilter,
  setAgentFilter,
  setPriorityFilter,
  setPrioritySort,
  setTimeRange,
  resetFilters,
} = leadSlice.actions;

export default leadSlice.reducer;
