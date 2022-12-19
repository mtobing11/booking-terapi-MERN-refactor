import express from 'express';
import { getAllDates2, openNewDate2, updateSchedule, deleteSlots, deleteSchedule, getAllTickets, getMessage, createNewPlaceForMessage, updateMessage, createNewPlaceForSetup, updateSetup, getSetup } from '../controllers/dashCtrl.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/dates', getAllDates2);
router.get('/dates/tickets', getAllTickets);
router.post('/dates/new', auth, openNewDate2);
router.patch('/dates/:id', auth, updateSchedule);
router.delete('/dates/:id', auth, deleteSchedule);
router.delete('/dates/slots/:id', auth, deleteSlots);

router.get('/message/:id', getMessage);
router.post('/message/new', auth, createNewPlaceForMessage)
router.patch('/message/:id', auth, updateMessage)

router.get('/setup/:id', getSetup);
router.post('/setup/new', auth, createNewPlaceForSetup)
router.patch('/setup/:id', auth, updateSetup)

export default router;