//entry point
const express = require("express");
const app = express();
const helmet = require("helmet");
const path = require("path"); 

const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema")
const {graphqlHTTP} = require("express-graphql");

require("./config/dbConnection");
require("dotenv").config();

const typeDefs = loadFilesSync(path.join(__dirname, "**/*.graphql"))
const resolvers = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"))

app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === "production"? undefined: false
}));

console.log(typeDefs, resolvers);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})


app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(process.env.PORT, () =>
  console.log(`listening to port ${process.env.PORT}`)
);
