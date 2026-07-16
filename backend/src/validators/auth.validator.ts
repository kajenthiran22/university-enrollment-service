import { z } from "zod";

export const studentRegisterSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(1, "Password is required."),
    confirmPassword: z.string().min(1, "Confirm password is required."),
    registrationNumber: z.string().min(1, "Registration number is required."),
    name: z.string().min(1, "Name is required."),
    dateOfBirth: z.coerce.date("Invalid date of birth."),
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

export const lecturerRegisterSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(1, "Password is required."),
    confirmPassword: z.string().min(1, "Confirm password is required."),
    employeeId: z.string().min(1, "Employee id is required."),
    name: z.string().min(1, "Name is required."),
    designation: z.string().min(1, "Designation is required."),
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