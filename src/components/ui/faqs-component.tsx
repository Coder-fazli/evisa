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
        <section style={{ background: '#f9fafb' }} className="py-16">
            <div className="max-w-6xl mx-auto px-5">
                {/* Accordion - 2 columns grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Accordion type="single" collapsible className="w-full space-y-3">
                        {displayFaqs.slice(0, Math.ceil(displayFaqs.length / 2)).map((item) => (
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
                    <Accordion type="single" collapsible className="w-full space-y-3">
                        {displayFaqs.slice(Math.ceil(displayFaqs.length / 2)).map((item) => (
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
                </div>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Still have questions?{' '}
                    <Link href="/contact" className="font-semibold hover:underline" style={{ color: '#E8671A' }}>
                        Contact our support team
                    </Link>
                </p>
            </div>
        </section>
    )
}
