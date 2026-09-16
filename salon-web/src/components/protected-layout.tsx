"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardBreadcrumb } from "@/components/dashboard-breadcrumb";
import { NavUser } from "@/components/nav-user";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "cn";
import { BellIcon } from "lucide-react";

const demoNotifications = [
	{ id: 1, title: "New booking confirmed", desc: "Emma Wilson booked a haircut for tomorrow at 10:00 AM.", time: "2 min ago", unread: true },
	{ id: 2, title: "Staff schedule updated", desc: "James Chen updated his availability for next week.", time: "15 min ago", unread: true },
	{ id: 3, title: "Payment received", desc: "You received $85.00 from Sophia Martinez.", time: "1 hour ago", unread: false },
	{ id: 4, title: "New review posted", desc: "Liam Johnson left a 5-star review on Hair Coloring service.", time: "3 hours ago", unread: false },
	{ id: 5, title: "Service low stock", desc: "Keratin Treatment product is running low. Consider restocking.", time: "5 hours ago", unread: false },
	{ id: 6, title: "New customer registered", desc: "Olivia Brown created an account and browsed your salon.", time: "1 day ago", unread: false },
];

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
	const user = useAuthStore((s) => s.user);
	const [scrolled, setScrolled] = useState(false);
	const [notifications] = useState(demoNotifications);

	const unreadCount = notifications.filter((n) => n.unread).length;

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 0);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header
					className={cn(
						"sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b border-border px-4 transition-shadow duration-200",
						"bg-background/80 backdrop-blur-lg",
						scrolled && "shadow-sm",
					)}>
					<div className="border rounded-md">
						<SidebarTrigger className="hover:cursor-pointer" />
					</div>
					<DashboardBreadcrumb />
					<div className="ml-auto flex items-center gap-1">
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<button className="relative flex size-9 items-center justify-center rounded-lg hover:bg-muted transition-colors" />
								}
							>
								<BellIcon className="size-5 text-muted-foreground" />
								{unreadCount > 0 && (
									<span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
										{unreadCount}
									</span>
								)}
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-80 p-0">
								<div className="flex items-center justify-between border-b border-border px-4 py-2.5">
									<span className="text-sm font-semibold">Notifications</span>
									{unreadCount > 0 && (
										<span className="text-xs text-muted-foreground">{unreadCount} unread</span>
									)}
								</div>
								<div className="max-h-80 overflow-y-auto">
									{notifications.map((n) => (
										<DropdownMenuItem
											key={n.id}
											className="flex flex-col items-start gap-1 px-4 py-3 cursor-default"
										>
											<div className="flex w-full items-start gap-2">
												{n.unread && (
													<span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
												)}
												<div className="flex-1 min-w-0">
													<p className={cn("text-sm leading-none", n.unread && "font-semibold")}>
														{n.title}
													</p>
													<p className="mt-1 text-xs text-muted-foreground line-clamp-2">
														{n.desc}
													</p>
												</div>
												<span className="shrink-0 text-[11px] text-muted-foreground whitespace-nowrap">
													{n.time}
												</span>
											</div>
										</DropdownMenuItem>
									))}
								</div>
							</DropdownMenuContent>
						</DropdownMenu>

						{user && (
							<NavUser
								user={{
									name: user.name,
									email: user.email,
									avatar: "/avatars/user-1.webp",
								}}
							/>
						)}
					</div>
				</header>
				<main className="flex-1 p-6 flex justify-center">
					<div className="w-full max-w-6xl">{children}</div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
