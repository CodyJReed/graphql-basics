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
    author: "2",
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
    post: "2",
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

const db = {
  users,
  posts,
  comments,
};

export { db as default };
