import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import requireHTTPS from './middleware/forceToHTTPS.js';

import dashBoardRoutes from './routes/dashboard.js';
import userRoutes from './routes/users.js';
import bookingRoutes from './routes/booking.js'

const version = '1.1.1';
const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();

// app.use(requireHTTPS);
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb',extended: true }))
app.use(cors())

app.use('/dashboard', dashBoardRoutes);
app.use('/user', userRoutes);
app.use('/booking', bookingRoutes);

app.get('/', (req, res) => {
    res.semd(`APP VERSION ${version} IS RUNNING`)
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`)))
        .catch(err => console.error(err))