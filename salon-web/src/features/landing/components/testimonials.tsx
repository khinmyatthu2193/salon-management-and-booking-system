import Image from "next/image";

const testimonials = [
	{
		name: "Adam Wathan",
		role: "Customer",
		text: "I've been coming to SalonHub for nearly a decade and have never been tempted to switch to anything else.",
		avatar: "/avatars/user-1.webp",
		featured: true,
	},
	{
		name: "Ian Callahan",
		role: "Customer",
		text: "SalonHub is our go-to for every event. 10 years in, they remain fresh and consistently excellent.",
		avatar: "/avatars/user-2.webp",
		featured: false,
	},
	{
		name: "Aaron Francis",
		role: "Customer",
		text: "SalonHub takes the pain out of looking good. Scalable, reliable, and always on point.",
		avatar: "/avatars/user-3.webp",
		featured: false,
	},
	{
		name: "Chandresh Patel",
		role: "Customer",
		text: "The elegance, precision, and developer-like attention to detail at SalonHub are unmatched.",
		avatar: "/avatars/user-4.webp",
		featured: false,
	},
	{
		name: "Jack Ellis",
		role: "Customer",
		text: "The SalonHub ecosystem has been integral to the success of our brand. Their team allows us to move fast and ship looks regularly.",
		avatar: "/avatars/user-5.webp",
		featured: true,
	},
	{
		name: "Erika Heidi",
		role: "Customer",
		text: "SalonHub is a breath of fresh air in the beauty world, with a brilliant community around it.",
		avatar: "/avatars/user-6.webp",
		featured: false,
	},
	{
		name: "Zuzana Kunckova",
		role: "Customer",
		text: "The service, the team and the community — it's the perfect package.",
		avatar: "/avatars/user-7.webp",
		featured: false,
	},
];

export function Testimonials() {
	return (
		<section className="py-16 sm:py-20 lg:py-24">
			<div className="mx-auto max-w-6xl px-6">
				<div className="text-center">
					<p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
						Testimonials
					</p>
					<h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
						What our clients say
					</h2>
				</div>

				<div className="mt-16 [grid-auto-flow:dense] grid grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-[auto] lg:grid-cols-3">
					{testimonials.map((t) =>
						t.featured ? (
							<div
								key={t.name}
								className="flex flex-col justify-between rounded-2xl bg-foreground p-8 text-background sm:row-span-2">
								<div>
									<p className="text-xl font-medium leading-relaxed sm:text-2xl">
										&ldquo;{t.text}&rdquo;
									</p>
								</div>
								<div className="mt-8 flex items-center justify-between">
									<div>
										<p className="font-semibold">{t.name}</p>
										<p className="text-sm opacity-60">{t.role}</p>
									</div>
									<Image
										src={t.avatar}
										alt={t.name}
										width={48}
										height={48}
										className="rounded-full object-cover ring-2 ring-gold"
									/>
								</div>
							</div>
						) : (
							<div
								key={t.name}
								className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6">
								<p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
									&ldquo;{t.text}&rdquo;
								</p>
								<div className="mt-6 flex items-center justify-between">
									<div>
										<p className="text-sm font-semibold">{t.name}</p>
										<p className="text-xs text-muted-foreground">{t.role}</p>
									</div>
									<Image
										src={t.avatar}
										alt={t.name}
										width={40}
										height={40}
										className="rounded-full object-cover"
									/>
								</div>
							</div>
						)
					)}
				</div>
			</div>
		</section>
	);
}
