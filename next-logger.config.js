// next-logger.config.js
const pino = require("pino");
const pretty = require("pino-pretty");
const { Writable } = require("stream");
const moment = require("moment");

const isLocalEnv = process.env.NODE_ENV === "development";

const prettyStream = pretty({
  levelFirst: false,
  colorize: true,
  ignore: "",
});

const customStream = new Writable({
  write(chunk, encoding, callback) {
    let logObject = JSON.parse(chunk.toString());

    // Rename 'hostname' to 'namespace'
    logObject.namespace = logObject.hostname;
    delete logObject.hostname;
    delete logObject.name;

    // write the modified log object directly to stdout
    process.stdout.write(JSON.stringify(logObject) + "\n");
    callback();
  },
});

// Create a logger instance for server-side logging
const serverLogger = (defaultConfig) =>
  pino(
    {
      ...defaultConfig,
      messageKey: "event",
      timestamp: () =>
        `,"created_at":"${moment(new Date()).format(
          "YYYY-MM-DDTHH:mm:ss.SSSZZ"
        )}"`,
      formatters: {
        level(label, number) {
          // map Pino levels to severity levels
          const severityMap = {
            fatal: 0,
            error: 1,
            warn: 2,
            info: 3,
            debug: 4,
            trace: 5,
          };
          return { severity: severityMap[label] || number };
        },
      },
    },
    customStream
  );

const clientLogger = (defaultConfig) =>
  pino(
    {
      ...defaultConfig,
      browser: {
        asObject: true,
      },
    },
    prettyStream
  );

const logger = (defaultConfig) =>
  isLocalEnv ? clientLogger(defaultConfig) : serverLogger(defaultConfig);

module.exports = {
  logger,
};
