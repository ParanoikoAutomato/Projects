import winston, { createLogger, format, transports } from "winston";

const timestampFormat = "MMM-DD-YYYY HH:mm:ss";
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "winston custom format";

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [
    //new transports:
    new transports.File({
      filename: "logs/server.log",
    }),
    new transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
  ],
});

export default logger;
