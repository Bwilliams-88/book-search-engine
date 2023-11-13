const typeDefs = `
    type Query {
        me: [User]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(name: String!, email: String!, password: String!): Auth
        saveBook:
        removeBook:
    }

    type User {
        id: ID
        username: String
        email: String
        bookCount: Integer
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        image:
        link:
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;
