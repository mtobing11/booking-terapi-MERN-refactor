import mongoose from 'mongoose';
import TherapySchedule from '../models/scheduleModel.js';
import SlotInAShift from '../models/slotModel.js';
import TicketForTherapy from '../models/ticketModel.js';

// import functions
import { formatDate } from '../utils/utils.js';

// get all dates
export const getAllDates2 = async (req, res) => {
    console.log("get all dates");
    
    try {
        const arrDates = await TherapySchedule.find()
        res.json(arrDates)
    } catch (error) {
        console.log(error)
    }
}

// open new date
export const openNewDate2 = async (req, res) => {
    console.log("Open new Date");
    if(!req.userId) return res.json({ message: 'unautheticated', type: 'err_data' })

    const body = req.body;
    const openDate = body.openDate;
    const schedules = body.schedules;

    let beginDate = formatDate(openDate, 'dmmmy');
    let endDate = formatDate(openDate, 'dmmmy');
    endDate.setDate(beginDate.getDate() + 1);
    
    try {
        const arrDates = await TherapySchedule.find({ $and: [{ openDate: { $gte: beginDate, $lt: endDate } }]});
        if(arrDates.length > 0) return res.status(404).json({ message: 'Date already exist' });

        schedules.map((shift) => {
            var id = new mongoose.Types.ObjectId();
            shift._id = id;
        })
        const data = {
            openDate: new Date(openDate).toISOString(), creator: body.creator, status: body.status, bookingLimit: body.bookingLimit,
            createdAt: new Date(), shifts: body.shifts, schedules: schedules
        };
        
        const openSchedule = await TherapySchedule.create([data])
        const scheduleID = openSchedule[0]._id

        openSchedule[0].schedules.map(async (shift, idx) => {
            console.log(shift)
            
            const slots = [...Array(shift.quota).keys()].map(j => ({
                scheduleId: scheduleID,
                shiftId: openSchedule[0].schedules[idx]._id,
                seatNumber: j + 1
            }))
            await SlotInAShift.create(slots)
        })

        res.json(openSchedule[0])
    } catch (error) {
       console.log(error)
    }
    
}

// update existing schedule
export const updateSchedule = async (req, res) => {
    console.log("Edit an Existing Date");
    // if(!req.userId) return res.json({ message: 'unautheticated', type: 'err_data' })

    const { id } = req.params;
    const body = req.body;
    const { schedules } = req.body;

    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Tanggal tidak ada")
    
        const openSchedule = await TherapySchedule.findById(id);
        if(!openSchedule) return res.status(404).send("Tanggal sudah tidak ada")
    
        openSchedule['creator'] = body.creator;
        openSchedule['status'] = body.status;
        openSchedule['shifts'] = body.shifts;
        openSchedule['bookingLimit'] = body.bookingLimit;
        
        schedules.map((shift, idx) => {
            if(shift.shiftName === openSchedule['schedules'][idx].shiftName){
                openSchedule['schedules'][idx].schedule = shift.schedule
                openSchedule['schedules'][idx].quota = shift.quota
            }
        })

        let tempShiftsId = []
        await openSchedule['schedules'].map((shift, idx) => {
            if(shift.shiftName === schedules[idx].shiftName){
                shift.schedule = schedules[idx].schedule;
                shift.quota = schedules[idx].quota;
                tempShiftsId.push(shift._id);
                return shift;
            }
        })

        const updatedSchedule = await TherapySchedule.findByIdAndUpdate(id, openSchedule, { new: true })

        // close seats number that over quota
        await tempShiftsId.map(async (shiftId, idx) => {
            let findSlotsArr = await SlotInAShift.find({shiftId: shiftId});
            let tempQuota = updatedSchedule.schedules[idx].quota;
            let tempSeatLength = findSlotsArr.length;

            if(tempQuota > tempSeatLength){
                let slots = []
                slots = [...Array(tempQuota-tempSeatLength).keys()].map(j => ({
                    scheduleId: id,
                    shiftId: shiftId,
                    seatNumber: j + 1 + tempSeatLength
                }))
                await SlotInAShift.create(slots)
            }

            await Promise.all(
                findSlotsArr.map( async (seat) => {
                    if(seat.seatNumber > tempQuota){
                        seat.available = false;
                        let newThing = await SlotInAShift.findByIdAndUpdate(seat._id, seat, { new: true })
                    } else if(seat.seatNumber <= tempQuota && !seat.bookedBy){
                        seat.available = true;
                        let newThing = await SlotInAShift.findByIdAndUpdate(seat._id, seat, { new: true })
                    }
                })
            )

        })

        let newSlot = await SlotInAShift.find({ available: false })
        
        res.json(updatedSchedule);
    } catch (error) {
        console.log(error)
    }
}

// delete all slots from a schedule
export const deleteSlots = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Slot tidak ada");

        await SlotInAShift.deleteMany({ scheduleId: id });

        res.json({ message: "Semua slot berhasil di hapus" , type: "success_data"})
    } catch (error) {
        console.log(error)
    }
}

// delete all slots from a schedule
export const deleteSchedule = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Slot tidak ada");
        await TherapySchedule.findByIdAndRemove(id);
        await SlotInAShift.deleteMany({ scheduleId: id });
        await TicketForTherapy.deleteMany({ scheduleId: id });

        res.json({ message: "Tanggal, semua slot, semua ticket berhasil di hapus" , type: "success_data"})
    } catch (error) {
        console.log(error)
    }
}