import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLeads, fetchLeads } from "../lead/leadSlice";
import { getPipelineReport, selectPipelineReport } from './reportSlice';
import { fetchSalesAgent, selectAllSalesAgents } from "../salesAgent/agentSlice";
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

ChartJS.register(
  ArcElement,
  Legend,
  Title,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement
);

const LeadsByStatus = ({ leads = [] }) => {
  const leadsStatus = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];
  
  const leadsCount = leadsStatus.map(
    (status) => leads.filter((lead) => lead.status === status).length
  );

  const chartData = {
    labels: leadsStatus,
    datasets: [{
      label: "Leads Overview",
      data: leadsCount,
      backgroundColor: [
        "rgba(75, 192, 192, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 99, 132, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(153, 102, 255, 0.5)",
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Total Leads Per Status Report",
      },
    },
  };

  return (
    <div className="col-md-12 mb-4">
      <div className="card bg-light text-dark p-3 border-0 shadow">
        <h3 className="card-title text-center">Leads Per Status:</h3>
        <div style={{ position: "relative", height: "350px" }}>
          <Pie data={chartData} options={chartOptions} className="w-100 m-1" />
        </div>
      </div>
    </div>
  );
};

const LeadsClosedByAgents = ({ leads = [], salesAgents = [] }) => {
  const leadsByAgentsArray = salesAgents.map((agent) => ({
    agentName: agent.name,
    leadCount: leads.filter(
      (lead) => lead.salesAgent?._id === agent._id && lead.status === "Closed"
    ).length,
  }));

  const agentNames = [
    ...leadsByAgentsArray.map((item) => item.agentName),
    "Total closed leads",
  ];

  const leadCounts = [
    ...leadsByAgentsArray.map((item) => item.leadCount),
    leads.filter((lead) => lead.status === "Closed").length,
  ];

  const chartData = {
    labels: agentNames,
    datasets: [{
      label: "Leads Overview",
      data: leadCounts,
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    }],
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
    <div className="col-md-12 mb-4">
      <div className="card bg-light text-dark p-3 border-0 shadow">
        <h3 className="card-title text-center">Leads Closed by Sales Agent:</h3>
        <div style={{ position: "relative", height: "350px" }}>
          <Bar data={chartData} options={chartOptions} className="mx-auto w-100 py-3" />
        </div>
      </div>
    </div>
  );
};

const LeadsClosedReport = ({ leads = [], pipelineReport }) => {
  const closedLeads = leads.filter((lead) => lead.status === "Closed");

  const chartData = {
    labels: ["Total Leads Pipeline", "Total Leads closed"],
    datasets: [{
      label: "Leads Overview",
      data: [pipelineReport?.totalLeadsInPipeline || 0, closedLeads.length],
      backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(54, 162, 235, 0.5)"],
      borderColor: ["rgba(75, 192, 192, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    }],
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
};

export default function Reports() {
  const dispatch = useDispatch();
  const leads = useSelector(selectLeads) || [];
  const salesAgents = useSelector(selectAllSalesAgents) || [];
  const pipelineReport = useSelector(selectPipelineReport);

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(getPipelineReport());
    dispatch(fetchSalesAgent());
  }, [dispatch]);

  return (
    <div className="container-fluid py-4">
      <h1 className="h3 mb-4">Reports Dashboard</h1>
      <div className="row">
        <LeadsByStatus leads={leads} />
        <LeadsClosedByAgents leads={leads} salesAgents={salesAgents} />
        <LeadsClosedReport leads={leads} pipelineReport={pipelineReport} />
      </div>
    </div>
  );
}