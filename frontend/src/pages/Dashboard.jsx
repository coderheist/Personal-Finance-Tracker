import React, { useEffect, useState } from "react";
// import axios from 'axios'; // Not used in this version
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Charts from "../components/Charts";
// import Trends from "../components/Trends"; // Temporarily commented out
import { getTransactions, addTransaction } from "../services/api";

const Dashboard = ({ user, categories }) => {
  const [transactions, setTransactions] = useState([]);
  // const [budgetLimits, setBudgetLimits] = useState({}); // Will implement later
  const [upcomingScheduled, setUpcomingScheduled] = useState([]);

  useEffect(() => {
    fetchTransactions();
    // fetchBudgetLimits(); // Will implement later
    fetchUpcomingScheduled();
  }, []);

  const fetchUpcomingScheduled = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/scheduled-transactions/upcoming`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUpcomingScheduled(data);
      }
    } catch (error) {
      console.error('Error fetching upcoming scheduled transactions:', error);
      setUpcomingScheduled([]);
    }
  };

  // const fetchBudgetLimits = async () => {
  //   try {
  //     const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/profile`, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  //     });
  //     setBudgetLimits(res.data.budgetLimits || {});
  //   } catch (err) {
  //     if (err.response) {
  //       console.error('Budget fetch error:', err.response.data?.message || `${err.response.status} ${err.response.statusText}`);
  //     } else if (err.request) {
  //       console.error('Budget fetch error: No response from server.');
  //     } else {
  //       console.error(`Budget fetch error: ${err.message}`);
  //     }
  //     setBudgetLimits({});
  //   }
  // };

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
  // const dashboardCategories = categories || [];
  // const categoryExpenses = dashboardCategories.reduce((acc, cat) => {
  //   acc[cat] = transactions.filter(t => t.type === 'expense' && t.category === cat && new Date(t.date).getMonth() === month && new Date(t.date).getFullYear() === year)
  //     .reduce((sum, t) => sum + t.amount, 0);
  //   return acc;
  // }, {}); // Will implement later

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

  // const weeklyIncome = transactions
  //   .filter(t => t?.type?.toLowerCase() === 'income' && new Date(t.date) >= weekStart && new Date(t.date) <= weekEnd)
  //   .reduce((acc, curr) => acc + (curr?.amount || 0), 0);
  // const weeklyExpenses = transactions
  //   .filter(t => t?.type?.toLowerCase() === 'expense' && new Date(t.date) >= weekStart && new Date(t.date) <= weekEnd)
  //   .reduce((acc, curr) => acc + (curr?.amount || 0), 0); // Will implement later

  // Recent activity feed (last 5 transactions)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const handleAddTransaction = async (transaction) => {
    try {
      await addTransaction(transaction);
      fetchTransactions();
    } catch (err) {
      console.error("Error adding transaction:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Manage your finances with precision and insight</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Income</p>
                <p className="text-3xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-2xl">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Expenses</p>
                <p className="text-3xl font-bold text-red-600">₹{totalExpenses.toLocaleString()}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-2xl">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Monthly Income</p>
                <p className="text-3xl font-bold text-blue-600">₹{monthlyIncome.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-2xl">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Monthly Expenses</p>
                <p className="text-3xl font-bold text-orange-600">₹{monthlyExpenses.toLocaleString()}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-2xl">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Transaction
              </h2>
              <TransactionForm onSubmit={handleAddTransaction} categories={categories} />
            </div>
          </div>

          {/* Charts & Analytics */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                Expense Analytics
              </h2>
              <Charts transactions={transactions} />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentTransactions.map((transaction, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-4 ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div>
                        <p className="font-semibold text-gray-800">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Scheduled Transactions */}
        {upcomingScheduled.length > 0 && (
          <div className="mt-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Upcoming Scheduled Transactions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingScheduled.map((scheduled, idx) => {
                  const daysUntil = Math.ceil((new Date(scheduled.scheduledDate) - new Date()) / (1000 * 60 * 60 * 24));
                  const isToday = daysUntil === 0;
                  const isSoon = daysUntil <= 3;
                  
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                        isToday 
                          ? 'border-orange-200 bg-orange-50' 
                          : isSoon 
                          ? 'border-yellow-200 bg-yellow-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          scheduled.type === 'income' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {scheduled.type.charAt(0).toUpperCase() + scheduled.type.slice(1)}
                        </span>
                        <span className={`text-sm font-semibold ${
                          isToday ? 'text-orange-600' : isSoon ? 'text-yellow-600' : 'text-gray-600'
                        }`}>
                          {isToday ? 'Due today' : `${daysUntil} days`}
                        </span>
                      </div>
                      <p className="font-bold text-lg text-gray-800 mb-1">
                        ₹{scheduled.amount.toLocaleString()}
                      </p>
                      <p className="text-gray-700 text-sm mb-1">{scheduled.description}</p>
                      <p className="text-gray-500 text-xs">{scheduled.category}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Transaction List */}
        <div className="mt-12">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100">
            <TransactionList transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
