import mongoose from 'mongoose';

const ticketSchema = mongoose.Schema({
    seatNumber: { type: Number, required: true },
    passangerId: { type: mongoose.ObjectId },
    scheduleId: { type: mongoose.ObjectId, required: true },
    shiftId: { type: mongoose.ObjectId, required: true },
    slotId: { type: mongoose.ObjectId, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true }
});

const ticketForTherapy = mongoose.model('ticketForTherapy', ticketSchema);

export default ticketForTherapy;