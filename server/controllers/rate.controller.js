const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

const addRate = async (req, res) => {
    const { productId, username, rate, review } = req.body;

    if (!productId || !username || rate == null || !review) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (rate < 1 || rate > 5) {
        return res.status(400).json({ message: "Rate must be between 1 and 5" });
    }


    const product = await prisma.product.findUnique({
        where: { id: productId }
    });

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const existingRate = await prisma.rate.findFirst({
        where: {
            productId,
            username
        }
    });

    if (existingRate) {
        return res.status(400).json({ message: "You have already rated this product" });
    }
    const result = await prisma.rate.create({
        data: {
            productId,
            username,
            rate,
            review
        },
    });

    res.status(201).json(result);

};


const getAllRate = async (req, res) => {
    try {
        const rates = await prisma.rate.findMany();
        res.status(200).json(rates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addRate,
    getAllRate
}