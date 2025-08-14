import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  categories: [{ type: String, trim: true }],
  notifications: [{ type: String }],
  budgetLimits: {
    type: Map,
    of: Number,
    default: {}
  },
});

const User = mongoose.model('User', userSchema);
export default User;
