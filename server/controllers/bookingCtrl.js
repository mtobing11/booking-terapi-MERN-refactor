import mongoose from 'mongoose';
import OpenDate from '../models/dateModel.js';
import Message from '../models/messageModel.js';

// import functions
import { checkPhoneLimit, checkCapacity, formatDate, getTomorrowDate, getBookingId, getBookingIdInArr } from '../utils/utils.js';

// get available dates
export const getDates = async (req, res) => {
    console.log("a customer open the app");

    let nextDay = getTomorrowDate()
    
    try {
        const arrDates = await OpenDate.find({ $and: [{ openDate: {$gt: nextDay} }, { status: true }] })
        res.json(arrDates)
    } catch (error) {
        console.log(error)
    }
}

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
        
        let newObj = {name, cellphone, shift, bookedAt: new Date().toISOString()};

        dateToBook[destinationShift].push(newObj)
        console.log(`${name}-${cellphone} trying to get a reservation`);


        if(dateToBook[destinationShift].length >= dateToBook.capacity && dateToBook.shiftsStatus[shift - 1] === true){
            dateToBook.shiftsStatus[shift - 1] = false;

            if(dateToBook.shiftsStatus.every((bool) => bool === false)){
                dateToBook.status = false;
                console.log('Full, date close at:', new Date());
            }
        }

        let updatedDate;

        switch(shift){
            case 1: {
                updatedDate = await OpenDate.findByIdAndUpdate(id, { 
                    $push: { customersShift1: newObj},
                    shiftsStatus: dateToBook.shiftsStatus,
                    status: dateToBook.status
                }, {new: true});
                break;
            }
            case 2: {
                updatedDate = await OpenDate.findByIdAndUpdate(id, { 
                    $push: { customersShift2: newObj},
                    shiftsStatus: dateToBook.shiftsStatus,
                    status: dateToBook.status
                }, {new: true});
                break;
            }
            case 3: {
                updatedDate = await OpenDate.findByIdAndUpdate(id, { 
                    $push: { customersShift3: newObj},
                    shiftsStatus: dateToBook.shiftsStatus,
                    status: dateToBook.status
                }, {new: true});
                break;
            }
            default: {
                updatedDate = await OpenDate.findById(id)
                break
            }
        }

        
        const updatedShiftCustId = updatedDate[destinationShift].map((cust) => cust._id.toString() )
        const oldShiftCustId = dateToBook[destinationShift].map((cust) => cust._id.toString() )

        const bookID = getBookingIdInArr(oldShiftCustId, updatedShiftCustId);
        const getTheDataFromPhoneNum = await OpenDate.findById(id)
                                    .select({'customersShift1': {$elemMatch: { cellphone: cellphone }}})
                                    .select({'customersShift2': {$elemMatch: { cellphone: cellphone }}})
                                    .select({'customersShift3': {$elemMatch: { cellphone: cellphone }}})

        let finalData = bookID.map((resv) => {
            let temp2 = getTheDataFromPhoneNum[destinationShift].map((item) => {
                let temp = item._id.toString()
                if(temp === resv){
                    return temp
                }
            })
            if(temp2) return temp2[0]
        })
        console.log(finalData)
        
        console.log(`${name}-${cellphone} is on the list`);
        res.json({ bookIdArr: bookID, cellphone });

    } catch (error) {
        console.log(error)
    }
}

// Second Step: get the reservation
export const getDataFromReservationList = async (req, res) => {
    // const { dateid, bookingid } = req.params;
    const { dateid } = req.params;

    let { arrIds, cellphone} = req.query;
    let arrIdCustomers = arrIds.split('-');


    try {
        if(!mongoose.Types.ObjectId.isValid(dateid)) return res.status(404).send("Sudah Fullbooked");

        const date = await OpenDate.findById(dateid);
        if(!date) return res.status(404).json({ message: 'Tanggal tersebut ditutup!' });

        const [index, data] = getBookingId(arrIdCustomers, date, cellphone);
        
        if(index.length > 0){
            // console.log(`${data.name}-${data.cellphone} is on the list`);
            // console.log(index, data)
            return res.json({ index, data })
        }

        return res.status(404).send("Sudah Fullbooked");
    } catch (error) {
        console.log(error);
    }

}
