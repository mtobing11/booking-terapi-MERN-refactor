import express from 'express';
import { getAllDates, openNewDate, updateExistingDate, deleteDate, getMessage, createNewPlaceForMessage, updateMessage, createNewPlaceForSetup, updateSetup, getSetup } from '../controllers/dashCrlt.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/dates', getAllDates);
router.post('/dates/new', auth, openNewDate);
router.patch('/dates/:id', auth, updateExistingDate);
router.delete('/dates/:id', auth, deleteDate);

router.get('/message/:id', getMessage);
router.post('/message/new', auth, createNewPlaceForMessage)
router.patch('/message/:id', auth, updateMessage)

router.get('/setup/:id', getSetup);
router.post('/setup/new', auth, createNewPlaceForSetup)
router.patch('/setup/:id', auth, updateSetup)

export default router;