const Message = require("../models/Message");
const Dialog = require("../models/Dialog");

class chatController {
    async addMessage(req, res) {
        const { text, recieveId, dialogId, createdAt } = req.body;

        const authorId = req.user.id;
        let preparedDialog = dialogId;

        if (!dialogId) {
            const newDialog = new Dialog({ authorId, recieveId, createdAt, updatedAt: createdAt });
            await newDialog.save();

            preparedDialog = newDialog._id;
        }
        

        const newMessage = new Message({ text, authorId, recieveId, dialogId: preparedDialog, createdAt, updatedAt: createdAt });
        await newMessage.save();

        await Message.populate(newMessage, ['authorId', 'recieveId']);
        
        res.json({status: 200, data: newMessage});
    }

    async getMessages(req, res) {
        const { dialogId, step = 20, sorting = 1 } = req.body;

        const authorId = req.user.id;

        const messagesCount = await Message.find({ dialogId }).count();

        const messages = await Message
            .find({ dialogId })
            .skip(messagesCount > 20 ? messagesCount - step : 0)
            .limit(20)
            .sort({ createdAt: sorting })
            .populate(['authorId', 'recieveId'])
            .lean()
        res.json({ status: 200, data: messages, count: messagesCount })
    }

    async getDialogs(req, res) {
        const authorId = req.user.id;

        const dialogs = await Dialog
            .find(
                {
                    $or: [
                        { authorId },
                        { recieveId: authorId }
                    ]
                }
            )
            .sort({ updatedAt: -1 })
            .populate(['authorId', 'recieveId'])
            .lean()
        res.json({ status: 200, data: dialogs })
    }
}

module.exports = new chatController();