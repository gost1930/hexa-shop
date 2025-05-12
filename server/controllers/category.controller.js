const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.status(200).send({
            message: "Categories fetched successfully",
            categories: categories
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: id
            }
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createCategory = async (req, res) => {
    try {
        const { name, user } = req.body;
        const image = req.file ? "uploads/" + req.file.filename : null;
        console.log(req.file)
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        if (!name || !user) {
            return res.status(400).json({ message: "User and name are required" });
        }

        const userExist = await prisma.user.findUnique({
            where: { id: user }
        });

        if (!userExist) {
            return res.status(400).json({ message: "User not found" });
        }

        const category = await prisma.category.create({
            data: {
                user: { connect: { id: user } },
                name,
                img: image
            }
        });

        return res.status(201).json(category);
    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({ message: error.message });
    }
};


const updateCategory = async (req, res) => {

    const { id } = req.params;
    const { name } = req.body;
    const image = req.file ? "uploads/" + req.file.filename : null;
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.files);

    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }
    try {
        const category = await prisma.category.update({
            where: {
                id: id
            },
            data: {
                name: name,
                img: image
            }
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.order.deleteMany({
            where: {
                product: {
                    some: {
                        categoryId: id
                    }
                }
            }
        });

        await prisma.product.deleteMany({
            where: { categoryId: id }
        });

        const category = await prisma.category.delete({
            where: { id: id }
        });

        res.status(200).json({ message: "Category deleted successfully", category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};