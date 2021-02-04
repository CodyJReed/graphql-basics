import { GraphQLServer } from "graphql-yoga";

// Scalar types - String, boolean, int, float, ID

// Type def (schema)
const typeDefs = `
  type Query {
    add(a: Float!, b: Float!): Float!
    greeting(name: String, position: String): String!
    me: User!
    ammo: Product!
  }

  type User {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }

  type Product {
    id: ID!
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
		add(parent, args, ctx, info) {
			return args.a + args.b;
		},
		greeting(parent, args, ctx, info) {
			return !args.name && args.position
				? "Hello"
				: `Hello ${args.name}, whom is a great ${args.position}`;
		},
		me() {
			return {
				id: "123abc",
				name: "creed",
				age: 35,
				employed: true,
			};
		},
		ammo() {
			return {
				id: "def456",
				title: ".223 Federal Ammunition",
				price: 47.99,
				releaseYear: 1876,
				rating: 4.9,
				inStore: false,
			};
		},
	},
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
});
server.start(() => console.log("The server is up..."));
