import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { BuildSchemaOptions } from 'type-graphql';

export default interface ConfigInterface {
  readonly env: 'development' | 'test' | 'staging' | 'production';
  readonly database: PostgresConnectionOptions;
  readonly graphQLPath: string;
  readonly resolvers: BuildSchemaOptions['resolvers'];
  readonly paystackSecretkey: string | any;
}
