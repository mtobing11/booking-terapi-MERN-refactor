import express from 'express';
import { makeReservation, getDates, getDataFromReservationList } from '../controllers/bookingCtrl.js'

const router = express.Router();

router.get('/dates/open1', getDates);
router.patch('/date/:id', makeReservation);
router.get('/date/:dateid/dataQuery', getDataFromReservationList);
// router.get('/date/:dateid/:bookingid', getDataFromReservationList);

export default router;