import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLeads, fetchLeads } from "../lead/leadSlice";
import { getPipelineReport, selectPipelineReport } from "./reportSlice";
import {
  fetchSalesAgent,
  selectAllSalesAgents,
} from "../salesAgent/agentSlice";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import useSalesAgent from "../../hooks/useSalesAgent";
import useLeads from "../../hooks/useLeads";
import LeadsByStatus from "./LeadsByStatus";
import LeadsClosedByAgents from "./LeadsClosedByAgents";

ChartJS.register(
  ArcElement,
  Legend,
  Title,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function LeadsClosedReport({ leads = [], pipelineReport }) {
  const closedLeads = leads.filter((lead) => lead.status === "Closed");

  const chartData = {
    labels: ["Total Leads Pipeline", "Total Leads closed"],
    datasets: [
      {
        label: "Leads Overview",
        data: [pipelineReport?.totalLeadsInPipeline || 0, closedLeads.length],
        backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(54, 162, 235, 0.5)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Total Leads Closed Report",
      },
    },
  };

  return (
    <div className="col-md-12 my-4">
      <div className="card bg-light text-dark p-3 border-0 shadow">
        <h3 className="card-title text-center">
          Total Leads closed and Leads in Pipeline:
        </h3>
        <div style={{ position: "relative", height: "350px" }}>
          <Pie data={chartData} options={chartOptions} className="w-100 m-1" />
        </div>
      </div>
    </div>
  );
}
