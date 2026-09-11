import { prisma } from "@/config/db";

interface CreateServiceInput {
  name: string;
  description?: string;
  price: number;
  duration: number;
}

interface UpdateServiceInput {
  name?: string;
  description?: string;
  price?: number;
  duration?: number;
}

export const getSalonServices = async (salonId: string, ownerId: string) => {
  // Verify salon belongs to owner
  const salon = await prisma.salon.findFirst({
    where: { id: salonId, ownerId },
  });

  if (!salon) {
    throw new Error("Salon not found");
  }

  return prisma.service.findMany({
    where: { salonId },
    orderBy: { createdAt: "desc" },
  });
};

export const createService = async (
  salonId: string,
  ownerId: string,
  input: CreateServiceInput
) => {
  // Verify salon belongs to owner
  const salon = await prisma.salon.findFirst({
    where: { id: salonId, ownerId },
  });

  if (!salon) {
    throw new Error("Salon not found");
  }

  return prisma.service.create({
    data: {
      ...input,
      salonId,
    },
  });
};

export const updateService = async (
  serviceId: string,
  ownerId: string,
  input: UpdateServiceInput
) => {
  // Find service and verify it belongs to owner's salon
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    include: { salon: true },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  if (service.salon.ownerId !== ownerId) {
    throw new Error("Service not found");
  }

  return prisma.service.update({
    where: { id: serviceId },
    data: input,
  });
};

export const deleteService = async (serviceId: string, ownerId: string) => {
  // Find service and verify it belongs to owner's salon
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    include: { salon: true },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  if (service.salon.ownerId !== ownerId) {
    throw new Error("Service not found");
  }

  return prisma.service.delete({
    where: { id: serviceId },
  });
};
