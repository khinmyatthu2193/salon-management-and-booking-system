import { prisma } from "@/config/db";
import { Role } from "@prisma/constants";
import bcrypt from "bcryptjs";

interface AddStaffInput {
	email: string;
	password: string;
	name: string;
	phone?: string;
	specialty?: string;
}

const SALT_ROUNDS = 10;

export const getSalonStaff = async (salonId: string, ownerId: string) => {
	// Verify salon belongs to owner
	const salon = await prisma.salon.findFirst({
		where: { id: salonId, ownerId },
	});

	if (!salon) {
		throw new Error("Salon not found");
	}

	return prisma.staff.findMany({
		where: { salonId },
		include: {
			user: { select: { id: true, name: true, email: true, phone: true } },
		},
		orderBy: { createdAt: "desc" },
	});
};

export const addStaff = async (
	salonId: string,
	ownerId: string,
	input: AddStaffInput,
) => {
	// Verify salon belongs to owner
	const salon = await prisma.salon.findFirst({
		where: { id: salonId, ownerId },
	});

	if (!salon) {
		throw new Error("Salon not found");
	}

	const { email, password, name, phone, specialty } = input;

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
				role: Role.STAFF,
			},
		});

		await tx.staff.create({
			data: {
				userId: newUser.id,
				salonId,
				specialty,
			},
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

export const removeStaff = async (staffId: string, ownerId: string) => {
	// Find staff and verify they belong to one of owner's salons
	const staff = await prisma.staff.findUnique({
		where: { id: staffId },
		include: { salon: true },
	});

	if (!staff) {
		throw new Error("Staff not found");
	}

	if (staff.salon.ownerId !== ownerId) {
		throw new Error("Staff not found");
	}

	await prisma.$transaction(async (tx) => {
		// Delete staff profile
		await tx.staff.delete({ where: { id: staffId } });

		// Delete user account
		await tx.user.delete({ where: { id: staff.userId } });
	});

	return { message: "Staff removed successfully" };
};
