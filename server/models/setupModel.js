import mongoose from 'mongoose';

const setupSchema = mongoose.Schema({
    capacity: { type: Number, default: 20 },
    bookingLimit: { type: Number, default: 1 },
    shifts: { type: Number, default: 3 },
    schedules: [ String ]
})

export default mongoose.model('Setup', setupSchema);