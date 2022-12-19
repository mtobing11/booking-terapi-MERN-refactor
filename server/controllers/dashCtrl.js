import mongoose from 'mongoose';
import TherapySchedule from '../models/scheduleModel.js';
import SlotInAShift from '../models/slotModel.js';
import TicketForTherapy from '../models/ticketModel.js';
import Message from '../models/messageModel.js';
import Setup from '../models/setupModel.js';

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

// get all customers
export const getAllTickets = async (req, res) => {
    console.log("get all tickets data");

    try {
        const slots = await TicketForTherapy.find();
        res.json(slots)
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
        console.log(openSchedule)
        openSchedule[0].schedules.map(async (shift, idx) => {
            
            const slots = [...Array(shift.quota).keys()].map(j => ({
                scheduleId: scheduleID,
                shiftId: openSchedule[0].schedules[idx]._id,
                seatNumber: j + 1,
                available: body.status
            }))
            let newSlot = await SlotInAShift.create(slots)
            // console.log(newSlot);
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
    console.log(schedules);
    
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

// get existing message
export const getMessage = async (req, res) => {
    console.log("Dashboard get Message");

    const { id } = req.params;
    try {
        const findMessage = await Message.findById(id);
        res.json(findMessage)
    } catch (error) {
        console.log(error)
    }
}

// create new place for message
export const createNewPlaceForMessage = async (req, res) => {
    console.log("Create New Place 4 Message");
    // if(!req.userId) return res.json({ message: 'unautheticated', type: 'err_data' })

    const { message, duration, creator } = req.body;
    const newMessage = await Message({ timestamp: new Date(), duration, message, creator});
    try {
        await newMessage.save(req.body);
        res.status(201).json(newMessage);
    } catch (error) {
        console.log(error)
    }
}

// update existing message
export const updateMessage = async (req, res) => {
    console.log("Dashboard Update Message");
    if(!req.userId) return res.json({ message: 'unautheticated', type: 'err_data' })

    const { id } = req.params;
    const { message, duration, isDuration, creator, status } = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Tanggal tidak ada")
    
        const findMessage = await Message.findById(id);
        if(!findMessage) return res.status(404).send("Message tidak ada")

        findMessage['message'] = message;
        findMessage['duration'] = duration;
        findMessage['isDuration'] = isDuration;
        findMessage['creator'] = creator;
        findMessage['status'] = status;
        findMessage['timestamp'] = new Date();

        const updatedMessage = await Message.findByIdAndUpdate(id, findMessage, { new: true })
        
        res.json(updatedMessage);
    } catch (error) {
        console.log(error)
    }
}

// create new setup
export const createNewPlaceForSetup = async (req, res) => {
    console.log("Create New Place 4 Setupe");
    if(!req.userId) return res.json({ message: 'unautheticated', type: 'err_data' })

    const { capacity, bookingLimit, shifts, schedules } = req.body;
    const newSetup = await Setup({ capacity, bookingLimit, shifts, schedules });
    try {
        await newSetup.save(newSetup);
        res.status(201).json(newSetup);
    } catch (error) {
        console.log(error)
    }
}

// update setup
export const updateSetup = async (req, res) => {
    console.log("Update setup");
    if(!req.userId) return res.json({ message: 'unautheticated', type: 'err_data' })

    const { id } = req.params;
    const { capacity, bookingLimit, shifts, schedules } = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Tanggal tidak ada")
    
        const findSetup = await Setup.findById(id);
        if(!findSetup) return res.status(404).send("Setup tidak ada")

        findSetup['capacity'] = capacity;
        findSetup['bookingLimit'] = bookingLimit;
        findSetup['shifts'] = shifts;
        findSetup['schedules'] = schedules;

        const updatedSetup = await Setup.findByIdAndUpdate(id, findSetup, { new: true })
        
        res.json(updatedSetup);
    } catch (error) {
        console.log(error)
    }
}

// get setup
export const getSetup = async (req, res) => {
    console.log("get setup");

    const { id } = req.params;
    try {
        const findSetup = await Setup.findById(id);
        res.json(findSetup)
    } catch (error) {
        console.log(error)
    }
}