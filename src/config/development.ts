import ConfigInterface from './ConfigInterface';

const PORT = Number(process.env.DATABASE_PORT)

const config: ConfigInterface = {
  env: 'development',
  paystackSecretkey: process.env.PAYSTACK_SECRET_KEY,
  database: {
    type: 'postgres' as const,
    host: process.env.HOST || 'localhost',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    port: PORT || 5432,
    cache: false,
    database: process.env.DATABASE,
    dropSchema: false,
    entities: ['src/entities/*.ts'],
    logger: 'advanced-console' as const,
    synchronize: true,
  },
  graphQLPath: '/graphql',
  resolvers: [`${__dirname}/../resolvers/**/*Resolver.ts`],
};

export default config;
