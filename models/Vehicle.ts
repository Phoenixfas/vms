import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'In Use', 'Maintenance', 'Out of Service'],
    default: 'Available',
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);