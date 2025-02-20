import { configureStore } from "@reduxjs/toolkit";
import { leadSlice } from "../features/lead/leadSlice";
import { salesAgentSlice } from "../features/salesAgent/agentSlice";
import { reportSlice } from "../features/reports/reportSlice";

export default configureStore({
  reducer: {
    leads: leadSlice.reducer,
    salesAgent: salesAgentSlice.reducer,
    reports: reportSlice.reducer,
  },
});
