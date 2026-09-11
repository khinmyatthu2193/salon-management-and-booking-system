import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
	{
		question: "How do I book an appointment?",
		answer:
			"You can book directly through our website by clicking the Book Now button. Simply choose your service, pick a stylist, select an available time slot, and confirm. You'll receive a confirmation right away.",
	},
	{
		question: "Can I walk in without an appointment?",
		answer:
			"We welcome walk-ins when availability allows. However, we recommend booking ahead to guarantee your preferred time and stylist, especially on weekends and holidays.",
	},
	{
		question: "What is your cancellation policy?",
		answer:
			"We kindly ask for at least 24 hours' notice if you need to cancel or reschedule. Late cancellations or no-shows may incur a fee. You can manage your booking online anytime.",
	},
	{
		question: "How early should I arrive?",
		answer:
			"Please arrive 10–15 minutes before your scheduled appointment. This gives us time to consult with you about your desired look and ensures your service starts on time.",
	},
	{
		question: "Do you offer services for men and children?",
		answer:
			"Absolutely! We offer haircuts, grooming, and styling services for all ages and genders. We also have specific kids' packages for a fun, comfortable experience.",
	},
	{
		question: "How do I know which stylist is right for me?",
		answer:
			"Each stylist has a profile with their specialties and portfolio. Browse our team, check out their work, and pick the one whose style matches your vision. We're always happy to help you choose.",
	},
];

export function Faq() {
	return (
		<section className="py-16 sm:py-20 lg:py-24">
			<div className="mx-auto max-w-3xl px-6">
				<div className="text-center">
					<p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
						FAQ
					</p>
					<h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
						Frequently Asked Questions
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						Everything you need to know before your visit.
					</p>
				</div>

				<Accordion multiple className="mt-12" defaultValue={["0"]}>
					{faqs.map((faq, i) => (
						<AccordionItem
							key={i}
							value={String(i)}
							className="border-border/50 py-1">
							<AccordionTrigger className="text-base font-medium hover:no-underline">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground leading-relaxed">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
