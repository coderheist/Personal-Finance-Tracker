import ScheduledTransaction from '../models/ScheduledTransaction.js';
import Transaction from '../models/Transaction.js';

// Get all scheduled transactions for a user
export const getScheduledTransactions = async (req, res) => {
  try {
    const scheduledTransactions = await ScheduledTransaction.find({
      user: req.user._id,
      isActive: true
    }).sort({ scheduledDate: 1 });

    res.json(scheduledTransactions);
  } catch (error) {
    console.error('Error fetching scheduled transactions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new scheduled transaction
export const createScheduledTransaction = async (req, res) => {
  try {
    const { type, amount, description, category, scheduledDate, recurrence } = req.body;

    // Validate required fields
    if (!type || !amount || !description || !category || !scheduledDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if scheduled date is in the future
    const currentDate = new Date();
    const scheduleDate = new Date(scheduledDate);
    
    if (scheduleDate <= currentDate) {
      return res.status(400).json({ message: 'Scheduled date must be in the future' });
    }

    const scheduledTransaction = new ScheduledTransaction({
      type: type.toLowerCase(),
      amount: parseFloat(amount),
      description,
      category,
      scheduledDate: scheduleDate,
      recurrence: recurrence || 'none',
      user: req.user._id
    });

    const savedTransaction = await scheduledTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Error creating scheduled transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a scheduled transaction
export const updateScheduledTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, description, category, scheduledDate, recurrence, isActive } = req.body;

    const scheduledTransaction = await ScheduledTransaction.findOne({
      _id: id,
      user: req.user._id
    });

    if (!scheduledTransaction) {
      return res.status(404).json({ message: 'Scheduled transaction not found' });
    }

    // Update fields if provided
    if (type) scheduledTransaction.type = type.toLowerCase();
    if (amount) scheduledTransaction.amount = parseFloat(amount);
    if (description) scheduledTransaction.description = description;
    if (category) scheduledTransaction.category = category;
    if (scheduledDate) {
      const scheduleDate = new Date(scheduledDate);
      const currentDate = new Date();
      
      if (scheduleDate <= currentDate && !scheduledTransaction.isExecuted) {
        return res.status(400).json({ message: 'Scheduled date must be in the future for pending transactions' });
      }
      scheduledTransaction.scheduledDate = scheduleDate;
    }
    if (recurrence !== undefined) scheduledTransaction.recurrence = recurrence;
    if (isActive !== undefined) scheduledTransaction.isActive = isActive;

    const updatedTransaction = await scheduledTransaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    console.error('Error updating scheduled transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a scheduled transaction
export const deleteScheduledTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const scheduledTransaction = await ScheduledTransaction.findOneAndDelete({
      _id: id,
      user: req.user._id
    });

    if (!scheduledTransaction) {
      return res.status(404).json({ message: 'Scheduled transaction not found' });
    }

    res.json({ message: 'Scheduled transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting scheduled transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Execute a scheduled transaction (convert to actual transaction)
export const executeScheduledTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const scheduledTransaction = await ScheduledTransaction.findOne({
      _id: id,
      user: req.user._id,
      isExecuted: false,
      isActive: true
    });

    if (!scheduledTransaction) {
      return res.status(404).json({ message: 'Scheduled transaction not found or already executed' });
    }

    // Create actual transaction
    const actualTransaction = new Transaction({
      type: scheduledTransaction.type,
      amount: scheduledTransaction.amount,
      description: scheduledTransaction.description,
      category: scheduledTransaction.category,
      date: new Date(),
      user: scheduledTransaction.user
    });

    await actualTransaction.save();

    // Mark scheduled transaction as executed
    scheduledTransaction.isExecuted = true;
    scheduledTransaction.executedAt = new Date();
    await scheduledTransaction.save();

    // Handle recurrence
    if (scheduledTransaction.recurrence !== 'none') {
      const nextDate = new Date(scheduledTransaction.scheduledDate);
      
      switch (scheduledTransaction.recurrence) {
        case 'weekly':
          nextDate.setDate(nextDate.getDate() + 7);
          break;
        case 'monthly':
          nextDate.setMonth(nextDate.getMonth() + 1);
          break;
        case 'yearly':
          nextDate.setFullYear(nextDate.getFullYear() + 1);
          break;
      }

      // Create next recurring transaction
      const nextScheduledTransaction = new ScheduledTransaction({
        type: scheduledTransaction.type,
        amount: scheduledTransaction.amount,
        description: scheduledTransaction.description,
        category: scheduledTransaction.category,
        scheduledDate: nextDate,
        recurrence: scheduledTransaction.recurrence,
        user: scheduledTransaction.user
      });

      await nextScheduledTransaction.save();
    }

    res.json({ 
      message: 'Scheduled transaction executed successfully',
      actualTransaction,
      scheduledTransaction 
    });
  } catch (error) {
    console.error('Error executing scheduled transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get upcoming scheduled transactions (next 30 days)
export const getUpcomingScheduledTransactions = async (req, res) => {
  try {
    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 30);

    const upcomingTransactions = await ScheduledTransaction.find({
      user: req.user._id,
      isActive: true,
      isExecuted: false,
      scheduledDate: {
        $gte: currentDate,
        $lte: futureDate
      }
    }).sort({ scheduledDate: 1 }).limit(10);

    res.json(upcomingTransactions);
  } catch (error) {
    console.error('Error fetching upcoming scheduled transactions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
