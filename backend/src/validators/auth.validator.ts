import { z } from "zod";
import { USER_ROLE_VALUES } from "../constants/auth.constants";

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(1, "Password is required."),
    confirmPassword: z.string().min(1, "Confirm password is required."),
    role: z.enum(USER_ROLE_VALUES, { error: "Invalid user role." }),
  })
    .refine(
      (data) => data.password === data.confirmPassword,
      {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      },
    ),

  params: z.object({}),

  query: z.object({}),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(1, "Password is required."),
  }),

  params: z.object({}),

  query: z.object({}),
});