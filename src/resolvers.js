const { User } = require('./connectors');

let idCount = 0;
const users = []

const resolvers = {
    Query: {
        description: () => `This is the API for the project application`,
        users: () => {
            return User.find()
        },
        user: (parent, args) => {
            return User.findById(args.id);
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
        }
    },
    Subscription: {
        logins: {
            subscribe: (parent, args, { pubsub }) => {
                return pubsub.asyncIterator('logins')
            }
        }
    }
}

module.exports = resolvers;