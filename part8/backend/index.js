require("dotenv").config();
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

mongoose.set("strictQuery", false);
console.log("connecting to", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate("author");
      return books.filter((book) => book.author.name === root.name).length;
    },
  },
  Query: {
    bookCount: async () => {
      return Book.collection.countDocuments();
    },
    authorCount: async () => {
      return Author.collection.countDocuments();
    },
    allBooks: async (root, args) => {
      let ret = await Book.find({}).populate("author");
      if (args.author)
        ret = ret.filter((book) => book.author.name === args.author);
      if (args.genre)
        ret = ret.filter((book) => book.genres.includes(args.genre));
      return ret;
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("not authenticated");
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      const book = new Book({ ...args, author });
      try {
        await book.save();
        return book;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("not authenticated");
      const author = await Author.findOne({ name: args.name });
      if (!author) return null;
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });
      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
