import { Router } from "express";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";
import { createManagerSchema, assignManagerSchema } from "@/validations";
import * as managerController from "@/controllers/manager.controller";

const router = Router({ mergeParams: true });

// POST /api/managers - Create a new manager user (OWNER only)
router.post("/", authenticate, authorize("owner"), validate(createManagerSchema), managerController.createManager);

// PUT /api/salons/:salonId/managers/assign - Assign manager to salon (OWNER only)
router.put("/assign", authenticate, authorize("owner"), validate(assignManagerSchema), managerController.assignManager);

// GET /api/managers/:id - Get manager details (OWNER + MANAGER)
router.get("/:id", authenticate, authorize("owner", "manager"), managerController.getManagerById);

export default router;
