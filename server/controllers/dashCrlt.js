import mongoose from 'mongoose';
import OpenDate from '../models/dateModel.js';
import Message from '../models/messageModel.js';
import Setup from '../models/setupModel.js';

// import functions
import { formatDate } from '../utils/utils.js';

// get all dates
export const getAllDates = async (req, res) => {
    console.log("get all dates");
    
    try {
        const arrDates = await OpenDate.find()
        res.json(arrDates)
    } catch (error) {
        console.log(error)
    }
}

// open new date
export const openNewDate = async (req, res) => {
    console.log("Open new Date");
    // if(!req.userId) return res.json({ message: 'unautheticated', type: 'err_data' })

    const { openDate } = req.body;
    
    let beginDate = formatDate(openDate, 'dmmmy');
    let endDate = formatDate(openDate, 'dmmmy');
    endDate.setDate(beginDate.getDate() + 1);
    
    try {
        const arrDates = await OpenDate.find({ $and: [{ openDate: { $gte: beginDate, $lt: endDate } }]})
        if(arrDates.length > 0) return res.status(404).json({ message: 'Date already exist' })

        const { creator, capacity, shifts, schedules, shiftsStatus, bookingLimit } = req.body;
        
        const newObjDate = await OpenDate({ openDate: new Date(openDate).toISOString(), createdAt: new Date(), creator, capacity, shifts, schedules, shiftsStatus, bookingLimit})
        
        await newObjDate.save()
        res.status(201).json(newObjDate)
    } catch (error) {
        console.log(error)
    }
}

// update existing date
export const updateExistingDate = async (req, res) => {
    console.log("Edit an Existing Date");
    // if(!req.userId) return res.json({ message: 'unautheticated', type: 'err_data' })

    const { id } = req.params;
    const { creator, status, capacity, shifts, schedules, shiftsStatus, bookingLimit} = req.body;
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Tanggal tidak ada")
    
        const findDate = await OpenDate.findById(id);
        if(!findDate) return res.status(404).send("Tanggal sudah tidak ada")
    
        findDate['creator'] = creator;
        findDate['status'] = status;
        findDate['capacity'] = capacity;
        findDate['shifts'] = shifts;
        findDate['schedules'] = schedules;
        findDate['shiftsStatus'] = shiftsStatus;
        findDate['bookingLimit'] = bookingLimit;
        findDate['timestamp'] = new Date();

        const updatedDate = await OpenDate.findByIdAndUpdate(id, findDate, { new: true })
        
        res.json(updatedDate);
    } catch (error) {
        console.log(error)
    }
}

// update existing date
export const deleteDate = async (req, res) => {
    console.log("Delete a Date");
    
    const { id } = req.params;
    // if(!req.userId) return res.json({ message: 'unautheticated', type: 'err_data' })

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Tanggal tidak ada");

        await OpenDate.findByIdAndRemove(id);

        res.json({ message: "Tanggal berhasil di hapus" , type: "success_data"})
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
    console.log("Update Message");
    // if(!req.userId) return res.json({ message: 'unautheticated', type: 'err_data' })

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

// get existing message
export const getMessage = async (req, res) => {
    console.log("get Message");

    const { id } = req.params;
    try {
        const findMessage = await Message.findById(id);
        res.json(findMessage)
    } catch (error) {
        console.log(error)
    }
}

// create new setup
export const createNewPlaceForSetup = async (req, res) => {
    console.log("Create New Place 4 Setupe");
    // if(!req.userId) return res.json({ message: 'unautheticated', type: 'err_data' })

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
    // if(!req.userId) return res.json({ message: 'unautheticated', type: 'err_data' })

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