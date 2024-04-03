const User = require("../model/userModel")

const Users = {
    async getUserForHome(req, res, next) {
        try {
            const logInUserId = req.user._id;

            const findUsers = await User.find({
                _id: { $ne: logInUserId }
            }).select('-password')

            res.status(200).json(findUsers)
        } catch (error) {
            console.log("error in getUserForHome", error.message);
            return res.status(500).json({ message: 'internal server error' })
        }
    }
}

module.exports = Users;