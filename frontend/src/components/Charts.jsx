import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = ({ transactions }) => {
  const categoryTotals = {};

  // ✅ Fix: Use lowercase check for 'expense'
  transactions.forEach((tx) => {
    if (tx?.type?.toLowerCase() === 'expense') {
      const category = tx.category || 'Other';
      categoryTotals[category] = (categoryTotals[category] || 0) + tx.amount;
    }
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#ffce56',
          '#4caf50',
          '#9966ff',
          '#ff9f40'
        ]
      }
    ]
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto' }}>
      {Object.keys(categoryTotals).length > 0 ? (
        <Pie data={data} />
      ) : (
        <p style={{ textAlign: 'center', color: '#777' }}>No expense data to show chart.</p>
      )}
    </div>
  );
};

export default Charts;
