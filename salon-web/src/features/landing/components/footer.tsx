import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

const footerLinks = [
	{
		title: "Services",
		links: [
			{ label: "Haircut & Styling", href: "#services" },
			{ label: "Hair Coloring", href: "#services" },
			{ label: "Blowout & Blowdry", href: "#services" },
			{ label: "Makeup Artistry", href: "#services" },
			{ label: "Hair Treatments", href: "#services" },
		],
	},
	{
		title: "Quick Links",
		links: [
			{ label: "Our Work", href: "#gallery" },
			{ label: "About Us", href: "#about" },
			{ label: "FAQ", href: "#faq" },
			{ label: "Book Now", href: "/booking" },
		],
	},
	{
		title: "Contact",
		links: [
			{ label: "123 Style Avenue, NY 10001", href: "#" },
			{ label: "+1 (555) 123-4567", href: "#" },
			{ label: "hello@salonhub.com", href: "#" },
			{ label: "Mon–Sat: 9 AM – 8 PM", href: "#" },
		],
	},
];

export function Footer() {
	return (
		<footer id="contact" className="py-8">
			<div className="mx-auto max-w-6xl px-6">
				<div className="rounded-2xl border border-border/40 bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/40 px-6 py-12">
					<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
						{/* Logo */}
						<div className="lg:col-span-1">
							<Link
								href="/"
								className="flex items-center">
								<Image src="/logo.png" alt="SalonHub" width={48} height={48} className="rounded-xl" />
							</Link>
						</div>

						{/* Link columns */}
						{footerLinks.map((group) => (
							<div key={group.title}>
								<h3 className="text-sm font-semibold">{group.title}</h3>
								<ul className="mt-4 space-y-3">
									{group.links.map((link) => (
										<li key={link.label}>
											<Link
												href={link.href}
												className="text-sm text-muted-foreground hover:text-foreground transition-colors">
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					{/* Bottom bar */}
					<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
						<p className="text-sm text-muted-foreground">
							© {new Date().getFullYear()} SalonHub
						</p>
						<div className="flex items-center gap-6 text-sm text-muted-foreground">
							<ThemeToggle />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
