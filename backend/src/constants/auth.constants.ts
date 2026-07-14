export const USER_ROLES = {
  ADMIN: "admin",
  LECTURER: "lecturer",
  STUDENT: "student",
} as const;

export const USER_ROLE_VALUES = [
  USER_ROLES.ADMIN,
  USER_ROLES.LECTURER,
  USER_ROLES.STUDENT,
] as const;

export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
} as const;

export const USER_STATUS_VALUES = Object.values(USER_STATUS);

export const JWT = {
  ACCESS_TOKEN_EXPIRES_IN: "1m",
  REFRESH_TOKEN_EXPIRES_IN: "1d"
} as const;

export const HASHING = {
  SALT_ROUNDS: "12"
} as const;