import { Role } from "@prisma/constants";
import { prisma } from "@/config/db";
import bcrypt from "bcryptjs";

interface CreateManagerInput {
	email: string;
	password: string;
	name: string;
	phone?: string;
}

interface AssignManagerInput {
	salonId: string;
}

const SALT_ROUNDS = 10;

export const createManager = async (input: CreateManagerInput) => {
	const { email, password, name, phone } = input;

	// Check if user already exists
	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) {
		throw new Error("Email already registered");
	}

	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

	const user = await prisma.$transaction(async (tx) => {
		const newUser = await tx.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
				phone,
				role: Role.MANAGER,
			},
		});

		await tx.manager.create({
			data: { userId: newUser.id },
		});

		return newUser;
	});

	return {
		id: user.id,
		email: user.email,
		name: user.name,
		phone: user.phone,
		role: user.role,
	};
};

export const assignManager = async (
	managerId: string,
	salonId: string,
	ownerId: string,
) => {
	// Verify salon belongs to owner
	const salon = await prisma.salon.findFirst({
		where: { id: salonId, ownerId },
	});

	if (!salon) {
		throw new Error("Salon not found");
	}

	// Verify manager exists
	const manager = await prisma.manager.findUnique({
		where: { id: managerId },
		include: { user: true },
	});

	if (!manager) {
		throw new Error("Manager not found");
	}

	// Check if manager is already assigned to another salon
	if (manager.salonId && manager.salonId !== salonId) {
		throw new Error("Manager is already assigned to another salon");
	}

	// Unassign any existing manager from this salon
	if (salon.managerId) {
		await prisma.manager.update({
			where: { id: salon.managerId },
			data: { salonId: null },
		});
	}

	// Assign manager to salon
	await prisma.$transaction(async (tx) => {
		await tx.manager.update({
			where: { id: managerId },
			data: { salonId },
		});

		await tx.salon.update({
			where: { id: salonId },
			data: { managerId },
		});
	});

	return { message: "Manager assigned successfully" };
};

export const getManagerById = async (managerId: string, ownerId: string) => {
	const manager = await prisma.manager.findUnique({
		where: { id: managerId },
		include: {
			user: { select: { id: true, name: true, email: true, phone: true } },
			salon: { select: { id: true, name: true, ownerId: true } },
		},
	});

	if (!manager) {
		throw new Error("Manager not found");
	}

	// Verify manager is either unassigned or assigned to owner's salon
	if (manager.salon && manager.salon.ownerId !== ownerId) {
		throw new Error("Manager not found");
	}

	return manager;
};
