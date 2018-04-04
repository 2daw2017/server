const Mongoose = require('mongoose');

const MemberSchema = Mongoose.Schema({
    _id: {
        type: Mongoose.SchemaTypes.ObjectId,
        default: Mongoose.Types.ObjectId,
    },
    organization: {
        type: Mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    user: {
        type: Mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    role: {
        type: Mongoose.SchemaTypes.ObjectId,
        required: true,
    },
}, { timestamps: true });

module.exports = Mongoose.model('Member', MemberSchema);