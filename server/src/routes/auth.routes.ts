import { login, logout, me, register } from "@/controllers/auth.controller";
import { authenticate } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";
import { loginSchema, registerSchema } from "@/validations";
import { Router } from "express";

const router = Router();

// POST /api/auth/register - Register new user
router.post("/register", validate(registerSchema), register);

// POST /api/auth/login - Login
router.post("/login", validate(loginSchema), login);

// POST /api/auth/logout - Logout
router.post("/logout", logout);

// GET /api/auth/me - Get current user
router.get("/me", authenticate, me);

export default router;
