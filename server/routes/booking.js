import express from 'express';
import { makeReservation } from '../controllers/bookingCtrl.js'

const router = express.Router();

router.get('/dates');
router.post('/date/:id', makeReservation);

export default router;