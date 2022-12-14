import express from 'express';
import { getAllDates, openNewDate, updateExistingDate, deleteDate, getMessage, createNewPlaceForMessage, updateMessage, createNewPlaceForSetup, updateSetup, getSetup } from '../controllers/dashCrlt.js';
import { getAllDates2, openNewDate2, updateSchedule, deleteSlots, deleteSchedule } from '../controllers/dashCtrl2.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/dates', getAllDates2);
router.post('/dates/new', openNewDate2);
router.patch('/dates/:id', updateSchedule);
router.delete('/dates/:id', deleteSchedule);
router.delete('/dates/slots/:id', deleteSlots);
// router.get('/dates', getAllDates);
// router.post('/dates/new', auth, openNewDate);
// router.patch('/dates/:id', auth, updateExistingDate);
// router.delete('/dates/:id', auth, deleteDate);

router.get('/message/:id', getMessage);
router.post('/message/new', auth, createNewPlaceForMessage)
router.patch('/message/:id', auth, updateMessage)

router.get('/setup/:id', getSetup);
router.post('/setup/new', auth, createNewPlaceForSetup)
router.patch('/setup/:id', auth, updateSetup)

export default router;