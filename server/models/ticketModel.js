import mongoose from 'mongoose';

const ticketSchema = mongoose.Schema({
    scheduleId: { type: mongoose.ObjectId, required: true },
    shiftId: { type: mongoose.ObjectId, required: true },
    seatNumber: { type: Number, required: true },
    available: { type: Boolean, default: true },
    bookedBy: { type: String, default: null },
});

const ticketForTherapy = mongoose.model('ticketForTherapy', ticketSchema);

export default ticketForTherapy;