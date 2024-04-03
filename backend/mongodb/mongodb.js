const mongoose = require("mongoose");

const mongodbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB connected");
    } catch (error) {
        return console.log('error connecting to db', error.message);
    }
}

module.exports = mongodbConnection;