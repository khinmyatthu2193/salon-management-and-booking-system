"use client";

import { PageHeader } from "@/components/page-header";
import { ProtectedLayout } from "@/components/protected-layout";
import { RoleGuard } from "@/components/role-guard";
import { Separator } from "@/components/ui/separator";
import {
	BellIcon,
	KeyIcon,
	MonitorIcon,
	PaletteIcon,
	UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
	{
		id: "profile",
		label: "Profile",
		icon: UserIcon,
		href: "/settings/profile",
	},
	{ id: "account", label: "Account", icon: KeyIcon, href: "/settings/account" },
	{
		id: "appearance",
		label: "Appearance",
		icon: PaletteIcon,
		href: "/settings/appearance",
	},
	{
		id: "notifications",
		label: "Notifications",
		icon: BellIcon,
		href: "/settings/notifications",
	},
	{
		id: "display",
		label: "Display",
		icon: MonitorIcon,
		href: "/settings/display",
	},
];

export default function SettingsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<ProtectedLayout>
			<RoleGuard allowedRoles={["owner", "manager", "staff", "customer"]}>
				<div className="space-y-6">
					<PageHeader
						title="Settings"
						description="Manage your account settings and set e-mail preferences."
					/>
					<Separator />

					<div className="flex flex-col gap-8 lg:flex-row">
						<nav className="flex flex-row gap-1 lg:w-48 lg:flex-col">
							{navItems.map((item) => {
								const isActive = pathname === item.href;
								return (
									<Link
										key={item.id}
										href={item.href}
										className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
											isActive
												? "bg-[#FFF8E7] dark:bg-[#2A2200] font-semibold border-l-4 border-[#D4AF37]"
												: "hover:bg-muted hover:text-foreground"
										}`}>
										<item.icon className="size-4 shrink-0" />
										<span>{item.label}</span>
									</Link>
								);
							})}
						</nav>

						<div className="flex-1">{children}</div>
					</div>
				</div>
			</RoleGuard>
		</ProtectedLayout>
	);
}
