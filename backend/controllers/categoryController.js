import User from '../models/User.js';

export const getCategories = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.categories || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { categories: category } },
      { new: true }
    );
    res.json(user.categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { categories: category } },
      { new: true }
    );
    res.json(user.categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
