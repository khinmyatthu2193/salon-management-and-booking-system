"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header className="fixed top-4 right-0 left-0 z-50 mx-auto max-w-6xl px-6">
			<div
				className={`flex h-16 items-center justify-between rounded-2xl px-6 transition-all duration-300 ${
					scrolled
						? "border border-border/40 bg-background/60 shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-background/40"
						: "border border-transparent bg-transparent"
				}`}>
				<Link href="/" className="flex items-center">
					<Image src="/logo.png" alt="SalonHub" width={48} height={48} className="rounded-xl" />
				</Link>

				<nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
					<a href="#services" className="transition-colors hover:text-foreground">
						Services
					</a>
					<a href="#gallery" className="transition-colors hover:text-foreground">
						Our Work
					</a>
					<a href="#about" className="transition-colors hover:text-foreground">
						About
					</a>
					<a href="#contact" className="transition-colors hover:text-foreground">
						Contact
					</a>
				</nav>

				<div className="flex items-center gap-2">
					<ThemeToggle />
					<Link
						href="/login"
						className={buttonVariants({ variant: "ghost", size: "sm" })}>
						Login
					</Link>
					<Link
						href="/register"
						className={buttonVariants({ size: "sm" })}>
						Get Started
					</Link>
				</div>
			</div>
		</header>
	);
}
