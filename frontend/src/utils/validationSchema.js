import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.number().positive('Amount must be a positive number'),
  description: z.string().min(1, 'Description is required'),
  type: z
    .string()
    .transform((val) => val.toLowerCase())
    .refine((val) => val === 'income' || val === 'expense', {
      message: 'Type must be income or expense',
    }),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
});
