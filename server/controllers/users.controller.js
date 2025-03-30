const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const { comparePass } = require("../middleware/auth")

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getUserById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }
    try {
        const user = await prisma.user.update({
            where: { id: id },
            data: { name, email, password, role },
        });
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = comparePass(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRATION }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || "user",
            },
        });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRATION }
        );

        res.status(201).json({
            message: "User registered successfully",
            token
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const virifyToken = (req, res) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).send({ authenticated: false, message: "No token found" });
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        return res.status(200).send({ authenticated: true });
    } catch (error) {
        return res.status(401).send({ authenticated: false });
    }
}

const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
}
module.exports = {
    signUp,
    login,
    getUsers,
    getUserById,
    updateUser,
    virifyToken,
    logout
};
