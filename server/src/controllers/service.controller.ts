import { Response, NextFunction } from "express";
import { AuthRequest } from "@/types";
import * as serviceService from "@/services/service.service";

export const getSalonServices = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const services = await serviceService.getSalonServices(
      req.params.salonId,
      req.user!.id
    );
    res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

export const createService = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const service = await serviceService.createService(
      req.params.salonId,
      req.user!.id,
      req.body
    );
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const service = await serviceService.updateService(
      req.params.id,
      req.user!.id,
      req.body
    );
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await serviceService.deleteService(req.params.id, req.user!.id);
    res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
};
