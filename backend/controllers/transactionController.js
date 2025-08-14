export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const transaction = await Transaction.findOneAndUpdate({ _id: id, user: req.user._id }, update, { new: true });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOneAndDelete({ _id: id, user: req.user._id });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
import Transaction from '../models/Transaction.js';

export const getAllTransactions = async (req, res) => {
  try {
    // Only fetch transactions for the authenticated user or their groups
    const userId = req.user._id;
    const groupIds = req.user.groups || [];
    const transactions = await Transaction.find({
      $or: [
        { user: userId },
        { group: { $in: groupIds } }
      ]
    }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error('❌ Error fetching transactions:', error.message);
    res.status(500).json({ message: 'Server Error: Could not fetch transactions' });
  }
};

export const addTransaction = async (req, res) => {
  try {
    const { type, amount, date, description, category, group } = req.body;
    const userId = req.user._id;
    const newTransaction = new Transaction({
      type: type.toLowerCase(),
      amount,
      date,
      description,
      category,
      user: userId,
      group: group || undefined
    });
    const saved = await newTransaction.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ Error saving transaction:', err.message);
    res.status(400).json({ message: err.message });
  }
};

