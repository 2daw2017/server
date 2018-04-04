const Mongoose = require('mongoose');

const UserSchema = Mongoose.Schema({
    _id: {
        type: Mongoose.SchemaTypes.ObjectId,
        default: Mongoose.Types.ObjectId,
    },
    dni: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
}, { timestamps: true });

module.exports = Mongoose.model('User', UserSchema);