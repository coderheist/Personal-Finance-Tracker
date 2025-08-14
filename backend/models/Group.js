import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  sharedBudgets: [{
    category: { type: String, required: true },
    amount: { type: Number, required: true }
  }]
});

const Group = mongoose.model('Group', groupSchema);
export default Group;
