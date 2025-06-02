import Category from '../models/category.model.js';
import handleError from '../middlewares/errors/handleError.js';

const createCategory = async (req, res) => {
    try {
        const existing = await Category.findOne({ name: req.body.name });
        if (existing) {
            return handleError(res, null, "Category already exists", 409);
        }

        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        handleError(res, error, "Error creating category", 500);
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().lean();
        if (!categories.length) {
            return res.status(204).send();
        }
        res.status(200).json(categories);
    } catch (error) {
        handleError(res, error, "Error fetching categories", 500);
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).lean();
        if (!category) {
            return handleError(res, null, "Category not found", 404);
        }
        res.status(200).json(category);
    } catch (error) {
        handleError(res, error, "Error fetching category", 500);
    }
};

const updateCategory = async (req, res) => {
    try {
        const existing = await Category.findOne({
            name: req.body.name,
            _id: { $ne: req.params.id }
        });

        if (existing) {
            return handleError(res, null, "Category name already used", 409);
        }

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!category) {
            return handleError(res, null, "Category not found", 404);
        }

        res.status(200).json(category);
    } catch (error) {
        handleError(res, error, "Error updating category", 500);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return handleError(res, null, "Category not found", 404);
        }
        res.status(200).json("Category deleted");
    } catch (error) {
        handleError(res, error, "Error deleting category", 500);
    }
};

const categoryController = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};

export default categoryController;
