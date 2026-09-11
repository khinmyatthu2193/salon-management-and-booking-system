import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
	{
		title: "Hair Styling",
		image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80",
	},
	{
		title: "Hair Treatment",
		image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
	},
	{
		title: "Nail Care",
		image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80",
	},
	{
		title: "Facial Care",
		image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80",
	},
	{
		title: "Makeup",
		image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
	},
	{
		title: "Eyebrow & Lash",
		image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&q=80",
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
