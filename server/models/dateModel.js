import mongoose from 'mongoose';

const dateModelSchema = mongoose.Schema({
    openDate: { type: Date, required: true },
    creator: String,
    createdAt: Date,
    status: { type: Boolean, default: true },
    capacity: { type: Number, default: 1 },
    shifts: { type: Number, default: 1 },
    schedules: [ String ],
    shiftsStatus: [ Boolean ],
    bookingLimit: { type: Number, default: 1 },
    customersShift1:  [{ name: String, cellphone: Number, timestamp: Date }], 
    customersShift2:  [{ name: String, cellphone: Number, timestamp: Date }], 
    customersShift3:  [{ name: String, cellphone: Number, timestamp: Date }] 
});

const OpenDate = mongoose.model('OpenDate', dateModelSchema);

export default OpenDate;