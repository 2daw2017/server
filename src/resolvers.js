const { User, Conversation, ConversationMember, Message } = require('./connectors');

const resolvers = {
    Query: {
        description: () => `This is the API for the project application`,
        users: () => {
            return User.find()
        },
        user: (parent, args) => {
            return User.findById(args.id);
        },
        conversation: (parent, args) => {
            return Conversation.findById(args.id);
        },
        conversations: (parent, args) => {
            return Conversation.find({
                members: args.userId
            })
        },
    },
    Mutation: {
        signup: (parent, args) => {
            return new User(args).save()
        },
        login: (parent, args, { pubsub }) => {
            const user = User.findOne(args)
            // Before returning, publish to channel 'logins' the new login
            if (user) pubsub.publish('logins', { logins: user })
            return user
        },
        createConversation: (parent, args, { pubsub }) => {
            return new Conversation(args).save().then(conversation => {
                conversation.members.push(args.admin);
                return conversation.save();
            });
        },
        createMessage: (parent, args, { pubsub }) => {
            return new Message(args).save().then(message => {
                pubsub.publish(args.conversation, { conversation: message })
                return message;
            })
        },
    },
    Subscription: {
        logins: {
            subscribe: (parent, args, { pubsub }) => {
                return pubsub.asyncIterator('logins')
            }
        },
        conversation: {
            subscribe: (parent, args, { pubsub }) => {
                return pubsub.asyncIterator(args.id)
            }
        }
    },
    User: {
        conversations: (parent) => {
            return Conversation.find({members: parent.id});
        }
    },
    Conversation: {
        admin: (parent) => {
            return User.findById(parent.admin);
        },
        messages: (parent) => {
            return Message.find({ conversation: parent.id })
        },
        members: (parent) => {
            return User.find({
                _id: { $in: parent.members }
            })
        }
    },
    Message: {
        sender: (parent) => {
            return User.findById(parent.sender)
        },
        conversation: (parent) => {
            return Conversation.findById(parent.conversation)
        }
    },
}

module.exports = resolvers;