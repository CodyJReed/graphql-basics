import { GraphQLServer } from "graphql-yoga";

// Type def (schema)
const typeDefs = `
  type Query {
    hello: String!
  }
`;
// Resolvers
const resolvers = {
  Query: {
    hello() {
      return "Thanks from Andrew Mead!";
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});
server.start(() => console.log("The server is up..."));
