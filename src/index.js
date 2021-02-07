import { GraphQLServer } from "graphql-yoga";
import { v4 as uuidv4 } from "uuid";

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
    author: "1",
  },
  {
    id: "2",
    title: "Susan Clark",
    body: 'A "keen" shop steward',
    published: true,
    author: "1",
  },
];

const comments = [
  {
    id: "1",
    text: "This has been fun so far",
    author: "1",
    post: "1",
  },
  {
    id: "2",
    text: "Yes, I would agree with the comment before",
    author: "2",
    post: "1",
  },
  {
    id: "3",
    text: "I have no idea what the two of you are talking about; this sucks!",
    author: "2",
    post: "1",
  },
];

// Type def (schema)
const typeDefs = ` 
type Mutation {
	createUser(data: CreateUserInput!): User!
	createPost(data: CreatePostInput!): Post!
	createComment(data: CreateCommentInput!): Comment!
}

input CreateUserInput {
	name: String!
	email: String!
	age: Int
}

input CreatePostInput {
	title: String!
	body: String!,
	published: Boolean!
	author: ID!
}

input CreateCommentInput {
	text: String!
	author: ID!
	post: ID!
}

  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
		comments(query: String): [Comment!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
		posts: [Post!]!
		comments: [Comment!]
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
		author: User!
		comments: [Comment!]!
  }

	type Comment {
		id: ID!
		text: String!
		author: User!
		post: Post!
	}
`;
// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (args.query) {
        return users.filter(
          (user) => user.name.toLowerCase() === args.query.toLowerCase()
        );
      } else {
        return users;
      }
    },
    posts(parent, args, ctx, info) {
      if (args.query) {
        return posts.filter((post) => {
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
    comments(parent, args, ctx, info) {
      if (args.query) {
        return comments.filter((comment) => {
          if (comment.text.toLowerCase().includes(args.query.toLowerCase())) {
            return comment;
          }
        });
      } else {
        return comments;
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
  // --- Create ---
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.data.email);

      if (emailTaken) {
        throw new Error("Email taken.");
      }

      const user = {
        id: uuidv4(),
        ...args.data,
      };

      users.push(user);

      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);

      if (!userExists) {
        throw new Error("User doesn't exist");
      }

      const post = {
        id: uuidv4(),
        ...args.data,
      };

      posts.push(post);

      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);
      const postExists = posts.some(
        (post) => post.id === args.data.post && post.published
      );

      if (!userExists) {
        throw new Error("User not found");
      }

      if (!postExists) {
        throw new Error("Post not found");
      }

      const comment = {
        id: uuidv4(),
        ...args.data,
      };

      comments.push(comment);

      return comment;
    },
  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => parent.id === comment.post);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => parent.id === post.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => parent.id === comment.author);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === parent.post);
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});
server.start(() => console.log("The server is up..."));
