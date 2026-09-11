import { Router } from "express";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";
import { createManagerSchema, assignManagerSchema } from "@/validations";
import * as managerController from "@/controllers/manager.controller";

const router = Router({ mergeParams: true });

// All manager routes require OWNER role
router.use(authenticate, authorize("OWNER"));

// POST /api/managers - Create a new manager user
router.post("/", validate(createManagerSchema), managerController.createManager);

// PUT /api/salons/:salonId/managers/assign - Assign manager to salon
router.put("/assign", validate(assignManagerSchema), managerController.assignManager);

// GET /api/managers/:id - Get manager details
router.get("/:id", managerController.getManagerById);

export default router;
