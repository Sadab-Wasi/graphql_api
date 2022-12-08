const { buildSchema } = require('graphql')

const schema = /*sql*/`
    type user {
        id: String!
        name: String!
        email: String!
        total_amount: Float!
    }

    type RootQuery {
        all_user: [user]!
        
        one_user(
            id: String!
        ): user!
    }

    type RootMutation {
        register_user (
            name: String!,
            email: String!,
            password: String!
        ): user!

        deposit_amount (
            id: String!,
            amount: Float!
        ): user!

        withdrawal_amount (
            id: String!,
            amount: Float!
        ): user!

    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`

module.exports = buildSchema(schema)