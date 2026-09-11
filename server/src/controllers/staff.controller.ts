import { Response, NextFunction } from "express";
import { AuthRequest } from "@/types";
import * as staffService from "@/services/staff.service";

export const getSalonStaff = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const staff = await staffService.getSalonStaff(
      req.params.salonId,
      req.user!.id
    );
    res.json({ success: true, data: staff });
  } catch (error) {
    next(error);
  }
};

export const addStaff = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const staff = await staffService.addStaff(
      req.params.salonId,
      req.user!.id,
      req.body
    );
    res.status(201).json({ success: true, data: staff });
  } catch (error) {
    next(error);
  }
};

export const removeStaff = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await staffService.removeStaff(req.params.id, req.user!.id);
    res.json({ success: true, message: "Staff removed successfully" });
  } catch (error) {
    next(error);
  }
};
