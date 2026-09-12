import { Router } from "express";
import { validate } from "@/middleware/validate.middleware";
import { registerSchema, loginSchema } from "@/validations";
import * as authController from "@/controllers/auth.controller";
import { authenticate } from "@/middleware/auth.middleware";

const router = Router();

// POST /api/auth/register - Register new user
router.post("/register", validate(registerSchema), authController.register);

// POST /api/auth/login - Login
router.post("/login", validate(loginSchema), authController.login);

// POST /api/auth/logout - Logout
router.post("/logout", authController.logout);

// GET /api/auth/me - Get current user
router.get("/me", authenticate, authController.me);

export default router;
