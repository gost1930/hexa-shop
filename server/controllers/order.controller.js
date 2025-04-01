const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const { checkIsPhoneNumberIsValid } = require('../utils/phone-number-validation');
const getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany(
            {
                include: {
                    product: {
                        select: { product: true },
                        include: {
                            category: true
                        }
                    }
                }
            }
        );
        res.status(200).send({
            message: "Orders fetched successfully",
            orders: orders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrderByProductId = async (req, res) => {
    const { productId } = req.params;
    try {
        const orders = await prisma.order.findMany({
            where: {
                productId: productId
            }
        });
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getOrderById = async (req, res) => {

    const { id } = req.params;
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: id
            }
        });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createOrder = async (req, res) => {
    const { productId, quantity, username, state, city, phoneNumber, total, deleveryPrice, delevryType } = req.body;

    if (!productId || !quantity || !username || !state || !phoneNumber || !total || !deleveryPrice || !delevryType) {
        return res.status(400).json({ message: "productId, quantity , username , state and city and phoneNumber and total and deleveryPrice and delevrryType are required" });
    }
    if (delevryType.toLowerCase() === "house" && !city) {
        return res.status(400).json({ message: "city is required" });
    }
    try {

        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const order = await prisma.order.create({
            data: {
                product: {
                    connect: {
                        id: productId
                    }
                },
                username,
                address: `${state} ${city}`,
                phone: checkIsPhoneNumberIsValid(phoneNumber),
                quantity: +quantity,
                delevryType: delevryType,
                total: +total,
                deleveryPrice: +deleveryPrice,
            },
            include: {
                product: {
                    select: {
                        name: true,
                        price: true,
                        category: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        res.status(201).json({success: true, message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    getOrderByProductId
}