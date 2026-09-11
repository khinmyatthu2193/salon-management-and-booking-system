import { Router } from "express";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";
import { addStaffSchema } from "@/validations";
import * as staffController from "@/controllers/staff.controller";

const router = Router({ mergeParams: true });

// All staff routes require OWNER role
router.use(authenticate, authorize("OWNER"));

// GET /api/salons/:salonId/staff - List salon staff
router.get("/", staffController.getSalonStaff);

// POST /api/salons/:salonId/staff - Add staff to salon
router.post("/", validate(addStaffSchema), staffController.addStaff);

export default router;
