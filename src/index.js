import { GraphQLServer } from "graphql-yoga";

// Scalar types - String, boolean, int, float, ID

// Type def (schema)
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStore: Boolean!
  }
`;
// Resolvers
const resolvers = {
	Query: {
		id() {
			return "abc123";
		},
		name() {
			return "Sue";
		},
		age() {
			return 35;
		},
		employed() {
			return true;
		},
		gpa() {
			return null;
		},
		title() {
			return ".223 Federal Ammunition";
		},
		price() {
			return 37.99;
		},
		releaseYear() {
			return null;
		},
		rating() {
			return 4.8;
		},
		inStore() {
			return false;
		},
	},
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
});
server.start(() => console.log("The server is up..."));
