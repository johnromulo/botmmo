const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const fs = require("fs");
const path = require("path");

// transports.console,
// transports.file

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp}  ${level}: ${message}`;
});

const logger = createLogger({
  transports: [
    new transports.Console({
      format: combine(timestamp(), myFormat),
    }),
    new transports.File({
      filename: "logs/history.log",
      format: combine(timestamp(), myFormat),
    }),
  ],
});

const logger2 = createLogger({
  transports: [
    new transports.Console({
      format: combine(timestamp(), myFormat),
    }),
    new transports.File({
      filename: "logs/doc.log",
      format: combine(timestamp(), myFormat),
    }),
  ],
});

async function run() {
  logger.log({
    level: "info",
    message: "teste",
  });

  logger2.log({
    level: "info",
    message: "teste",
  });
}

run();
