// eslint-disable-next-line 
import * as winston from 'winston';
declare global {
    namespace NodeJS {
        interface Global {
            logger: typeof winston.Logger;
        }
    } const logger: winston.Logger;
}