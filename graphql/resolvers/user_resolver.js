const user_query = require('./user_query')
const user_mutation = require('./user_mutation')

const resolvers = {
    ...user_query,
    ...user_mutation
}

module.exports = resolvers