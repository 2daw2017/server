const Mongoose = require('mongoose');

const ConversationSchema = Mongoose.Schema({
    _id: {
        type: Mongoose.SchemaTypes.ObjectId,
        default: Mongoose.Types.ObjectId,
    },
    admin: {
        type: Mongoose.SchemaTypes.ObjectId,
        required: true
    },
    members: [{
        type: Mongoose.SchemaTypes.ObjectId,
        required: true
    }],
}, { timestamps: true });

module.exports = Mongoose.model('Conversation', ConversationSchema);