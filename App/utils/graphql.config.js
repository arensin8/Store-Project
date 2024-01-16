const { graphQlSchema } = require("../graphQL/index.graphql");

function graphqlConfig(req,res){
    return {
        schema : graphQlSchema,
        graphiql : true,
        context : {req,res}
    }
}

module.exports = {
    graphqlConfig
}