import Category from "../models/categoryModel.js";

// GET ALL CATEGORIES
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// CREATE CATEGORY
export const createCategory = async (req, res) => {
    try {
        const { name, image } = req.body;

        const category = await Category.create({
            name,
            image,
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// GET CATEGORY BY ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Category deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};