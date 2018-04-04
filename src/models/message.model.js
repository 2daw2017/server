const Mongoose = require('mongoose');

const MessageSchema = Mongoose.Schema({
    _id: {
        type: Mongoose.SchemaTypes.ObjectId,
        default: Mongoose.Types.ObjectId,
    },
    conversation: {
        type: Mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    sender: {
        type: Mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = Mongoose.model('Message', MessageSchema);