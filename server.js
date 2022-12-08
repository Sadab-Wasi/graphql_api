const path = require('path')

const express = require('express')
const morgan = require('morgan')
const { graphqlHTTP } = require('express-graphql')


const PORT = 3000
const HOST = 'localhost'


// GraphQL map
const user_graphql_schema = require('./graphql/schemas/user_schema')
const user_graphql_resolver = require('./graphql/resolvers/user_resolver')


const app = express()

// Genearte request info
app.use(morgan('dev'))

// Headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Context-Type, Accept, Authorization')
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST')
        return res.status(200).json({})
    }
    next()
})


// GraphQL API
app.use(
    '/user',
    graphqlHTTP({
        schema: user_graphql_schema,
        rootValue: user_graphql_resolver,
        graphiql: true,
        customFormatErrorFn(err) {
            // console.log('GraphQL format errors')
            // console.log(err)

            if (!err.originalError) {
                return err
            }

            const data = err.originalError.data
            const message = err.message
            const code = err.originalError.code || 500

            return {
                message: message,
                status: code,
                data: data
            }
        }
    })
)



// All errors code comes through here
app.use((error, req, res, next) => {

    res.status(error.code || 500)
    res.json({
        error: {
            message: error.message
        }
    })

})


app.listen(PORT, function () {
    console.log(`Listening on : http://${HOST}:${PORT}`)
})