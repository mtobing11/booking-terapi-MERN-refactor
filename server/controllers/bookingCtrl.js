import mongoose from 'mongoose';
import OpenDate from '../models/dateModel.js';
import Message from '../models/messageModel.js';

// import functions
import { checkPhoneLimit, checkCapacity, formatDate } from '../utils/utils.js';

// First step: make reservation
export const makeReservation = async (req, res) => {
    const { id } = req.params
    const { name, cellphone, shift } = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Tanggal belum dibuka!");

        const dateToBook = await OpenDate.findById(id)
        if(!dateToBook) return res.status(404).json({ message: 'Tanggal tersebut ditutup!' })
        if(!dateToBook.status) return res.status(404).json({ message: 'Tanggal tersebut sudah ditutup!' })

        const shiftCurrStatus = dateToBook.shiftsStatus[shift - 1];
        if(!shiftCurrStatus) return res.status(404).json({ message: 'Jam ini sudah penuh!' })

        let isPhoneLimit = checkPhoneLimit(dateToBook, cellphone);
        if(!isPhoneLimit) return res.status(404).json({ message: 'Maaf nomer ini tidak bisa melakukan booking lagi di tanggal tersebut' })

        let isNotFull = checkCapacity(dateToBook, shift)
        if(!isNotFull) return res.status(404).json({ message: 'Maaf jam ini sudah penuh'})

        let destinationShift = `customersShift${shift}`;
        // let customersShift = dateToBook[destinationShift];
        dateToBook[destinationShift].push({name, cellphone, bookedAt: new Date().toISOString() })

        if(dateToBook[destinationShift].length >= dateToBook.capacity && dateToBook.shiftsStatus[shift - 1] === true){
            dateToBook.shiftsStatus[shift - 1] = false;

            if(dateToBook.shiftsStatus.every((bool) => bool === false)){
                dateToBook.status = false;
                console.log('Full, date close at:', new Date());
            }
        }

        const updatedDate = await OpenDate.findByIdAndUpdate(id, dateToBook, {new: true});

        console.log(`${name} - ${cellphone} make a reservation`);
        res.json(updatedDate);

    } catch (error) {
        console.log(error)
    }
}