import User from'../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import handleError from '../middlewares/errors/handleError.js';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

// SIGN UP CONTROLLER
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return handleError(res, null, 'Email already exists', 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });

        await user.save();

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1d' });

        return res.status(201).json({
            user,
            token
        });
    } catch (error) {
        return handleError(res, error, 'Error in signUp', 500);
    }
};

// LOGIN CONTROLLER
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return handleError(res, null, 'Invalid email or password', 400);
        }

        const isMatched = await bcrypt.compare(password, existingUser.password);
        if (!isMatched) {
            return handleError(res, null, 'Invalid email or password', 400);
        }

        const token = jwt.sign({ userId: existingUser._id }, SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).json({
            user: existingUser,
            token
        });
    } catch (error) {
        return handleError(res, error, 'Error in login', 500);
    }
};

// EXPORT CONTROLLER
const authenticationController = {
    signUp,
    login
};

export default authenticationController;