const Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;
const mongo = Mongoose.connect('mongodb://localhost/projectoA', {
    useMongoClient: true
});

const User = require('./models/user.model');
const Conversation = require('./models/conversation.model');
const Message = require('./models/message.model');
const Organization = require('./models/organization.model');
const Role = require('./models/role.model');
const Member = require('./models/member.model');

module.exports = { 
    User,
    Conversation,
    Message,
    Organization,
    Role,
    Member,
};