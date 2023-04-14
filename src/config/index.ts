import dotenv from "dotenv";
import path from "path";
import ConfigInterface from './ConfigInterface';

dotenv.config({ path: path.join(__dirname, '../../.env') })
const env = process.env.NODE_ENV as 'development' | 'production';

if (!env) {
  throw new Error('Env required');
}

const config = require(`./${env}`).default; // eslint-disable-line import/no-dynamic-require, @typescript-eslint/no-var-requires

export default config as ConfigInterface;
