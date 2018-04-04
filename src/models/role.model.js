const Mongoose = require('mongoose');

const RoleSchema = Mongoose.Schema({
    _id: {
        type: Mongoose.SchemaTypes.ObjectId,
        default: Mongoose.Types.ObjectId,
    },
    organization: {
        type: Mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = Mongoose.model('Role', RoleSchema);