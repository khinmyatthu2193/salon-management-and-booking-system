import { prisma } from "@/config/db";

interface CreateSalonInput {
  name: string;
  address: string;
  phone?: string;
  description?: string;
}

interface UpdateSalonInput {
  name?: string;
  address?: string;
  phone?: string;
  description?: string;
}

export const getOwnerSalons = async (ownerId: string) => {
  return prisma.salon.findMany({
    where: { ownerId },
    include: {
      manager: { include: { user: { select: { id: true, name: true, email: true, phone: true } } } },
      _count: { select: { staff: true, services: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getSalonById = async (salonId: string, ownerId: string) => {
  const salon = await prisma.salon.findFirst({
    where: { id: salonId, ownerId },
    include: {
      manager: { include: { user: { select: { id: true, name: true, email: true, phone: true } } } },
      staff: { include: { user: { select: { id: true, name: true, email: true, phone: true } } } },
      services: true,
    },
  });

  if (!salon) {
    throw new Error("Salon not found");
  }

  return salon;
};

export const createSalon = async (ownerId: string, input: CreateSalonInput) => {
  return prisma.salon.create({
    data: {
      ...input,
      ownerId,
    },
  });
};

export const updateSalon = async (
  salonId: string,
  ownerId: string,
  input: UpdateSalonInput
) => {
  // Verify ownership
  const existing = await prisma.salon.findFirst({
    where: { id: salonId, ownerId },
  });

  if (!existing) {
    throw new Error("Salon not found");
  }

  return prisma.salon.update({
    where: { id: salonId },
    data: input,
  });
};

export const deleteSalon = async (salonId: string, ownerId: string) => {
  // Verify ownership
  const existing = await prisma.salon.findFirst({
    where: { id: salonId, ownerId },
  });

  if (!existing) {
    throw new Error("Salon not found");
  }

  return prisma.salon.delete({
    where: { id: salonId },
  });
};
