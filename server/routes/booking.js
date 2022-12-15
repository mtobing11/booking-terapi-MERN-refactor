import express from 'express';
import { makeReservation, getDates } from '../controllers/bookingCtrl.js'

const router = express.Router();

router.get('/dates/open1', getDates);
router.patch('/date/:id', makeReservation);

export default router;