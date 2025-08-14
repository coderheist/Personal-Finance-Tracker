import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const Trends = ({ transactions }) => {
  // Group expenses by month
  const monthly = {};
  transactions.forEach(t => {
    if (t.type === 'expense') {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      monthly[key] = (monthly[key] || 0) + t.amount;
    }
  });
  const labels = Object.keys(monthly).sort();
  const data = {
    labels,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: labels.map(l => monthly[l]),
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54,162,235,0.2)',
        fill: true
      }
    ]
  };
  return (
    <div style={{ maxWidth: 500, margin: '20px auto' }}>
      <h3>Expense Trends</h3>
      {labels.length > 0 ? <Line data={data} /> : <p>No expense data for trends.</p>}
    </div>
  );
};

export default Trends;
