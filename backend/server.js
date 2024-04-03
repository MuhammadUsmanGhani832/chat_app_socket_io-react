const express = require('express');
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message");
const usersRoutes = require("./routes/users.routes");
const DB_connection = require("./mongodb/mongodb");
const cookieParser = require("cookie-parser");
var cors = require('cors');
const { app, server } = require("./socket/socket")


dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000', // Replace YOUR_PORT_NUMBER with your actual port number
    credentials: true // This allows cookies to be sent along with the request
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res, next) => {
    res.send("hello world!")
})
app.use("/chatapp/auth", authRoutes);
app.use("/chatapp/message", messageRoutes);
app.use("/chatapp/users", usersRoutes);


DB_connection();
server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})