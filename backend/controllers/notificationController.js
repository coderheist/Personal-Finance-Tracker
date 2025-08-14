import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export const getNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // Bill reminders: find upcoming bills
    const upcomingBills = await Transaction.find({
      user: req.user._id,
      category: 'bills',
      date: { $gte: new Date(), $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
    });
    // Budget alerts
    const alerts = [];
    for (const [cat, limit] of user.budgetLimits.entries()) {
      const spent = await Transaction.aggregate([
        { $match: { user: req.user._id, category: cat, type: 'expense', date: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);
      if (spent[0]?.total >= limit) {
        alerts.push(`Budget limit reached for ${cat}`);
      }
    }
    res.json({
      reminders: upcomingBills.map(b => `Upcoming bill: ${b.description} on ${new Date(b.date).toLocaleDateString()}`),
      alerts
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const setBudgetLimit = async (req, res) => {
  try {
    const { category, limit } = req.body;
    const user = await User.findById(req.user._id);
    user.budgetLimits.set(category, limit);
    await user.save();
    res.json({ message: 'Budget limit set', budgetLimits: user.budgetLimits });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
