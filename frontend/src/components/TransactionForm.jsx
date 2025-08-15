import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema } from '../utils/validationSchema';

const TransactionForm = ({ onSubmit, categories = [] }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(transactionSchema),
    mode: 'onSubmit'
  });

  const submitHandler = (data) => {
    // Normalize type before sending
    const normalizedData = {
      ...data,
      type: data.type.toLowerCase(), // ✅ ensure backend accepts it
      amount: Number(data.amount),   // ✅ ensure it's a number
    };
    onSubmit(normalizedData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      {/* Amount Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
          <input
            type="number"
            placeholder="0.00"
            {...register('amount', { valueAsNumber: true })}
            className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg font-medium bg-gray-50 focus:bg-white"
          />
        </div>
        {errors.amount && <p className="text-red-500 text-sm mt-1 font-medium">{errors.amount.message}</p>}
      </div>

      {/* Description Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
        <input
          placeholder="Enter transaction description"
          {...register('description')}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1 font-medium">{errors.description.message}</p>}
      </div>

      {/* Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
        <select
          {...register('type')}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
        >
          <option value="">Select Type</option>
          <option value="income">💰 Income</option>
          <option value="expense">💸 Expense</option>
        </select>
        {errors.type && <p className="text-red-500 text-sm mt-1 font-medium">{errors.type.message}</p>}
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
        <select
          {...register('category')}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1 font-medium">{errors.category.message}</p>}
      </div>

      {/* Date Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
        <input
          type="date"
          {...register('date')}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
        />
        {errors.date && <p className="text-red-500 text-sm mt-1 font-medium">{errors.date.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-lg"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
