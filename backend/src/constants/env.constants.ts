export const NODE_ENVS = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  TEST: "test",
} as const;

export const NODE_ENV_VALUES = Object.values(NODE_ENVS);

export const LOG_LEVELS = {
  FATAL: "fatal",
  ERROR: "error",
  WARN: "warn",
  INFO: "info",
  DEBUG: "debug",
  TRACE: "trace",
} as const;

export const LOG_LEVEL_VALUES = Object.values(LOG_LEVELS);