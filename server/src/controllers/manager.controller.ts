import { Response, NextFunction } from "express";
import { AuthRequest } from "@/types";
import * as managerService from "@/services/manager.service";

export const createManager = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const manager = await managerService.createManager(req.body);
    res.status(201).json({ success: true, data: manager });
  } catch (error) {
    next(error);
  }
};

export const assignManager = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { salonId } = req.params;
    const { managerId } = req.body;
    const result = await managerService.assignManager(
      managerId,
      salonId,
      req.user!.id
    );
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getManagerById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const manager = await managerService.getManagerById(
      req.params.id,
      req.user!.id
    );
    res.json({ success: true, data: manager });
  } catch (error) {
    next(error);
  }
};
