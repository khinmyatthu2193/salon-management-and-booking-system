import { Router } from "express";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";
import { createServiceSchema, updateServiceSchema } from "@/validations";
import * as serviceController from "@/controllers/service.controller";

const router = Router({ mergeParams: true });

// All service routes require OWNER role
router.use(authenticate, authorize("OWNER"));

// GET /api/salons/:salonId/services - List salon services
router.get("/", serviceController.getSalonServices);

// POST /api/salons/:salonId/services - Create service
router.post("/", validate(createServiceSchema), serviceController.createService);

// PUT /api/services/:id - Update service
router.put("/:id", validate(updateServiceSchema), serviceController.updateService);

// DELETE /api/services/:id - Delete service
router.delete("/:id", serviceController.deleteService);

export default router;
