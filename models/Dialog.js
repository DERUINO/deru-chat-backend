const { model, Schema, Types } = require('mongoose')
const ObjectId = Schema.ObjectId

const Dialog = new Schema({
    authorId: { type: ObjectId, required: true, ref: 'Account' },
    recieveId: { type: ObjectId, required: true, ref: 'Account' },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
})

module.exports = model('Dialog', Dialog)