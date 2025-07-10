// backend/middleware/validation.js

import { z } from 'zod';

const transactionSchema = z.object({
  type: z.enum(['income', 'expense'], {
    required_error: 'Type is required and must be either income or expense',
  }),
  amount: z.number({
    required_error: 'Amount is required',
    invalid_type_error: 'Amount must be a number'
  }).positive('Amount must be greater than 0'),
  date: z.string().optional(), 
  description: z.string().optional(),
  category: z.string({
    required_error: 'Category is required'
  }).min(1, 'Category cannot be empty')
});
export const validateTransaction = (req, res, next) => {
  const result = transactionSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }))
    });
  }

  // Replace req.body with validated data
  req.body = result.data;
  next();
};
