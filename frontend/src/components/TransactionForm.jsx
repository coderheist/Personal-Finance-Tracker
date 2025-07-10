import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema } from '../utils/validationSchema';

const TransactionForm = ({ onSubmit }) => {
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
    <form onSubmit={handleSubmit(submitHandler)}>
      {/* Amount */}
      <input
        type="number"
        placeholder="Amount"
        {...register('amount', { valueAsNumber: true })}
      />
      {errors.amount && <p>{errors.amount.message}</p>}

      {/* Description */}
      <input
        placeholder="Description"
        {...register('description')}
      />
      {errors.description && <p>{errors.description.message}</p>}

      {/* Type */}
      <select {...register('type')}>
        <option value="">Select Type</option>
        <option value="income">Income</option> {/* ✅ lowercase */}
        <option value="expense">Expense</option> {/* ✅ lowercase */}
      </select>
      {errors.type && <p>{errors.type.message}</p>}

      {/* Category */}
      <select {...register('category')}>
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Salary">Salary</option>
      </select>
      {errors.category && <p>{errors.category.message}</p>}

      {/* Date */}
      <input
        type="date"
        {...register('date')}
      />
      {errors.date && <p>{errors.date.message}</p>}

      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
