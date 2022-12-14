import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema({
    openDate: { type: Date, required: true },
    creator: String,
    createdAt: Date,
    status: { type: Boolean, default: true },
    bookingLimit: { type: Number, default: 1 },
    shifts: { type: Number, default: 1 },
    schedules: []
});

const TherapySchedule = mongoose.model('TherapySchedule', scheduleSchema);

export default TherapySchedule;