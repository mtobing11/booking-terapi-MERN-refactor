import mongoose from 'mongoose';

const slotSchema = mongoose.Schema({
    scheduleId: { type: mongoose.ObjectId, required: true },
    shiftId: { type: mongoose.ObjectId, required: true },
    seatNumber: { type: Number, required: true },
    available: { type: Boolean, default: true },
    bookedBy: { type: String, default: null },
});

const slotInAShift = mongoose.model('slotInAShift', slotSchema);

export default slotInAShift;