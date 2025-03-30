const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

const getProducts = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    let { name } = req.query;
    name = name?.replace(/[-_]/g, " ");
    try {
        const whereCondition = name
            ? {
                name: {
                    contains: name,
                    mode: "insensitive",
                }
            }
            : {};


        const products = await prisma.product.findMany({
            where: whereCondition,
            skip: (page - 1) * limit,
            take: parseInt(limit),
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });

        const totalProducts = await prisma.product.count({ where: whereCondition });

        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200).send({
            message: name
                ? `Products with name '${name}' fetched successfully`
                : "Products fetched successfully",
            products: products,
            pagination: {
                currentPage: parseInt(page),
                totalPages: totalPages,
                totalProducts: totalProducts,
                pageSize: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const serchProduct = async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }
    try {
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: name
                }
            }
        });
        res.status(200).send({
            message: `Products with name ${name} fetched successfully`,
            products: products
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {

    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: id
            },
        });
        res.status(200).send({
            message: "Product fetched successfully",
            product: product
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProductByCategoryId = async (req, res) => {

    const { categoryId } = req.params;
    if (!categoryId) {
        return res.status(400).json({ message: "categoryId is required" });
    }
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: categoryId
            }
        });
        res.status(200).send({
            message: `Products with categoryId ${categoryId} fetched successfully`,
            products: products
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductByCategoryName = async (req, res) => {
    const { categoryName } = req.params;

    if (!categoryName) {
        return res.status(400).json({ message: "Category is required" });
    }

    try {
        const products = await prisma.product.findMany({
            where: {
                category: {
                    name: categoryName, // Correctly filter products by category name
                },
            },
        });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found with this category name" });
        }

        res.status(200).json({
            message: `Products with category name ${categoryName} fetched successfully`,
            data: products, // Send the fetched products in the response
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getProductByName = async (req, res) => {
    try {
        let { name } = req.params;

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        // replace - or _ with space
        name = name.replace(/[-_]/g, " ");

        const product = await prisma.product.findUnique({
            where: { name },
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).send({
            message: `Product with name ${name} fetched successfully`,
            product
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createProduct = async (req, res) => {
    console.log(req.files);

    const { name, price, categoryId, userId, oldPrice, rate, quantity, desc } = req.body;

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "الصور مطلوبة" });
    }

    const imgPaths = req.files.map(file => `uploads/${file.filename}`);

    try {
        const product = await prisma.product.create({
            data: {
                user: { connect: { id: userId } },
                name,
                price: +price,
                category: { connect: { id: categoryId } },
                oldPrice: +oldPrice,
                rate: +rate,
                quantity: +quantity,
                desc,
                img: JSON.stringify(imgPaths)
            }
        });

        return res.status(201).json({ message: "تم إنشاء المنتج بنجاح", product });
    } catch (error) {
        console.error("خطأ أثناء إنشاء المنتج:", error);
        return res.status(500).json({ message: "خطأ داخلي في السيرفر" });
    }
};



const updateProductById = async (req, res) => {
    const { id } = req.params;
    const { name, price, categoryId, userId, quantity , oldPrice} = req.body;
    const image = req.file ? "uploads/" + req.file.filename : null;
    if(!id){
        return res.status(400).json({ message: "Id is required" });
    }
    try {
        const product = await prisma.product.update({
            where: {
                id: id //the id is string
            },
            data: {
                name,
                price : +price,
                quantity : +quantity,
                oldPrice: +oldPrice,
                category: { connect: { id: categoryId } },
                user: { connect: { id: userId } },
                img: image
            }
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.delete({
            where: {
                id: id
            }
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    getProductByCategoryId,
    getProductByName,
    getProductByCategoryName,
    serchProduct,
    deleteProductById
};