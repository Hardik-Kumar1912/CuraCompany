import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const DailySalesChart = ({ transactions }) => {
  const dailySales = transactions.reduce((acc, t) => {
    const rawDate = new Date(t.createdAt);
    if (isNaN(rawDate)) {
      console.warn("Invalid date skipped:", t.createdAt);
      return acc;
    }

    const date = rawDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const amount = parseFloat(t.price.replace(/[^\d.]/g, ""));
    acc[date] = (acc[date] || 0) + (isNaN(amount) ? 0 : amount);
    return acc;
  }, {});

  // Convert to array and sort by actual date objects
  const sortedEntries = Object.entries(dailySales).sort((a, b) => {
    const [dayA, monA, yearA] = a[0].split(" ");
    const [dayB, monB, yearB] = b[0].split(" ");
    return new Date(`${monA} ${dayA}, ${yearA}`) - new Date(`${monB} ${dayB}, ${yearB}`);
  });

  const dailyLabels = sortedEntries.map(([date]) => date);
  const dailyAmounts = sortedEntries.map(([_, amount]) => amount);

  const data = {
    labels: dailyLabels,
    datasets: [
      {
        label: "Daily Revenue (₹)",
        data: dailyAmounts,
        backgroundColor: "rgba(52, 152, 219, 0.7)", // strong blue
        borderColor: "rgba(41, 128, 185, 1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(41, 128, 185, 0.9)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
            weight: "500",
          },
        },
      },
      title: {
        display: true,
        text: "Daily Sales Overview",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.raw.toLocaleString("en-IN")}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#555",
          callback: (val) => `₹${val.toLocaleString("en-IN")}`,
          font: {
            size: 12,
          },
        },
      },
      x: {
        ticks: {
          color: "#555",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-xl font-semibold text-center mb-4">Sales Per Day</h2>
      <div className="relative" style={{ height: "360px", width: "100%" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DailySalesChart;
