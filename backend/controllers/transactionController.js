import Transaction from '../models/Transaction.js';

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error('❌ Error fetching transactions:', error.message);
    res.status(500).json({ message: 'Server Error: Could not fetch transactions' });
  }
};

export const addTransaction = async (req, res) => {
  try {
    const { type, amount, date, description, category } = req.body;

    const newTransaction = new Transaction({
      type: type.toLowerCase(), // ✅ normalize
      amount,
      date,
      description,
      category,
    });

    const saved = await newTransaction.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ Error saving transaction:', err.message);
    res.status(400).json({ message: err.message });
  }
};

