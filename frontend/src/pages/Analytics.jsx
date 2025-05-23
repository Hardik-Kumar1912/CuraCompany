import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

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

  if (loading) return <p style={{ padding: "2rem" }}>Loading analytics...</p>;
  if (error) return <p style={{ color: "red", padding: "2rem" }}>{error}</p>;

  return (
    <>  

    <button
            onClick={() => navigate("/")}
            className="fixed top-4 left-4 z-50 flex items-center p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
          >
            <MdArrowBack className="w-6 h-6 text-white" />
          </button>

        <div style={styles.container} className="bg-transparent">
      <h1 style={styles.title}>Analytics Dashboard</h1>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2>Total Transactions</h2>
          <p style={styles.value}>{totalTransactions}</p>
        </div>
        <div style={styles.card}>
          <h2>Total Revenue</h2>
          <p style={styles.value}>₹{totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2>Top 5 Ordered Tests</h2>
        <ul style={styles.list}>
          {topTests.map(([testName, count]) => (
            <li key={testName} style={styles.listItem}>
              <span>{testName}</span>
              <span>{count} orders</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    textAlign: "center",
  },
  cardContainer: {
    display: "flex",
    gap: "2rem",
    justifyContent: "center",
    marginBottom: "3rem",
  },
  card: {
    background: "#ffffff",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    minWidth: "200px",
  },
  value: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#1e3a8a", // Tailwind blue-900
  },
  section: {
    background: "#ffffff",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "1rem",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 0",
    borderBottom: "1px solid #eee",
  },
};

export default AnalyticsPage;
