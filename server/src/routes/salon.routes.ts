import { Router } from "express";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";
import { createSalonSchema, updateSalonSchema } from "@/validations";
import * as salonController from "@/controllers/salon.controller";
import managerRoutes from "./manager.routes";
import staffRoutes from "./staff.routes";
import serviceRoutes from "./service.routes";

const router = Router();

// Nested routes
router.use("/:salonId/managers", managerRoutes);
router.use("/:salonId/staff", staffRoutes);
router.use("/:salonId/services", serviceRoutes);

// All salon routes require OWNER role
router.use(authenticate, authorize("OWNER"));

// GET /api/salons - List owner's salons
router.get("/", salonController.getOwnerSalons);

// POST /api/salons - Create salon
router.post("/", validate(createSalonSchema), salonController.createSalon);

// GET /api/salons/:id - Get salon details
router.get("/:id", salonController.getSalonById);

// PUT /api/salons/:id - Update salon
router.put("/:id", validate(updateSalonSchema), salonController.updateSalon);

// DELETE /api/salons/:id - Delete salon
router.delete("/:id", salonController.deleteSalon);

export default router;
