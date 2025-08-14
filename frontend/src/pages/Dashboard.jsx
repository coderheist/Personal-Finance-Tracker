import React, { useEffect, useState } from "react";
import axios from 'axios';
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Charts from "../components/Charts";
import Trends from "../components/Trends";
import { getTransactions, addTransaction } from "../services/api";

const Dashboard = ({ user, categories }) => {
  const handleAddTransaction = async (transaction) => {
    try {
      await addTransaction(transaction);
      fetchTransactions();
    } catch (err) {
      console.error("Error adding transaction:", err.message);
    }
  };
  const [transactions, setTransactions] = useState([]);
  const [budgetLimits, setBudgetLimits] = useState({});

  useEffect(() => {
    fetchTransactions();
    fetchBudgetLimits();
  }, []);

  const fetchBudgetLimits = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBudgetLimits(res.data.budgetLimits || {});
    } catch (err) {
      if (err.response) {
        console.error('Budget fetch error:', err.response.data?.message || `${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        console.error('Budget fetch error: No response from server.');
      } else {
        console.error(`Budget fetch error: ${err.message}`);
      }
      setBudgetLimits({});
    }
  };

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching transactions:", err.message);
    }
  };

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const dashboardCategories = categories || [];
  const categoryExpenses = dashboardCategories.reduce((acc, cat) => {
    acc[cat] = transactions.filter(t => t.type === 'expense' && t.category === cat && new Date(t.date).getMonth() === month && new Date(t.date).getFullYear() === year)
      .reduce((sum, t) => sum + t.amount, 0);
    return acc;
  }, {});

  const totalIncome = transactions
    .filter((t) => t?.type?.toLowerCase() === 'income')
    .reduce((acc, curr) => acc + (curr?.amount || 0), 0);

  const totalExpenses = transactions
    .filter((t) => t?.type?.toLowerCase() === 'expense')
    .reduce((acc, curr) => acc + (curr?.amount || 0), 0);

  // Monthly/Weekly summary
  const monthlyIncome = transactions
    .filter(t => t?.type?.toLowerCase() === 'income' && new Date(t.date).getMonth() === month && new Date(t.date).getFullYear() === year)
    .reduce((acc, curr) => acc + (curr?.amount || 0), 0);
  const monthlyExpenses = transactions
    .filter(t => t?.type?.toLowerCase() === 'expense' && new Date(t.date).getMonth() === month && new Date(t.date).getFullYear() === year)
    .reduce((acc, curr) => acc + (curr?.amount || 0), 0);

  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const weeklyIncome = transactions
    .filter(t => t?.type?.toLowerCase() === 'income' && new Date(t.date) >= weekStart && new Date(t.date) <= weekEnd)
    .reduce((acc, curr) => acc + (curr?.amount || 0), 0);
  const weeklyExpenses = transactions
    .filter(t => t?.type?.toLowerCase() === 'expense' && new Date(t.date) >= weekStart && new Date(t.date) <= weekEnd)
    .reduce((acc, curr) => acc + (curr?.amount || 0), 0);

  // Recent activity feed (last 5 transactions)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dashboard-container" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        💰 Personal Finance Tracker
      </h1>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <>
          <div>
            <h3>Total Income: ₹{totalIncome}</h3>
            <p>Monthly: ₹{monthlyIncome}</p>
            <p>Weekly: ₹{weeklyIncome}</p>
          </div>
          <div>
            <h3>Total Expenses: ₹{totalExpenses}</h3>
            <p>Monthly: ₹{monthlyExpenses}</p>
            <p>Weekly: ₹{weeklyExpenses}</p>
          </div>
        </>
      </div>
      {dashboardCategories.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h3>Budget Progress (This Month)</h3>
          {dashboardCategories.map(cat => (
            <div key={cat} style={{ marginBottom: 10 }}>
              <strong>{cat}</strong>: ₹{categoryExpenses[cat] || 0} / ₹{budgetLimits[cat]}
              <div style={{ background: '#eee', borderRadius: 4, height: 16, width: 300 }}>
                <div style={{ background: '#4caf50', height: '100%', borderRadius: 4, width: `${Math.min(100, ((categoryExpenses[cat] || 0) / budgetLimits[cat]) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginBottom: "20px" }}>
        <h3>Recent Activity</h3>
        <ul>
          {recentTransactions.map((t, idx) => (
            <li key={idx}>
              {t.type} - {t.description} - ₹{t.amount} ({new Date(t.date).toLocaleDateString()})
            </li>
          ))}
        </ul>
      </div>
      <TransactionForm onSubmit={handleAddTransaction} categories={dashboardCategories} />
      <h2 style={{ marginTop: "30px" }}>Category-wise Expense Chart</h2>
      <Charts transactions={transactions} />
      <Trends transactions={transactions} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default Dashboard;
