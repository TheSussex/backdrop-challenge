import config from './index';

const dbConfig = {
  ...config.database,
  synchronize: true,
};

module.exports = dbConfig;
