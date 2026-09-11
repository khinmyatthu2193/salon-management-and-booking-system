import { Router } from "express";
import { validate } from "@/middleware/validate.middleware";
import { registerSchema, loginSchema } from "@/validations";
import * as authController from "@/controllers/auth.controller";

const router = Router();

// POST /api/auth/register - Register new user
router.post("/register", validate(registerSchema), authController.register);

// POST /api/auth/login - Login
router.post("/login", validate(loginSchema), authController.login);

export default router;
