const Query = {
  users(parent, args, { db }, info) {
    if (args.query) {
      return db.users.filter(
        (user) => user.name.toLowerCase() === args.query.toLowerCase()
      );
    } else {
      return db.users;
    }
  },
  posts(parent, args, { db }, info) {
    if (args.query) {
      return db.posts.filter((post) => {
        if (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        ) {
          return post;
        }
      });
    } else {
      return db.posts;
    }
  },
  comments(parent, args, { db }, info) {
    if (args.query) {
      return db.comments.filter((comment) => {
        if (comment.text.toLowerCase().includes(args.query.toLowerCase())) {
          return comment;
        }
      });
    } else {
      return db.comments;
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
};

export { Query as default };
