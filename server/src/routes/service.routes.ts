import { Router } from "express";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";
import { createServiceSchema, updateServiceSchema } from "@/validations";
import * as serviceController from "@/controllers/service.controller";

const router = Router({ mergeParams: true });

// GET /api/salons/:salonId/services - List salon services (OWNER + MANAGER)
router.get("/", authenticate, authorize("owner", "manager"), serviceController.getSalonServices);

// POST /api/salons/:salonId/services - Create service (OWNER + MANAGER)
router.post("/", authenticate, authorize("owner", "manager"), validate(createServiceSchema), serviceController.createService);

// PUT /api/services/:id - Update service (OWNER + MANAGER)
router.put("/:id", authenticate, authorize("owner", "manager"), validate(updateServiceSchema), serviceController.updateService);

// DELETE /api/services/:id - Delete service (OWNER only)
router.delete("/:id", authenticate, authorize("owner"), serviceController.deleteService);

export default router;
