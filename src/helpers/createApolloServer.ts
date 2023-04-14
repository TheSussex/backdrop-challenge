import { ApolloServer, Config as ApolloServerConfig } from 'apollo-server-express';

import { createSchema } from './createSchema';

export default function createApolloServer(apolloServerConfig?: ApolloServerConfig) {
  const apolloServer = new ApolloServer({
    debug: true,
    schema: createSchema(),
    ...apolloServerConfig,
  });

  return apolloServer;
}
