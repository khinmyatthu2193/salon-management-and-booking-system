import {
	About,
	Faq,
	Footer,
	Gallery,
	Hero,
	Navbar,
	NewLetter,
	Services,
	Testimonials,
} from "@/features/landing";

export default function Home() {
	return (
		<div className="relative flex min-h-screen flex-col">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] dark:opacity-[0.15]"
				style={{
					backgroundImage:
						"radial-gradient(circle, currentColor 1px, transparent 1px)",
					backgroundSize: "24px 24px",
				}}
			/>
			<Navbar />
			<main className="flex-1">
				<Hero />
				<Services />
				<Gallery />
				<About />
				<Testimonials />
				<Faq />
				<NewLetter />
			</main>
			<Footer />
		</div>
	);
}
