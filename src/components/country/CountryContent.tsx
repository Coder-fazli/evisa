import { Sidebar } from "./Sidebar";
import styles from "./CountryContent.module.css";
import { PortableText } from "@portabletext/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQ { q: string; a: string; }
interface Step { title: string; desc: string; }

interface SidebarCountry { name: string; slug: string; countryCode: string; }

interface CountryContentProps {
  country: string;
  overview: string;
  faqs: FAQ[];
  steps: Step[];
  publishedDate: string;
  body?: any;
  applyLink?: string;
  sidebarCountries?: SidebarCountry[];
}

export function CountryContent({ country, overview, faqs, steps, publishedDate, body, applyLink, sidebarCountries }: CountryContentProps) {

  return (
    <div className={styles.layout}>
      {/* Main content */}
      <main>
        {/* Quick Overview */}
        <div className={styles.overview}>
          <p className={styles.overviewTitle}>ℹ️ Quick Overview</p>
          <p className={styles.overviewText}>{overview}</p>
        </div>

        <p className={styles.published}>📅 Published: {publishedDate}</p>

      {/* Article body */}
  <article className={styles.content}>
    {body ? (
      <PortableText value={body} />
    ) : (
      <>
        <h2>Do {country} Citizens Need a Visa for Azerbaijan?</h2>
        <p>
          Yes, {country} passport holders must obtain a visa before
  traveling to Azerbaijan.
          The good news is that {country} citizens are eligible for
  the convenient{" "}
          <strong>Azerbaijan e-Visa</strong>, which can be obtained
  entirely online without                                            
          visiting an embassy or consulate.
        </p>                                                         
                                                            
        <h2>Azerbaijan e-Visa for {country} Citizens</h2>            
        <p>
          The <strong>Azerbaijan e-Visa for {country}</strong>       
  nationals is a single-entry                                        
          electronic travel authorization. This Azerbaijan tourist
  visa allows you to visit                                           
          for tourism, business meetings, or transit purposes.
        </p>
        <ul>
          <li>Apply online from the comfort of your home</li>
          <li>Receive your e-Visa by email in 3 business days</li>   
          <li>Fee: $69 USD (includes all processing charges)</li>
          <li>No embassy visit or appointment required</li>          
          <li>Valid for a single entry, stay up to 30 days</li>      
        </ul>                                                     <h2>Requirements for {country} Citizens</h2>        
        <p>                                                          
          Before applying for the <strong>Azerbaijan e-Visa</strong>,
   make sure you have                                                
          the following documents ready:
        </p>                                                         
        <ul>                                                
          <li>Valid {country} passport (at least 6 months validity
  beyond your stay)</li>                                             
          <li>Valid email address to receive your e-Visa</li>
          <li>Credit or debit card for payment</li>                  
          <li>Digital passport-sized photo (white background)</li>
          <li>Travel itinerary or accommodation details</li>         
        </ul>                                                        
         <h2>Azerbaijan e-Visa Validity & Entry Rules</h2>            
        <p>                                                 
          The <strong>Azerbaijan tourist e-Visa</strong> is valid for
   90 days from the date                                    
          of issue, allowing a single entry with a maximum stay of 30
   days.
        </p>

        <h2>Cost of Azerbaijan e-Visa for {country}</h2>
        <p>
          The standard processing fee for the <strong>Azerbaijan
  e-Visa</strong> is{" "}                                            
          <strong>$69 USD</strong>. This covers government fees and
  processing charges.                                                
        </p>                                                
        <h2>Processing Times</h2>                           
        <ul>
          <li><strong>Standard:</strong> 3 Business Days</li>        
          <li><strong>Urgent:</strong> 3–5 Hours</li>
        </ul>                                                        
      </>                                                   
    )}                                                               
  </article>    

        {/* FAQ */}
        <h2 className={styles.faqTitle}>❓ Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-gray-200 rounded-xl bg-white px-6 shadow-sm"
            >
              <AccordionTrigger
                className="cursor-pointer text-[17px] font-semibold hover:no-underline py-5 text-left"
                style={{ color: '#1a1a2e' }}
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-[16px] leading-relaxed text-gray-500 pb-4">{faq.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* How to Apply */}
        <h2 className={styles.stepsTitle}>📋 How to Apply: Step-by-Step Guide</h2>
        <div>
          {steps.map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepNum}>{i + 1}</div>
              <div className={styles.stepBody}>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Share */}
        <div className={styles.share}>
          <span className={styles.shareLabel}>🔗 Share this visa guide</span>
          <div className={styles.shareButtons}>
            <a href="#" className={`${styles.shareBtn} ${styles.shareFb}`}>Facebook</a>
            <a href="#" className={`${styles.shareBtn} ${styles.shareX}`}>Twitter</a>
            <a href="#" className={`${styles.shareBtn} ${styles.shareIn}`}>LinkedIn</a>
            <a href="#" className={`${styles.shareBtn} ${styles.shareWa}`}>WhatsApp</a>
            <button className={`${styles.shareBtn} ${styles.shareCp}`}>Copy Link</button>
          </div>
        </div>
      </main>

      {/* Sidebar */}
      <div className={styles.sidebarCol}>
        <Sidebar applyLink={applyLink} countries={sidebarCountries} />
      </div>
    </div>
  );
}
