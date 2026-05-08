import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

const DEFAULT_FAQS = [
    {
        id: 'item-1',
        question: 'Who is eligible for the Azerbaijan e-Visa?',
        answer: 'Citizens of over 100 countries are eligible to apply for the Azerbaijan e-Visa online. You can check eligibility by selecting your nationality on our application page. Most European, North American, and Asian passport holders qualify.',
    },
    {
        id: 'item-2',
        question: 'How long does it take to get an Azerbaijan e-Visa?',
        answer: 'Standard processing takes 3 business days. If you need your visa sooner, our urgent processing option delivers your approved e-Visa in just 3–5 hours for an additional fee.',
    },
    {
        id: 'item-3',
        question: 'How much does the Azerbaijan e-Visa cost?',
        answer: 'The standard e-Visa fee is $69 USD, which includes all government and processing charges. Urgent processing is available for an additional fee. Payment is accepted via all major credit and debit cards.',
    },
    {
        id: 'item-4',
        question: 'How long can I stay in Azerbaijan with an e-Visa?',
        answer: 'The Azerbaijan e-Visa allows a single entry with a maximum stay of 30 days. The visa is valid for 90 days from the date of issue, so you must enter Azerbaijan within that 90-day window.',
    },
    {
        id: 'item-5',
        question: 'What documents do I need to apply?',
        answer: 'You need a valid passport with at least 6 months of validity beyond your intended stay, a digital passport-sized photo with a white background, a valid email address, and a credit or debit card for payment.',
    },
    {
        id: 'item-6',
        question: 'Can I extend my Azerbaijan e-Visa?',
        answer: 'The Azerbaijan e-Visa cannot be extended online. If you wish to stay longer, you must apply for a new visa or contact the State Migration Service of Azerbaijan directly.',
    },
]

interface FAQ {
    question: string;
    answer: string;
}

export function FAQSection({ faqs }: { faqs?: FAQ[] }) {
    const displayFaqs = (faqs || DEFAULT_FAQS).map((item, idx) => ({
        id: `item-${idx + 1}`,
        question: item.question,
        answer: item.answer,
    }));
    return (
        <section className="py-16 md:py-24" style={{ background: '#f9fafb' }}>
            <div className="mx-auto max-w-[1200px] px-6">
                {/* Header */}
                <div className="mb-12 text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: '#E8671A' }}>
                        Got Questions?
                    </p>
                    <h2 className="text-3xl font-extrabold sm:text-4xl" style={{ color: '#1a1a2e' }}>
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-base text-gray-500 max-w-xl mx-auto">
                        Everything you need to know about the Azerbaijan e-Visa process.
                    </p>
                </div>

                {/* Accordion */}
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full space-y-3">
                        {displayFaqs.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border border-gray-200 rounded-xl bg-white px-6 shadow-sm"
                            >
                                <AccordionTrigger
                                    className="cursor-pointer text-base font-semibold hover:no-underline py-5"
                                    style={{ color: '#1a1a2e' }}
                                >
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm leading-relaxed text-gray-500 pb-4">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="mt-8 text-center text-sm text-gray-400">
                        Still have questions?{' '}
                        <Link href="/contact" className="font-semibold hover:underline" style={{ color: '#E8671A' }}>
                            Contact our support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
