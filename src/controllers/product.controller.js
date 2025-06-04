import Product from '../models/product.model.js';
import handleError from "../middlewares/errors/handleError.js";
import Category from '../models/category.model.js';

// Create a product
const createProduct = async (req, res) => {
    
    try {
        const exists = await Product.findOne({ name: req.body.name });
        if (exists) {
            return handleError(res, null, "Product already exists", 409);
        }
//controler de saisir pour stock et price wala prix ( doit etre possitive)
        const categoryId = req.body.category
        
        const category = await Category.findOne({_id: categoryId});
        if (category === null) {
            return handleError(res, null, "Category dose not exist exists", 409);
        }
        if (typeof req.body.price !== 'number' || req.body.price <= 0) {
        return handleError(res, null, "Price must be a positive number", 400);
    }
    
        const product = new Product(req.body);
        await product.save();

        res.status(201).json(product);
    } catch (error) {
        handleError(res, error, "Failed to create product", 500);
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.status(200).json(products);
    } catch (error) {
        handleError(res, error, "Failed to get products", 500);
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).lean();
        if (!product) return handleError(res, null, "Product not found", 404);
        res.status(200).json(product);
    } catch (error) {
        handleError(res, error, "Failed to get product", 500);
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const exists = await Product.findOne({ name: req.body.name, _id: { $ne: req.params.id } });
        if (exists) {
            return handleError(res, null, "Product name already in use", 409);
        } 
    
        const categoryId = req.body.category

           if (categoryId ) {
             const category = await Category.findOne({_id: categoryId});

        if (category === null) {
            return handleError(res, null, "Category dose not exist exists", 409);
        }
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) return handleError(res, null, "Product not found", 404);
        res.status(200).json(product);
    } catch (error) {
        handleError(res, error, "Failed to update product", 500);
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return handleError(res, null, "Product not found", 404);
        res.status(200).json("Product deleted successfully");
    } catch (error) {
        handleError(res, error, "Failed to delete product", 500);
    }
};

const productController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};

export default productController;
