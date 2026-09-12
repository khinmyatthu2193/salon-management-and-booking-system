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

// Salon management — OWNER only for create/update/delete
router.use(authenticate);

// GET /api/salons - List salons (OWNER sees own, MANAGER/STAFF see assigned)
router.get("/", salonController.getOwnerSalons);

// POST /api/salons - Create salon (OWNER only)
router.post("/", authorize("owner"), validate(createSalonSchema), salonController.createSalon);

// GET /api/salons/:id - Get salon details (OWNER + MANAGER + STAFF)
router.get("/:id", authorize("owner", "manager", "staff"), salonController.getSalonById);

// PUT /api/salons/:id - Update salon (OWNER only)
router.put("/:id", authorize("owner"), validate(updateSalonSchema), salonController.updateSalon);

// DELETE /api/salons/:id - Delete salon (OWNER only)
router.delete("/:id", authorize("owner"), salonController.deleteSalon);

export default router;
