import winston, { format } from "winston";

import ConfigInterface from "./ConfigInterface";

const loggerConfig = (env?: ConfigInterface[ 'env' ]) => {
    const DOMAIN = ""
    const { combine, timestamp, label, printf, splat, simple } = format;


    let ret;
    const loggerFormat = printf(({ level, message, label, timestamp }) => (
        `${ new Date(timestamp).toISOString() } [${ label }] [${ level }] : ${ message }`
    ));
    switch (env) {
        case "development":
            if (DOMAIN.includes("localhost")) {
                ret = winston.createLogger({
                    format: combine(
                        splat(),
                        simple(),
                        timestamp(),
                        label({ label: env }),
                        loggerFormat
                    ),
                    transports: [
                        new winston.transports.Console({
                            level: "debug",
                            handleExceptions: true,
                        }),
                        new winston.transports.File({
                            level: "info",
                            filename: "./server.log",
                            handleExceptions: true,
                            maxsize: 5242880,
                            maxFiles: 5,
                        })
                    ],
                    exitOnError: false
                });
            } else {
                ret = winston.createLogger({
                    format: combine(
                        splat(),
                        simple(),
                        timestamp(),
                        label({ label: env }),
                        loggerFormat
                    ),
                    transports: [
                        new winston.transports.Console({
                            level: "debug",
                            handleExceptions: true,
                        }),
                        new winston.transports.File({
                            level: "info",
                            filename: "./server.log",
                            handleExceptions: true,
                            maxsize: 5242880,
                            maxFiles: 5,
                        }),
                    ],
                    exitOnError: false
                });
            }
            break;
        case "test":
            ret = winston.createLogger({
                format: combine(
                    splat(),
                    simple(),
                    timestamp(),
                    label({ label: env }),
                    loggerFormat
                ),
                transports: [
                    new winston.transports.File({
                        level: "info",
                        filename: "./test.log",
                        handleExceptions: true,
                        maxsize: 5242880,
                        maxFiles: 50,
                    })
                ],
                exitOnError: false
            });
            break;
        case "staging":
            ret = winston.createLogger({
                format: combine(
                    splat(),
                    simple(),
                    timestamp(),
                    label({ label: env }),
                    loggerFormat
                ),
                transports: [
                    new winston.transports.File({
                        level: "info",
                        filename: "./server.log",
                        handleExceptions: true,
                        maxsize: 5242880,
                        maxFiles: 50,
                    }),
                ],
                exitOnError: false
            });
            break;
        case "production":
            ret = winston.createLogger({
                format: combine(
                    splat(),
                    simple(),
                    timestamp(),
                    label({ label: env }),
                    loggerFormat
                ),
                transports: [
                    new winston.transports.Console({
                        level: "error",
                        handleExceptions: true,
                    }),
                    new winston.transports.File({
                        level: "info",
                        filename: "./server.log",
                        handleExceptions: true,
                        maxsize: 5242880,
                        maxFiles: 100,
                    }),
                ],
                exitOnError: false
            });
            break;
        default:
            ret = winston.createLogger({
                format: combine(
                    splat(),
                    simple(),
                    timestamp(),
                    label({ label: env }),
                    loggerFormat
                ),
                transports: [
                    new winston.transports.Console({
                        level: "debug",
                        handleExceptions: true,
                    })
                ],
                exitOnError: false
            });
    }
    return ret;
}

export default loggerConfig