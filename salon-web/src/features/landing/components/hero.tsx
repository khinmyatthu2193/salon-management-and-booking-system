import Link from "next/link";
import { CalendarCheck, Users, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

const features = [
	{ icon: CalendarCheck, label: "Easy Online Booking" },
	{ icon: Users, label: "Professional Stylists" },
	{ icon: Sparkles, label: "Premium Beauty Care" },
];

export function Hero() {
	return (
		<section className="relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-28 lg:py-36">
				<p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
					Confidence · Beauty · A Better You
				</p>
				<h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
					Effortless Beauty
					<br />
					<span className="text-gold">Starts Here</span>
				</h1>
				<p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
					Professional beauty services, easy online booking,
					and a more confident you.
				</p>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
					<Link href="/booking" className={buttonVariants({ size: "lg" })}>
						Book Your Appointment
					</Link>
					<Link
						href="#services"
						className={buttonVariants({ size: "lg", variant: "outline" })}>
						View Services
					</Link>
				</div>

				{/* Feature badges */}
				<div className="mx-auto mt-12 flex max-w-xl flex-wrap items-center justify-center gap-6">
					{features.map((f) => (
						<div key={f.label} className="flex items-center gap-2 text-sm text-muted-foreground">
							<div className="flex size-8 items-center justify-center rounded-full border border-border">
								<f.icon className="size-4 text-gold" />
							</div>
							<span>{f.label}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
