const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    participaints: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],

}, {
    timestamps: true
})

module.exports = mongoose.model("Conversation", conversationSchema, "chat-app__conversation");