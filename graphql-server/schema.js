const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID
        email: String
        password: String
        firstname: String
        lastname: String
    }
    type Post {
        id: Int
        author: User
        comments: [Post]
        content: String
        createdAt: String
        updatedAt: String
    }
    
    type Query {
        users: [User],
        user(id: ID!): User,
        posts: [Post],
        post(id: ID!): Post,

    }

    input PostInput {
        author: UserInput
        content: String
        createdAt: String
        updatedAt: String
    }

    input UserInput {
        email: String
        password: String
        firstname: String
        lastname: String
    }

    type Mutation {
        register(email: String!, password: String!, firstname: String, lastname: String) : User
        createPost(author: UserInput, content: String!, createdAt: String!, updatedAt: String) : Post
    }
`;

module.exports = typeDefs;