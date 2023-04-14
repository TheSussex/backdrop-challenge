import loggerInit from "./loggerConfig";
import config from ".";

class Logger {
  logger() {
    // initialize logger for the right environment
    const logger = loggerInit(config.env);

    logger.info("Application starting...");
    logger.debug("Overriding Express logger");
    // checks if the log directory exists and starts streaming logs to the file

    return logger;
  }
}

export default new Logger().logger();
