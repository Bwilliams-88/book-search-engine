const typeDefs = `
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        saveBook(data: ID): User 
        removeBook(bookId: ID!): User 
    }

    type User {
        id: ID
        firstName: String
        lastName: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;
