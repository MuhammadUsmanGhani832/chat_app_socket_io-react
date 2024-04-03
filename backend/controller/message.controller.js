const Message = require('../model/message');
const Conversation = require('../model/conversation');
const { getSocketIdFromReceiverId,io } = require('../socket/socket');

const chatController = {
  async sendMessage(req, res, next) {
    try {
      const { message } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;


      let conversation = await Conversation.findOne({
        participaints: { $all: [senderId, receiverId] }
      })

      if (!conversation) {
        conversation = await Conversation.create({
          participaints: [senderId, receiverId]
        })
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        message
      })

      if (newMessage) {
        conversation.messages.push(newMessage._id)
      }

      await Promise.all([conversation.save(), newMessage.save()]);

      const getSockitId = getSocketIdFromReceiverId(receiverId)
      if (getSockitId) {
        io.to(getSockitId).emit("newMessage", newMessage)
      }

      res.status(201).json(newMessage)
    } catch (error) {
      console.log("Error in sendMessage controller ", error.message)
      return res.status(400).json({ error: error })
    }
  },

  async getMessages(req, res, next) {
    try {

      const { id: userToChatId } = req.params;
      const senderId = req.user._id;

      const conversation = await Conversation.findOne({
        participaints: { $all: [senderId, userToChatId] }
      }).populate('messages');
      if (!conversation) return res.status(200).json([])

      const messages = conversation.messages;
      res.status(200).json(messages);

    } catch (error) {
      console.log("Error in getMessage controller ", error.message)
      return res.status(400).json({ error: error })
    }
  }

}


module.exports = chatController;
