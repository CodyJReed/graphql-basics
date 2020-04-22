import { GraphQLServer } from "graphql-yoga";

// Type def (schema)
const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String
  }
`;
// Resolvers
const resolvers = {
  Query: {
    hello() {
      return "Thanks from Andrew Mead!";
    },
    name() {
      return "Sue";
    },
    location() {
      return "The windy city";
    },
    bio() {
      return "There once was a boy named Sue...";
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});
server.start(() => console.log("The server is up..."));
