import { Router } from "express";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";
import { addStaffSchema } from "@/validations";
import * as staffController from "@/controllers/staff.controller";

const router = Router({ mergeParams: true });

// GET /api/salons/:salonId/staff - List salon staff (OWNER + MANAGER)
router.get("/", authenticate, authorize("owner", "manager"), staffController.getSalonStaff);

// POST /api/salons/:salonId/staff - Add staff to salon (OWNER + MANAGER)
router.post("/", authenticate, authorize("owner", "manager"), validate(addStaffSchema), staffController.addStaff);

export default router;
