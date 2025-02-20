import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchSalesAgent = createAsyncThunk(
  "salesAgent/fetchSalesAgent",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/salesAgent`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
);

export const postSalesAgent = createAsyncThunk(
  "salesAgent/postSalesAgent",
  async (salesAgentData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/salesAgent`,
        salesAgentData
      );
      return response.data;
    } catch (error) {
      console.error("Post Error: ", error);
      throw error;
    }
  }
);

export const salesAgentSlice = createSlice({
  name: "salesAgent",
  initialState: {
    salesAgent: [],
    status: {
      fetchSalesAgentStatus: "idle",
      postSalesAgentStatus: "idle",
    },
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesAgent.pending, (state) => {
        state.status.fetchSalesAgentStatus = "loading";
      })
      .addCase(fetchSalesAgent.fulfilled, (state, action) => {
        state.status.fetchSalesAgentStatus = "success";
        state.salesAgent = action.payload;
      })
      .addCase(fetchSalesAgent.rejected, (state, action) => {
        state.status.fetchSalesAgentStatus = "error";
        state.error = action.error.message;
      })
      .addCase(postSalesAgent.pending, (state) => {
        state.status.postSalesAgentStatus = "loading";
      })
      .addCase(postSalesAgent.fulfilled, (state, action) => {
        state.status.postSalesAgentStatus = "success";
        state.salesAgent.push(action.payload);
        state.error = null;
      })
      .addCase(postSalesAgent.rejected, (state, action) => {
        state.status.postSalesAgentStatus = "error";
        state.error = action.error.message;
      });
  },
});

export const selectAllSalesAgents = (state) => state.salesAgent.salesAgent;
export const selectSalesAgentStatuses = (state) => state.salesAgent.status;

export default salesAgentSlice.reducer;
