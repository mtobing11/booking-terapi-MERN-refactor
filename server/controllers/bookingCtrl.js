import mongoose from 'mongoose';
import Message from '../models/messageModel.js';
import TherapySchedule from '../models/scheduleModel.js';
import SlotInAShift from '../models/slotModel.js';
import TicketForTherapy from '../models/ticketModel.js'

// import functions
import { formatDate, getTomorrowDate, sortArrOfObjects } from '../utils/utils.js';

export const getDates = async (req, res) => {
    console.log("a customer open the app");
    let nextDay = getTomorrowDate()
    
    try {
        const arrDates = await TherapySchedule.find({ $and: [{ openDate: {$gte: nextDay} }, { status: true }] })
        res.json(arrDates)
    } catch (error) {
        console.log(error)
    }
}

// First step: make reservation
export const makeReservation = async (req, res) => {
    const { id } = req.params
    const { name, cellphone, shiftId } = req.body;

    console.log(`${name}-${cellphone} trying to get a reservation`);

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Tanggal belum dibuka!");
        if(!mongoose.Types.ObjectId.isValid(shiftId)) return res.status(404).send("Shift sudah ditutup!");

        const openDate = await TherapySchedule.findById(id)
        if(!openDate) return res.status(404).json({ message: 'Tanggal tersebut ditutup!' })
        if(!openDate.status) return res.status(404).json({ message: 'Tanggal tersebut sudah ditutup!' })

        const isPhoneRegisteredInSameDay = await TicketForTherapy.find({ $and: [{ scheduleId: id }, { phone: cellphone }]})
        if(isPhoneRegisteredInSameDay.length >= openDate.bookingLimit) return res.status(404).json({ message: 'No HP ini sudah terdaftar!' })
        
        // const openSeatArr = await SlotInAShift.findOne(query);
        const openSeatArr = await SlotInAShift.find({ $and: [{ shiftId: shiftId }, { available: true }] })
        const arrangeOpenSeatArr = sortArrOfObjects(openSeatArr, 'seatNumber')
        
        let query = {
            shiftId: shiftId,
            available: true,
            seatNumber: 0
        }
        let slot = null;
        let idx = 0;

        while (!slot && idx < arrangeOpenSeatArr.length){
            query.seatNumber = arrangeOpenSeatArr[idx].seatNumber;
            
            slot = await SlotInAShift.findOneAndUpdate(query, {
                $set: {
                    bookedBy: name,
                    phone: cellphone,
                    available: false
                }
            }, { new: true });
            
            idx++;
        }
        
        if (!slot) return res.status(404).json({ message: 'Jam ini sudah penuh!' })

        // check if already full, then close the date schedule
        const isThereSlotArr = await SlotInAShift.find({ $and: [{ scheduleId: id }, { available: true }] })
        
        if(isThereSlotArr.length <= 0){
            await TherapySchedule.findByIdAndUpdate(id, { status: false})
            console.log(`Date is closed at ${formatDate(new Date(), 'ymd-fulltime')}`)
        }

        // Create ticket
        const ticket =  await TicketForTherapy.create([{
            seatNumber: slot.seatNumber,
            scheduleId: id,
            shiftId: slot.shiftId,
            slotId: slot._id,
            name: slot.bookedBy,
            phone: slot.phone,
            issuedAt: new Date()
        }])
        console.log(`${name}-${cellphone} success book and create ticket`);
        res.json(ticket);

    } catch (error) {
        console.log(error)
    }
}

