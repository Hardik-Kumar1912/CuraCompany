import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import DailySalesChart from "../components/DailySalesChart";
import SalesCategoryPieChart from "../components/SalesCategoryPieChart";

const AnalyticsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const companyUser = JSON.parse(localStorage.getItem("medi-companyUser"));
  const companyId = companyUser ? companyUser._id : null;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`/api/transactions?companyId=${companyId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Something went wrong");
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [companyId]);

  const totalTransactions = transactions.length;
  const totalRevenue = transactions.reduce((sum, t) => {
    const amount = parseFloat(t.price.replace(/[^\d.]/g, ""));
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const testFrequency = transactions.reduce((acc, t) => {
    acc[t.testName] = (acc[t.testName] || 0) + 1;
    return acc;
  }, {});

  const topTests = Object.entries(testFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (loading) return <p className="p-8 text-center text-gray-700">Loading analytics...</p>;
  if (error) return <p className="p-8 text-center text-red-600">{error}</p>;

  return (
    <>
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 z-50 flex items-center p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
      >
        <MdArrowBack className="w-6 h-6 text-white" />
      </button>

      <div className="min-h-screen p-6 md:p-10 bg-transparent text-gray-900 font-sans">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">Analytics Dashboard</h1>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Total Transactions</h2>
            <p className="text-2xl font-bold text-blue-900">{totalTransactions}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Total Revenue</h2>
            <p className="text-2xl font-bold text-green-800">₹{totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        {/* Top Tests */}
        <div className="max-w-3xl mx-auto mb-10 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Top 5 Ordered Tests</h2>
          <ul className="divide-y divide-gray-200">
            {topTests.map(([testName, count]) => (
              <li
                key={testName}
                className="flex justify-between py-2 text-sm md:text-base text-gray-800"
              >
                <span>{testName}</span>
                <span className="font-medium">{count} orders</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <DailySalesChart transactions={transactions} />
          <SalesCategoryPieChart transactions={transactions} />
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
