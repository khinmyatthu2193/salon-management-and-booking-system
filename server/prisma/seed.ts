import { Role } from "@prisma/constants";
import "dotenv/config";
import { prisma } from "@/config/db";
import bcrypt from "bcryptjs";

async function main() {
	const email = "admin@salon.com";
	const password = "admin123";
	const name = "Salon Admin";

	// Check if owner already exists
	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) {
		console.log("⚠️  Owner account already exists:", email);
		return;
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await prisma.$transaction(async (tx) => {
		const user = await tx.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
				role: Role.OWNER,
			},
		});

		await tx.owner.create({
			data: { userId: user.id },
		});

		console.log("✅ Owner account created:");
		console.log("   Email:", email);
		console.log("   Password:", password);
	});
}

main()
	.catch((e) => {
		console.error("❌ Seed failed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
