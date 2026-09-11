import Image from "next/image";

const works = [
	{
		src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
		alt: "Balayage highlights on long hair",
		className: "col-span-2 row-span-2",
	},
	{
		src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80",
		alt: "Classic men's fade haircut",
		className: "",
	},
	{
		src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
		alt: "Bridal updo hairstyle",
		className: "",
	},
	{
		src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80",
		alt: "Vibrant creative hair color",
		className: "",
	},
	{
		src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
		alt: "Sleek straight blowout",
		className: "",
	},
];

export function Gallery() {
	return (
		<section id="gallery" className="py-16 sm:py-20 lg:py-24">
			<div className="mx-auto max-w-6xl px-6">
				<div className="text-center">
					<p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
						Our Work
					</p>
					<h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
						Style Showcase
					</h2>
				</div>

				<div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
					{works.map((work, i) => (
						<div
							key={i}
							className={`group relative overflow-hidden rounded-xl bg-card border border-border ${work.className}`}>
							<div className="h-full min-h-[180px] sm:min-h-[220px]">
								<Image
									src={work.src}
									alt={work.alt}
									fill
									sizes="(max-width: 640px) 50vw, 25vw"
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
							<div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							<span className="absolute bottom-3 left-3 text-sm font-medium text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
								{work.alt}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
