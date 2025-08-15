import React from "react";

const TransactionList = ({ transactions }) => {
  const [typeFilter, setTypeFilter] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [search, setSearch] = React.useState('');

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg">No transactions available</p>
      </div>
    );
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this transaction?')) {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/transactions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      window.location.reload();
    }
  };

  const filtered = transactions.filter(t =>
    (!typeFilter || t.type === typeFilter) &&
    (!categoryFilter || t.category === categoryFilter) &&
    (!search || t.description.toLowerCase().includes(search.toLowerCase()))
  );

  // Edit logic can be expanded (modal, inline, etc.)
  return (
    <div style={{ marginTop: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>💳 Recent Transactions</h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
          <option value="shopping">Shopping</option>
          <option value="bills">Bills</option>
          <option value="other">Other</option>
        </select>
        <input type="text" placeholder="Search description" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {filtered.map((t, index) => (
          t && t.type ? (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: t.type === "income" ? "#e6ffe6" : "#ffe6e6",
                borderLeft: `6px solid ${t.type === "income" ? "#4caf50" : "#f44336"}`,
                padding: "12px 16px",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <div>
                <strong style={{ textTransform: "capitalize" }}>{t.type}</strong>
                <p style={{ margin: "4px 0" }}>{t.description}</p>
                <small style={{ color: "#666" }}>{t.category}</small>
              </div>
              <div style={{ textAlign: "right" }}>
                <h4 style={{ margin: "0", color: t.type === "income" ? "#2e7d32" : "#c62828" }}>
                  ₹{t.amount}
                </h4>
                <small>{new Date(t.date).toLocaleDateString()}</small>
                <button onClick={() => handleDelete(t._id)} style={{ marginLeft: 10, color: 'red' }}>Delete</button>
                {/* Edit button can be added here */}
              </div>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
