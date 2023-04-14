import express from 'express';
import 'reflect-metadata';
import config from './config';
import createApolloServer from './helpers/createApolloServer';
import { getConnection } from './helpers/database';

const PORT = process.env.PORT || 3000;
const app = express();

const apolloServer = createApolloServer();

(async () => {
  await getConnection();
  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: config.graphQLPath });
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${ PORT }`);
  });
})();
