const Chat = require("../models/Chat");

class chatController {
    async addMessage(req, res) {
        const { text, authorId, recieveId, dialogId, createdAt } = req.body

        const message = new Chat({ text, authorId: authorId._id, recieveId, dialogId, createdAt, updatedAt: createdAt })
        await message.save()
        res.json({status: 200, data: message})
    }

    async getMessages(req, res) {
        const { authorId, recieveId } = req.body

        const messages = await Chat
            .find(
                {
                    $or: [
                        { authorId, recieveId },
                        { authorId: recieveId, recieveId: authorId }
                    ]
                }
            )
            .skip(await Chat.count() - 10)
            .sort({ createdAt: 1 })
            .populate(['authorId', 'recieveId'])
            .lean()
        res.json({ status: 200, data: messages })
    }
}

module.exports = new chatController();