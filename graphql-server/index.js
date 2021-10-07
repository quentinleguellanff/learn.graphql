const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema');
const mysql = require('mysql')


let users = [
  {
    id: 1,
    email: 'quentinleguellanff@gmail.com',
    password: 'test',
    firstname: 'quentin',
    lastname: 'Le Guellanff',
  },
  {
    id: 2,
    email: 'olivierrandria@gmail.com',
    password: 'test',
    firstname: 'Olivier',
    lastname: 'Randria',
  }
];

const db = mysql.createConnection({
  host: 'localhost',
  database: 'nodejs',
  user : 'root',
  password: ''
})

db.connect((err) => {
  if(err){
    console.log(err.message)
  }
  else{
    console.log("connected")
    
  }
})


const resolvers = {
    Query: {
      users() {
        return users
      },
      user(parent, args, context, info) {
        return users.find(user => user.id === args.id)
      },
      post(parent, args, context, info) {
        return posts.find(post => post.id === args.id)
      },
    },
    Mutation: {
      register(parent, args, context, info){
        let user = {
          email: args.email,
          password : args.password,
          firstname : args.firstname,
          lastname : args.lastname
        }
        db.query('INSERT INTO user(email,password,firstName,lastName) VALUES (?,?,?,?)', [args.email,args.password,args.firstname,args.lastname], function(err,result){
          if(err){
            console.log(err.message)
          }
          else{
            console.log(result)
            console.log(user)
          }
        })
        users.push(user)
        return user
      },
      createPost(parent,args,context,info){
        return Post
      }

    }
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});