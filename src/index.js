import { GraphQLServer } from "graphql-yoga";

// Scalar types - String, boolean, int, float, ID

// Demo user data
const users = [
	{
		id: "1",
		name: "Cody",
		email: "cody@email.com",
		age: 35,
	},
	{
		id: "2",
		name: "Indigo",
		email: "indy@email.com",
	},
];

const posts = [
	{
		id: "1",
		title: "How I met your mom",
		body: "There once was a little old lady...",
		published: false,
	},
	{
		id: "2",
		title: "Susan Clark",
		body: 'A "keen" shop steward',
		published: true,
	},
];

// Type def (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;
// Resolvers
const resolvers = {
	Query: {
		users(parent, args, ctx, info) {
			if (args.query) {
				return users.filter(
					user => user.name.toLowerCase() === args.query.toLowerCase()
				);
			} else {
				return users;
			}
		},
		posts(parent, args, ctx, info) {
			if (args.query) {
				return posts.filter(post => {
					if (
						post.title.toLowerCase().includes(args.query.toLowerCase()) ||
						post.body.toLowerCase().includes(args.query.toLowerCase())
					) {
						return post;
					}
				});
			} else {
				return posts;
			}
		},
		me() {
			return {
				id: "123abc",
				name: "creed",
				email: "cody@email.com",
				age: 35,
			};
		},
		post() {
			return {
				id: "def456",
				title: ".223 Federal Ammunition",
				body: "A certain type of ammo with an array of case uses",
				published: true,
			};
		},
	},
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
});
server.start(() => console.log("The server is up..."));
