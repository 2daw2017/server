const Mongoose = require('mongoose');

const OrganizationSchema = Mongoose.Schema({
    _id: {
        type: Mongoose.SchemaTypes.ObjectId,
        default: Mongoose.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    logo: {
        type: String,
    },
}, { timestamps: true });

module.exports = Mongoose.model('Organization', OrganizationSchema);