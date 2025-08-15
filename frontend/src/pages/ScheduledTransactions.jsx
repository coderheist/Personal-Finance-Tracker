import React, { useState, useEffect } from 'react';

const ScheduledTransactions = ({ token, categories }) => {
  const [scheduledTransactions, setScheduledTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    description: '',
    category: '',
    scheduledDate: '',
    recurrence: 'none'
  });

  useEffect(() => {
    fetchScheduledTransactions();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchScheduledTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/scheduled-transactions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setScheduledTransactions(data);
      } else {
        setMessage('Failed to fetch scheduled transactions');
      }
    } catch (error) {
      setMessage('Error fetching scheduled transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = editingTransaction 
        ? `${process.env.REACT_APP_API_BASE_URL}/scheduled-transactions/${editingTransaction._id}`
        : `${process.env.REACT_APP_API_BASE_URL}/scheduled-transactions`;
      
      const method = editingTransaction ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Scheduled transaction ${editingTransaction ? 'updated' : 'created'} successfully!`);
        resetForm();
        fetchScheduledTransactions();
      } else {
        setMessage(data.message || 'Failed to save scheduled transaction');
      }
    } catch (error) {
      setMessage('Error saving scheduled transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      type: transaction.type,
      amount: transaction.amount.toString(),
      description: transaction.description,
      category: transaction.category,
      scheduledDate: new Date(transaction.scheduledDate).toISOString().split('T')[0],
      recurrence: transaction.recurrence
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this scheduled transaction?')) return;

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/scheduled-transactions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setMessage('Scheduled transaction deleted successfully!');
        fetchScheduledTransactions();
      } else {
        setMessage('Failed to delete scheduled transaction');
      }
    } catch (error) {
      setMessage('Error deleting scheduled transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleExecute = async (id) => {
    if (!window.confirm('Are you sure you want to execute this scheduled transaction now?')) return;

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/scheduled-transactions/${id}/execute`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Scheduled transaction executed successfully!');
        fetchScheduledTransactions();
      } else {
        setMessage(data.message || 'Failed to execute scheduled transaction');
      }
    } catch (error) {
      setMessage('Error executing scheduled transaction');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'expense',
      amount: '',
      description: '',
      category: '',
      scheduledDate: '',
      recurrence: 'none'
    });
    setEditingTransaction(null);
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const scheduledDate = new Date(dateString);
    const diffTime = scheduledDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Scheduled Transactions
          </h1>
          <p className="text-gray-600 text-lg">Plan your future income and expenses</p>
        </div>

        {/* Add New Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            {showForm ? 'Cancel' : '+ Schedule New Transaction'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingTransaction ? 'Edit Scheduled Transaction' : 'Create Scheduled Transaction'}
            </h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                  required
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg font-medium bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Scheduled Date</label>
                <input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={e => setFormData({...formData, scheduledDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Recurrence</label>
                <select
                  value={formData.recurrence}
                  onChange={e => setFormData({...formData, recurrence: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                >
                  <option value="none">One Time</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div className="md:col-span-2 flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-lg disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingTransaction ? 'Update Transaction' : 'Schedule Transaction')}
                </button>
                {editingTransaction && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Scheduled Transactions List */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Scheduled Transactions</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading...</p>
            </div>
          ) : scheduledTransactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No scheduled transactions yet</p>
              <p className="text-gray-400 text-sm mt-2">Click "Schedule New Transaction" to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {scheduledTransactions.map((transaction) => {
                const daysUntil = getDaysUntil(transaction.scheduledDate);
                const isOverdue = daysUntil < 0;
                const isToday = daysUntil === 0;
                const isSoon = daysUntil <= 3 && daysUntil > 0;
                
                return (
                  <div
                    key={transaction._id}
                    className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                      isOverdue 
                        ? 'border-red-200 bg-red-50' 
                        : isToday 
                        ? 'border-orange-200 bg-orange-50' 
                        : isSoon 
                        ? 'border-yellow-200 bg-yellow-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            transaction.type === 'income' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                          </span>
                          <span className="text-2xl font-bold text-gray-800">
                            ₹{transaction.amount.toLocaleString()}
                          </span>
                          {transaction.recurrence !== 'none' && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              {transaction.recurrence}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 font-medium mb-1">{transaction.description}</p>
                        <p className="text-gray-500 text-sm mb-2">Category: {transaction.category}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-gray-600">
                            Scheduled: {formatDate(transaction.scheduledDate)}
                          </span>
                          <span className={`font-semibold ${
                            isOverdue 
                              ? 'text-red-600' 
                              : isToday 
                              ? 'text-orange-600' 
                              : isSoon 
                              ? 'text-yellow-600' 
                              : 'text-gray-600'
                          }`}>
                            {isOverdue 
                              ? `${Math.abs(daysUntil)} days overdue` 
                              : isToday 
                              ? 'Due today' 
                              : `${daysUntil} days remaining`}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleExecute(transaction._id)}
                          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                          Execute Now
                        </button>
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(transaction._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {message && (
          <div className={`mt-6 px-6 py-4 rounded-2xl ${
            message.includes('Failed') || message.includes('Error')
              ? 'bg-red-100 border border-red-400 text-red-700' 
              : 'bg-green-100 border border-green-400 text-green-700'
          }`}>
            <div className="flex items-center">
              {message.includes('Failed') || message.includes('Error') ? (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledTransactions;
