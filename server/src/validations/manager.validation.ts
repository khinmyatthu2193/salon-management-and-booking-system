import { z } from "zod";

export const createManagerSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string().min(1, "Name is required"),
    phone: z.string().optional(),
  }),
});

export const assignManagerSchema = z.object({
  body: z.object({
    salonId: z.string().uuid("Invalid salon ID"),
  }),
});
