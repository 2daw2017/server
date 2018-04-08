const { 
    User, 
    Conversation, 
    ConversationMember, 
    Message, 
    Organization, 
    Role, 
    Member 
} = require('./connectors');

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
        organization: (parent, args) => {
            return Organization.findById(args.id);
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
        createOrganization: async (parent, args, { pubsub }) => {
            const organization = new Organization({ name: args.name, logo: args.logo });
            const role = new Role({ organization: organization._id, name: 'owner' });
            const member = new Member({ organization: organization._id, user: args.creator, role: role._id });
            if(organization.validate() && role.validate() && member.validate()) {
                await organization.save()
                await role.save()
                await member.save()
                return organization
                // return organization.save()
                //     .then(() => {
                //         return role.save()
                //         .then(() => {
                //             return member.save();
                //         })
                //     })
            }
            // return new Organization(args).save()
            //     .then(organization => {
            //         const ownerRole = new Role({
            //             organization: organization._id,
            //             name: 'owner'
            //         });
            //     ownerRole.save().then(role => {
            //         ownerMember = new Member({
            //             organization: organization._id,
            //             role: role._id,
            //             user: args.user
            //         })
            //         return ownerRole.save();
            //     })
            // })
        },
        createRole: async (parent, args, { pubsub }) => {
            return new Role(args).save()
        },
        addMember: async (parent, args, { pubsub }) => {
            return new Member(args).save()
        }
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
    Organization: {
        roles: (parent) => {
            return Role.find({ organization: parent.id })
        },
        members: (parent) => {
            return Member.find({ organization: parent.id })
        }
    },
    Role: {
        organization: (parent) => {
            return Organization.findById(parent.organization)
        }
    },
    Member: {
        organization: (parent) => {
            return Organization.findById(parent.organization)
        },
        user: (parent) => {
            return User.findById(parent.user)
        },
        role: (parent) => {
            return Role.findById(parent.role)
        }
    }
}

module.exports = resolvers;