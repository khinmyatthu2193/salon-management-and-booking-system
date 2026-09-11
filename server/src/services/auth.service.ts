import { Role, RoleType } from "@prisma/constants";
import { prisma } from "@/config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET =
	process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this";
const JWT_EXPIRES_IN = "7d";

interface RegisterInput {
	email: string;
	password: string;
	name: string;
	phone?: string;
	role: RoleType;
}

interface LoginInput {
	email: string;
	password: string;
}

const SALT_ROUNDS = 10;

export const register = async (input: RegisterInput) => {
	const { email, password, name, phone, role } = input;

	// Check if user already exists
	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) {
		throw new Error("Email already registered");
	}

	// Hash password
	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

	// Create user with role-specific profile in a transaction
	const user = await prisma.$transaction(async (tx) => {
		const newUser = await tx.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
				phone,
				role,
			},
		});

		// Create role-specific profile
		switch (role) {
			case Role.OWNER:
				await tx.owner.create({ data: { userId: newUser.id } });
				break;
			case Role.MANAGER:
				await tx.manager.create({ data: { userId: newUser.id } });
				break;
			case Role.STAFF:
				// Staff needs a salonId, so we create the user first
				// Staff profile will be created when assigned to a salon
				break;
		}

		return newUser;
	});

	// Generate JWT
	const token = jwt.sign(
		{ id: user.id, email: user.email, role: user.role },
		JWT_SECRET,
		{ expiresIn: JWT_EXPIRES_IN },
	);

	return {
		token,
		user: {
			id: user.id,
			email: user.email,
			name: user.name,
			phone: user.phone,
			role: user.role,
		},
	};
};

export const login = async (input: LoginInput) => {
	const { email, password } = input;

	// Find user
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		throw new Error("Invalid email or password");
	}

	// Verify password
	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword) {
		throw new Error("Invalid email or password");
	}

	// Generate JWT
	const token = jwt.sign(
		{ id: user.id, email: user.email, role: user.role },
		JWT_SECRET,
		{ expiresIn: JWT_EXPIRES_IN },
	);

	return {
		token,
		user: {
			id: user.id,
			email: user.email,
			name: user.name,
			phone: user.phone,
			role: user.role,
		},
	};
};
