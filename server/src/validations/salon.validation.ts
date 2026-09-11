import { z } from "zod";

export const createSalonSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    phone: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const updateSalonSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
    phone: z.string().optional(),
    description: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid("Invalid salon ID"),
  }),
});
