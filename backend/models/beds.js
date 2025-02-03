const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
  bedNumber: String,
  ward: String,
  type: { type: String, enum: ['general', 'ICU', 'private'], required: true },
  status: { type: String, enum: ['available', 'occupied'], default: 'available' },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookedAt: { type: Date }
});
const Beds = mongoose.model('Beds', bedSchema);
module.exports = Beds;
