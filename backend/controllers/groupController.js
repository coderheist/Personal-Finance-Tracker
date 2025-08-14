import Group from '../models/Group.js';
import User from '../models/User.js';

export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const group = new Group({ name, members: [req.user._id] });
    await group.save();
    // Add group to user's groups
    await User.findByIdAndUpdate(req.user._id, { $push: { groups: group._id } });
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const joinGroup = async (req, res) => {
  try {
    const { groupId } = req.body;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    if (!group.members.includes(req.user._id)) {
      group.members.push(req.user._id);
      await group.save();
      await User.findByIdAndUpdate(req.user._id, { $push: { groups: group._id } });
    }
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user._id });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
