import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(1, "Password is required."),
    confirmPassword: z.string().min(1, "Confirm password is required."),
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