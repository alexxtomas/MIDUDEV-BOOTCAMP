import {
  gql,
  ApolloServer,
  UserInputError,
  AuthenticationError
} from 'apollo-server'
import jwt from 'jsonwebtoken'
import './db.js'
import Author from './models/Author.js'
import Book from './models/Book.js'
import User from './models/User.js'

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
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
    allBooks(author: String, genres: String): [Book]!
    allAuthors: [Author]!
    me: User
    booksByGenre(genre: String!): [Book]!
  }

  type Mutation {
    addAuthor(name: String!, born: Int): Author
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genres } = args
      const allBooks = await Book.find({}).populate('author')
      const filteringByAuthor = allBooks.filter(
        (book) => book.author.name === args.author
      )
      if (author && !genres) {
        return filteringByAuthor
      } else if (!author && genres) {
        const { genres } = args
        return Book.find({ genres }).populate('author')
      } else if (author && genres) {
        const filtredBooks = filteringByAuthor.filter((book) =>
          book.genres.includes(args.genres)
        )
        return filtredBooks
      }
      return allBooks
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')
      return currentUser
    },
    booksByGenre: async (root, args) => {
      const { genre } = args
      const books = await Book.find({}).populate('author')
      const filtredBooks = books.filter((book) => book.genres.includes(genre))
      return filtredBooks
    }
  },
  Author: {
    bookCount: async (root) => {
      const { name: authorName } = root
      const allBooks = await Book.find({}).populate('author')
      const filterdBooks = allBooks.filter(
        (book) => book.author.name === authorName
      )

      return filterdBooks.length
    }
  },
  Mutation: {
    addAuthor: async (root, args) => {
      const { name, born } = args
      const newAuthor = new Author({
        name,
        born
      })
      try {
        await newAuthor.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }
      return newAuthor
    },
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')
      const { author: authorName } = args
      let findingAuthor = await Author.findOne({ name: authorName })
      if (!findingAuthor) {
        const newAuthor = new Author({ name: authorName })
        await newAuthor.save()
        findingAuthor = newAuthor
      }
      const newBook = new Book({ ...args, author: findingAuthor })

      try {
        await newBook.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }

      return newBook
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')
      const { name, setBornTo } = args
      try {
        return await Author.findOneAndUpdate(
          { name },
          { born: setBornTo },
          {
            new: true
          }
        )
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
      const { username, favoriteGenre } = args
      const user = new User({
        username,
        favoriteGenre
      })

      try {
        await user.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }
      return user
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })
      if (!user || password !== 'alexpassword') {
        throw new UserInputError('Wrong Credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }

      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7)
      const { id } = jwt.verify(token, process.env.JWT_SECRET)

      const currentUser = await User.findById(id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
