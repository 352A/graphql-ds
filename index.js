import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schema.js";
import api from "./api.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 5000 },
  context: async () => {
    return {
      dataSources: {
        userAPI: new api(),
      },
    };
  },
});

console.log(`Server ready at ${url}`);
