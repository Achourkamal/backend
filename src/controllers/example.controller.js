// Import model
import Example from '../models/example.model.js'
import handleError from '../middlewares/errors/handleError.js'

// Example to create a new example
const createExample = async (req, res) => {
    try {
        // Check if an example with the same name already exists
        const existingExample = await Example.findOne({ name: req.body.name });

        if (existingExample) {
            return handleError(res, null, "Example with this name already exists", 409); // 409 Conflict
        }

        const newExample = new Example(req.body);
        await newExample.save();
        return res.status(201).json({ payload: newExample });
    } catch (error) {
        handleError(res, error, "Error in creating example", 500);
    }
};

// Get a single example by ID
const getOneExample = async (req, res) => {
    try {
        const example = await Example.findById(req.params.id);

        if (!example) {
            return handleError(res, null, "No example found", 404); // 404 Not Found
        }

        return res.status(200).json({ payload: example });
    } catch (error) {
        handleError(res, error, "Error in getting one example", 500); // 500 server error
    }
};

// Get all examples
const getAllExample = async (req, res) => {
    try {
        const examples = await Example.find();

        if (examples.length === 0) {
            return res.status(204).send(); // No content
        }

        return res.status(200).json( examples );
    } catch (error) {
        handleError(res, error, "Error in getting all examples", 500);
    }
};

// Update an example by ID
const updateExample = async (req, res) => {
    try {
        const example = await Example.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!example) {
            return handleError(res, null, "No data found", 404);
        }

        return res.status(200).json({ payload: example });
    } catch (error) {
        handleError(res, error, "Error in updating example", 500);
    }
};

// Delete an example by ID
const deleteExample = async (req, res) => {
    try {
        const example = await Example.findByIdAndDelete(req.params.id);

        if (!example) {
            return handleError(res, null, "No example found", 404);
        }

        return res.status(200).json({ payload: "Example deleted" });
    } catch (error) {
        handleError(res, error, "Error in deleting example", 500);
    }
};

const exampleController = {
    createExample,
    getOneExample,
    getAllExample,
    updateExample,
    deleteExample
}

export default exampleController