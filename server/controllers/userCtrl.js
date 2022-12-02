import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

// signin
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const findUser = await User.findOne({ email: email });
        if (!findUser) return res.status(404).json({ message: "User don't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid password"})

        const token = jwt.sign({ email: findUser.email, id: findUser._id}, process.env.TOKEN, { expiresIn: '1h' })
        res.status(200).json({ userData: findUser, token })
    } catch (error) {
        console.log(error)
    }
}

// signup
export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const findUser = await User.findOne({ email: email });
        if (findUser) return res.status(404).json({ message: "User already exist" });
        if(password !== confirmPassword) return res.status(400).json({ message: "Password don't match" })

        const hashedPassword = await bcrypt.hash(password, 12);
        const userData = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: userData.email, id: userData._id}, process.env.TOKEN, { expiresIn: '1h' })
        res.status(200).json({ userData: userData, token })
    } catch (error) {
        console.log(error)
    }
}
