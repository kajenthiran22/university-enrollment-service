export const NODE_ENVS = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  TEST: "test",
} as const;

export const NODE_ENV_VALUES = [
  NODE_ENVS.DEVELOPMENT,
  NODE_ENVS.PRODUCTION,
  NODE_ENVS.TEST,
] as const;

export const LOG_LEVELS = {
  FATAL: "fatal",
  ERROR: "error",
  WARN: "warn",
  INFO: "info",
  DEBUG: "debug",
  TRACE: "trace",
} as const;

export const LOG_LEVEL_VALUES = [
  LOG_LEVELS.FATAL,
  LOG_LEVELS.ERROR,
  LOG_LEVELS.WARN,
  LOG_LEVELS.INFO,
  LOG_LEVELS.DEBUG,
  LOG_LEVELS.TRACE,
] as const;