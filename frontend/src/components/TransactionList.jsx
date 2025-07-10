import React from "react";

const TransactionList = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <p>No transactions available</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>💳 Recent Transactions</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {transactions.map((t, index) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
