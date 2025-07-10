import React, { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Charts from "../components/Charts";
import { getTransactions, addTransaction } from "../services/api";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching transactions:", err.message);
    }
  };

  const handleAddTransaction = async (newTransaction) => {
    try {
      const data = await addTransaction(newTransaction);
      setTransactions((prev) => [...prev, data]);
    } catch (err) {
      console.error("Error adding transaction:", err.message);
    }
  };

  const totalIncome = transactions
  .filter((t) => t?.type?.toLowerCase() === 'income')
  .reduce((acc, curr) => acc + (curr?.amount || 0), 0);

const totalExpenses = transactions
  .filter((t) => t?.type?.toLowerCase() === 'expense')
  .reduce((acc, curr) => acc + (curr?.amount || 0), 0);

  return (
    <div className="dashboard-container" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        💰 Personal Finance Tracker
      </h1>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <h3>Total Income: ₹{totalIncome}</h3>
        </div>
        <div>
          <h3>Total Expenses: ₹{totalExpenses}</h3>
        </div>
      </div>

      <TransactionForm onSubmit={handleAddTransaction} />

      <h2 style={{ marginTop: "30px" }}>Category-wise Expense Chart</h2>
      <Charts transactions={transactions} />

      <TransactionList transactions={transactions} />
    </div>
  );
};

export default Dashboard;
