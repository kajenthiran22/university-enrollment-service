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
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export const USER_STATUS_VALUES = Object.values(USER_STATUS);

export const JWT = {
  ACCESS_TOKEN_EXPIRES_IN: "15m",
  REFRESH_TOKEN_EXPIRES_IN: "1d"
} as const;

export const HASHING = {
  SALT_ROUNDS: "10"
} as const;