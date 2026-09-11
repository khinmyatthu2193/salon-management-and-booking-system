import { Heart, Leaf, ShieldCheck, Users } from "lucide-react";

const reasons = [
	{
		icon: Users,
		title: "Trusted by",
		value: "500+ Happy Clients",
	},
	{
		icon: ShieldCheck,
		title: "Hygienic",
		value: "& Safe Environment",
	},
	{
		icon: Heart,
		title: "Skilled & Friendly",
		value: "Professionals",
	},
	{
		icon: Leaf,
		title: "Your Beauty",
		value: "Our Priority",
	},
];

export function About() {
	return (
		<section
			id="about"
			className="py-16 sm:py-20 lg:py-24">
			<div className="mx-auto max-w-6xl px-6">
				<div className="text-center">
					<p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
						Why Choose SalonHub
					</p>
					<h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
						Beauty in Every Detail
					</h2>
				</div>

				<div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
					{reasons.map((r) => (
						<div
							key={r.title}
							className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all hover:shadow-lg hover:shadow-primary/5">
							<div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
								<r.icon className="size-5 text-gold" />
							</div>
							<div>
								<p className="text-sm font-semibold">{r.title}</p>
								<p className="text-xs text-muted-foreground">{r.value}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
