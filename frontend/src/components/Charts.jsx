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
          '#8B5CF6', // Purple
          '#EC4899', // Pink
          '#06B6D4', // Cyan
          '#10B981', // Emerald
          '#F59E0B', // Amber
          '#EF4444', // Red
          '#6366F1', // Indigo
          '#84CC16', // Lime
          '#F97316', // Orange
          '#8B5A2B'  // Brown
        ],
        borderWidth: 2,
        borderColor: '#fff',
        hoverBorderWidth: 3,
        hoverBorderColor: '#fff'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ₹${context.parsed.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Expense Distribution</h3>
        <p className="text-gray-600">Breakdown of your spending by category</p>
      </div>
      {Object.keys(categoryTotals).length > 0 ? (
        <div className="relative h-80">
          <Pie data={data} options={chartOptions} />
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No expense data available</p>
          <p className="text-gray-400 text-sm mt-2">Add some expense transactions to see your spending breakdown</p>
        </div>
      )}
    </div>
  );
};

export default Charts;
