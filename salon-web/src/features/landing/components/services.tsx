import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
	{
		title: "Hair Styling",
		image: "/avatars/user-1.webp",
	},
	{
		title: "Hair Treatment",
		image: "/avatars/user-2.webp",
	},
	{
		title: "Nail Care",
		image: "/avatars/user-3.webp",
	},
	{
		title: "Facial Care",
		image: "/avatars/user-4.webp",
	},
	{
		title: "Makeup",
		image: "/avatars/user-5.webp",
	},
	{
		title: "Eyebrow & Lash",
		image: "/avatars/user-6.webp",
	},
];

export function Services() {
	return (
		<section id="services" className="py-16 sm:py-20 lg:py-24">
			<div className="mx-auto max-w-6xl px-6">
				<div className="flex items-end justify-between">
					<div>
						<p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
							Our Services
						</p>
						<h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
							Popular Services
						</h2>
					</div>
					<Link
						href="#services"
						className="hidden items-center gap-1 text-sm font-medium text-gold hover:underline sm:flex">
						View All Services <ArrowRight className="size-4" />
					</Link>
				</div>

				<div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
					{services.map((service) => (
						<div
							key={service.title}
							className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-primary/5">
							<div className="aspect-[4/5] overflow-hidden">
								<Image
									src={service.image}
									alt={service.title}
									width={400}
									height={500}
									className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
							<p className="p-3 text-center text-sm font-medium">
								{service.title}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
