const User = require('../model/userModel');
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "unauthorized! token not provided" })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET).userId;

        const user = await User.findOne({ _id: decode }).select("-password");

        if (!user) {
            return res.status(401).json({ message: "unauthorized! user not found wrong token" })
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("error in auth", error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = auth;