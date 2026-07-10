import pino, { stdTimeFunctions, type LoggerOptions } from "pino";
import { config } from "../config";
import { NODE_ENVS } from "../constants/env.constants";

const options: LoggerOptions = {
  level: config.LOG_LEVEL,
  timestamp: stdTimeFunctions.isoTime,
  serializers: {
    err: pino.stdSerializers.err,
  },
};

if (config.NODE_ENV !== NODE_ENVS.PRODUCTION) {
  options.transport = {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  };
}

export const logger = pino(options);