const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const genrateJWTToken = require('../jwtServices/jwtServices')


const authControler = {
    async register(req, res, next) {
        try {
            const { fullName, username, gender, password, confirmPassword } = req.body;

            if (password !== confirmPassword) {
                return res.status(400).json({ error: "Password dont match" })
            }

            const user = await User.findOne({ username });

            if (user) {
                return res.status(400).json({ error: "Username already exists" })
            }

            // HASH password here
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            const boysProfilePic = `https://avatar.iran.liara.run/public/boy/?username=${username}`;
            const girlsProfilePic = `https://avatar.iran.liara.run/public/girl/?username=${username}`;

            const newUser = new User({
                fullName,
                username,
                password: hashPassword,
                profilePic: gender === "male" ? boysProfilePic : girlsProfilePic,
                gender
            })

            if (newUser) {
                genrateJWTToken(newUser._id, res)
                await newUser.save();
                res.status(201).json({
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    profilePic: newUser.profilePic,
                    gender: newUser.gender,
                    username: newUser.username
                })
            }
        } catch (error) {
            console.log("error in register controller ", error.message)
            return res.status(400).json({ error: error })
        }
    },


    async signin(req, res, next) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });
            const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

            if (!user || !isPasswordCorrect) {
                return res.status(400).json({ error: "Invalid username or password" })
            }

            genrateJWTToken(user._id, res);


            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                profilePic: user.profilePic,
                gender: user.gender,
                username: user.username
            })
        } catch (error) {
            console.log("error in login controller ", error.message)
            return res.status(400).json({ error: error })
        }
    },


    async logout(req, res, next) {
        try {
            res.cookie("jwt", '', { maxAge: '0' })
            res.status(200).json({ message: "logout successfully" })
        } catch (error) {
            console.log("error in logout controller ", error.message)
            return res.status(400).json({ error: error })
        }
    },
}



module.exports = authControler;