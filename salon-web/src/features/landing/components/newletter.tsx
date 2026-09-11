export function NewLetter() {
	return (
		<section className="py-16 sm:py-20 lg:py-24">
			<div className="mx-auto max-w-6xl px-6">
				<div className="relative overflow-hidden rounded-2xl bg-card px-8 py-20 text-center sm:px-16">
					{/* Decorative blurs */}
					<div className="absolute -top-20 -right-20 size-64 rounded-full bg-gold/20 blur-3xl" />
					<div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-gold/10 blur-3xl" />

					{/* Newsletter */}
					<div className="relative mx-auto max-w-lg">
						<h2 className="text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl">Subscribe to our newsletter</h2>
						<p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
							Stay updated on new services, seasonal offers, and styling tips.
						</p>

						<div className="flex gap-2 mt-5">
							<input
								type="email"
								placeholder="you@domain.com"
								className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold"
							/>
							<button className="shrink-0 rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-gold/90">
								Subscribe
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
