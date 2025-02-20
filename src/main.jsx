import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import ResponsiveDrawer from "./components/HeaderAndSidebar.jsx";
import Dashboard from "./Dashboard.jsx";
import AddNewLead from "./features/lead/AddNewLead.jsx";
import AddNewSalesAgent from "./features/salesAgent/AddNewSalesAgent.jsx";
import LeadByStatus from "./features/lead/LeadByStatus.jsx";
import LeadList from "./features/lead/LeadList.jsx";
import Reports from "./features/reports/Reports.jsx";
import SalesAgent from "./features/salesAgent/SalesAgent.jsx";
import SalesAgentView from "./features/salesAgent/SalesAgentView.jsx";

import { Provider } from "react-redux";

import store from "./app/store.js";
import LeadDetails from "./features/lead/LeadDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ResponsiveDrawer />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/add-new-lead",
        element: <AddNewLead />,
      },
      {
        path: "/add-new-sales-agent",
        element: <AddNewSalesAgent />,
      },
      {
        path: "/lead-by-status",
        element: <LeadByStatus />,
      },
      {
        path: "/lead-list/:lead-name/:leadID",
        element: <LeadDetails />,
      },
      {
        path: "/lead-list",
        element: <LeadList />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/sales-agent-list",
        element: <SalesAgent />,
      },
      {
        path: "/sales-agent-details/:salesAgentID",
        element: <SalesAgentView />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <Dashboard />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
