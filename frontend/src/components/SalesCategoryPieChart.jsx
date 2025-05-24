import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const SalesCategoryPieChart = ({ transactions }) => {
  const categorySales = transactions.reduce((acc, t) => {
    const category = t.category?.toLowerCase();
    const amount = parseFloat(t.price.replace(/[^\d.]/g, ""));

    if (!category || isNaN(amount)) return acc;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const labels = Object.keys(categorySales);
  const values = Object.values(categorySales);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Sales (₹)",
        data: values,
        backgroundColor: [
          "#1f77b4", // blue
          "#ff7f0e", // orange
          "#2ca02c", // green
          "#d62728", // red
          "#9467bd", // purple
          "#8c564b", // brown
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333",
          padding: 16,
          font: {
            size: 14,
            weight: "500",
          },
        },
      },
      title: {
        display: true,
        text: "Sales Distribution by Category",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-center mb-4">Sales by Category</h2>
      <div className="relative" style={{ height: "360px", width: "100%" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesCategoryPieChart;
