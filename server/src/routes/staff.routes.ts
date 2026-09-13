import {
	addStaff,
	assignStaff,
	getStaffById,
	listStaff,
	removeStaff,
	updateStaff,
} from "@/controllers/staff.controller";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";
import { addStaffSchema, assignStaffSchema, updateStaffSchema } from "@/validations";
import { Router } from "express";

const router = Router();

// POST /api/staff - Create a new staff user (OWNER only)
router.post(
	"/",
	authenticate,
	authorize("owner"),
	validate(addStaffSchema),
	addStaff,
);

// GET /api/staff - List all unassigned staff (OWNER only)
router.get("/", authenticate, authorize("owner"), listStaff);

// GET /api/staff/:id - Get staff details (OWNER + MANAGER)
router.get("/:id", authenticate, authorize("owner", "manager"), getStaffById);

// PUT /api/staff/:id/assign - Assign staff to salon (OWNER only)
router.put(
	"/:id/assign",
	authenticate,
	authorize("owner"),
	validate(assignStaffSchema),
	assignStaff,
);

// PUT /api/staff/:id - Update staff details (OWNER + MANAGER)
router.put(
	"/:id",
	authenticate,
	authorize("owner", "manager"),
	validate(updateStaffSchema),
	updateStaff,
);

// DELETE /api/staff/:id - Remove staff (OWNER + MANAGER)
router.delete("/:id", authenticate, authorize("owner", "manager"), removeStaff);

export default router;
