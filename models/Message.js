const { model, Schema, Types } = require('mongoose')
const ObjectId = Schema.ObjectId

const Message = new Schema({
    dialogId: { type: ObjectId, required: true },
    text: { type: String, required: true },
    authorId: { type: ObjectId, required: true, ref: 'Account' },
    recieveId: { type: ObjectId, required: true, ref: 'Account' },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
})

module.exports = model('Message', Message)