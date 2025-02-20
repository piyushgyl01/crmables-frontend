import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getLastWeekReport = createAsyncThunk(
  "reports/getLastWeekReport",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/report/last-week`);
      return response.data;
    } catch (error) {
      console.error("Fetch error", error);
      throw error;
    }
  }
);

export const getPipelineReport = createAsyncThunk(
  "reports/getPipelineReport",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/report/pipeline`);
      return response.data;
    } catch (error) {
      console.error("Fetch error", error);
      throw error;
    }
  }
);

export const reportSlice = createSlice({
  name: "reports",
  initialState: {
    lastWeekReport: [],
    pipelineReport: null,
    status: {
      lastWeekReportStatus: "idle",
      pipelineReportStatus: "idle",
    },
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLastWeekReport.pending, (state) => {
        state.status.lastWeekReportStatus = "loading";
      })
      .addCase(getLastWeekReport.fulfilled, (state, action) => {
        state.status.lastWeekReportStatus = "success";
        state.lastWeekReport = action.payload;
      })
      .addCase(getLastWeekReport.rejected, (state, action) => {
        state.status.lastWeekReportStatus = "error";
        state.error = action.error.message;
      })
      .addCase(getPipelineReport.pending, (state) => {
        state.status.pipelineReportStatus = "loading";
      })
      .addCase(getPipelineReport.fulfilled, (state, action) => {
        state.status.pipelineReportStatus = "success";
        state.pipelineReport = action.payload;
      })
      .addCase(getPipelineReport.rejected, (state, action) => {
        state.status.pipelineReportStatus = "error";
        state.error = action.error.message;
      });
  },
});

export const selectLastWeekReport = (state) => state.reports.lastWeekReport;
export const selectPipelineReport = (state) => state.reports.pipelineReport;
export const selectReportStatuses = (state) => state.reports.status;

export default reportSlice.reducer;
