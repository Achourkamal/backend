import User from '../models/user.model.js';
import handleError from "../middlewares/errors/handleError.js";

// Create a new user
const createUser = async (req, res) => {
    try {
        const existing = await User.findOne({ $or: [{ name: req.body.name }, { email: req.body.email }] });
        if (existing) {
            return handleError(res, null, "Name or email already exists", 409); // 409 Conflict
        }

        const user = new User(req.body);
        await user.save();

        return res.status(201).json( user );
    } catch (error) {
        handleError(res, error, "Error in creating user", 500);
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().lean();

        if (users.length === 0) {
            return res.status(204).send(); // No content
        }

        return res.status(200).json( users );
    } catch (error) {
        handleError(res, error, "Error in getting all users", 500);
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean();

        if (!user) {
            return handleError(res, null, "User not found", 404);
        }

        return res.status(200).json( user );
    } catch (error) {
        handleError(res, error, "Error in getting user by ID", 500);
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({
            $or: [{ name }, { email }],
            _id: { $ne: req.params.id }
        });

        if (existing) {
            return handleError(res, null, "Name or email already in use by another user", 409); // 409 Conflict
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password },
            { new: true, runValidators: true }
        );

        if (!user) {
            return handleError(res, null, "User not found", 404);
        }

        return res.status(200).json( user );
    } catch (error) {
        handleError(res, error, "Error in updating user", 500);
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return handleError(res, null, "No user found", 404);
        }

        return res.status(200).json( "User deleted" );
    } catch (error) {
        handleError(res, error, "Error in deleting user", 500);
    }
};

const userController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};

export default userController;
