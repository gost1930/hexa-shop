const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};


const comparePass = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};


const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION } 
    );
};


const isAuth = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};


const isAdmin = (req, res, next) => {
    const { user , role } = req.cookies;
    if (!user || role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};

module.exports = {
    hashPassword,
    comparePass,
    generateToken,
    isAuth,
    isAdmin,
};
