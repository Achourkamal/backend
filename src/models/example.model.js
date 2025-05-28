import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
        trim: true, // Empty fields at the beginning of the string
        unique: true,
        minlength: 1, // At least 1 character
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
    },
    picture: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// Create and export the model
export default mongoose.model("Example", exampleSchema);