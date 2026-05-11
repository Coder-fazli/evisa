import { createClient } from "next-sanity";
import { config } from "dotenv";
import { randomBytes } from "crypto";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const key = () => randomBytes(6).toString("hex");

function span(text, marks = []) {
  return { _type: "span", _key: key(), text, marks };
}

function block(style, children, listItem = null, level = null, markDefs = []) {
  const b = { _type: "block", _key: key(), style, markDefs, children };
  if (listItem) { b.listItem = listItem; b.level = level || 1; }
  return b;
}

// Paragraph with optional bold/link spans. Pass a string for normal text,
// { text, bold: true } for bold, { text, link: "url" } for a link.
function paragraph(...parts) {
  const markDefs = [];
  const children = parts.map((p) => {
    if (typeof p === "string") return span(p);
    if (p.link) {
      const k = key();
      markDefs.push({ _key: k, _type: "link", href: p.link, blank: false });
      return span(p.text, [k]);
    }
    if (p.bold) return span(p.text, ["strong"]);
    return span(p.text);
  });
  return block("normal", children, null, null, markDefs);
}

const h2 = (text) => block("h2", [span(text)]);
const h3 = (text) => block("h3", [span(text)]);
const quote = (text) => block("blockquote", [span(text)]);
const li = (...parts) => {
  const children = parts.map((p) =>
    typeof p === "string" ? span(p) : span(p.text, p.bold ? ["strong"] : [])
  );
  return block("normal", children, "bullet", 1);
};

// ─────────────────────────────────────────────────────────────
// FULL 4000-WORD SEO-OPTIMIZED BODY (ENGLISH)
// ─────────────────────────────────────────────────────────────
const body_en = [
  // ─── 1. INTRO (250w) — triggers country grid auto-injection ───
  paragraph(
    "Planning a trip to Baku or anywhere else in Azerbaijan? The first thing every international traveler needs to understand is the ",
    { text: "Azerbaijan visa", bold: true },
    " system. In 2026, citizens of over 100 countries are eligible to obtain an ",
    { text: "Azerbaijan electronic visa", bold: true },
    " (e-Visa) entirely online — no embassy visit, no consulate interview, no paper documents. Whether you're traveling from the United States, United Kingdom, Italy, Pakistan, Saudi Arabia, Sri Lanka, India, Malaysia, China, Iran, or any other eligible country, the ",
    { text: "ASAN visa", bold: true },
    " platform makes the application remarkably simple, typically completed in under five minutes with approval in as little as three hours. This comprehensive guide covers everything you need to know: the current ",
    { text: "Azerbaijan visa policy", bold: true },
    ", all available ",
    { text: "Azerbaijan visa types", bold: true },
    " (tourist, business, transit, e-Visa), the full eligible countries list, exact document requirements, the step-by-step application process, fees, validity, stay duration, country-specific information, and answers to the most common questions travelers ask. Whether you need a quick Azerbaijan tourist visa for a weekend in Baku or a longer Azerbaijan visit visa for business or family purposes, you'll find the exact information you need right here. Let's begin with a quick look at which countries qualify for the Azerbaijan e-Visa — find your nationality below to jump straight to country-specific requirements and details:"
  ),

  // ─── COUNTRY GRID INJECTS HERE (post.body.slice(0, 1) + grid + slice(1)) ───

  // ─── 2. AZERBAIJAN VISA POLICY (~400w) ───
  h2("Understanding Azerbaijan Visa Policy in 2026"),
  paragraph(
    "The ",
    { text: "Azerbaijan visa policy", bold: true },
    " in 2026 is straightforward and traveler-friendly compared to many Central Asian and post-Soviet countries. The Republic of Azerbaijan maintains three main entry categories for foreign nationals: visa-free entry for a limited number of countries (mostly post-Soviet states and diplomatic partners), the Azerbaijan electronic visa (e-Visa) for the vast majority of travelers from over 100 eligible nations, and a traditional embassy or consulate visa for the small group of countries not included in the e-Visa program. The full visa policy is administered by the State Migration Service (DMX) in coordination with the Ministry of Foreign Affairs, and online applications are processed through the official ASAN portal."
  ),
  paragraph(
    "Under the current ",
    { text: "visa policy of azerbaijan", bold: true },
    ", citizens of countries like the United States, United Kingdom, Germany, France, Italy, Spain, the Netherlands, Australia, Canada, Japan, South Korea, India, Pakistan, Indonesia, Malaysia, Saudi Arabia, the UAE, Qatar, Kuwait, Bahrain, Oman, and dozens more are eligible to apply for the e-Visa online. Visa-free entry is limited to a small group: citizens of Armenia (limited), Belarus, Georgia, Kazakhstan, Kyrgyzstan, Moldova, Russia, Tajikistan, Turkey, Ukraine, and Uzbekistan can enter Azerbaijan without a visa for stays of up to 30–90 days depending on the bilateral agreement."
  ),
  paragraph(
    "It's worth noting that Azerbaijan updated visa requirements in recent years to streamline the process and dramatically reduce processing times. As of 2026, the standard e-Visa is valid for 30 days of stay within a 90-day window from issuance, and the application can be completed entirely from your phone or laptop. This represents a major upgrade over the older embassy-only model that previously required in-person interviews and paper documentation."
  ),
  paragraph(
    "For travelers asking ",
    { text: "do you need a visa for azerbaijan", bold: true },
    " — the answer for most non-CIS nationalities is yes, but the modern e-Visa system makes obtaining one as easy as booking a flight. Below, we cover the specific Azerbaijan visa types, full document requirements, the eligible countries list, and the application process in detail. Whether you're traveling for tourism, business, transit, or to visit family, there is a visa category to match your purpose."
  ),

  // ─── 3. AZERBAIJAN VISA TYPES (~500w) ───
  h2("Azerbaijan Visa Types — Which One Do You Need?"),
  paragraph(
    "Understanding the different ",
    { text: "Azerbaijan visa types", bold: true },
    " is the first step toward a successful application. The Azerbaijani government issues several visa categories depending on the purpose and length of your stay. Choosing the correct visa type is critical: applying under the wrong category can result in delays, rejection, or issues at the border."
  ),

  h3("1. Azerbaijan Tourist Visa (e-Visa)"),
  paragraph(
    "The most common visa for travelers is the ",
    { text: "Azerbaijan tourist visa", bold: true },
    ", issued as a single-entry e-Visa valid for 30 days of stay. This is the right choice if you're visiting Baku, Gabala, Sheki, Quba, Lankaran, or anywhere else in Azerbaijan for leisure, sightseeing, family visits, or short personal trips. The application is processed through the ASAN online portal in 3–5 business days (standard) or as quickly as 3 hours (urgent processing). Standard tourist visa requirements include a valid passport and a passport-sized digital photo."
  ),

  h3("2. Azerbaijan Business Visa"),
  paragraph(
    "If you're traveling to Azerbaijan for meetings, conferences, contract negotiations, or short-term business activities, you should apply for a business e-Visa. The requirements are nearly identical to the tourist visa, but you'll typically need an invitation letter from the Azerbaijani company you're visiting. Stay duration is also 30 days, single entry, and the fee structure is the same as the tourist visa."
  ),

  h3("3. Azerbaijan Visit Visa"),
  paragraph(
    "The ",
    { text: "Azerbaijan visit visa", bold: true },
    " is closely related to the tourist visa but is specifically intended for travelers visiting friends or family in Azerbaijan. It allows the same 30-day stay and is processed through the same e-Visa portal. Many applicants don't realize the visit visa and tourist visa are essentially the same product under the e-Visa umbrella."
  ),

  h3("4. Azerbaijan Transit Visa"),
  paragraph(
    "A transit visa is required if you're passing through Azerbaijan en route to another country and your transit stay exceeds the visa-free transit window. Most travelers connecting through Heydar Aliyev International Airport (GYD) without leaving the airport's international transit zone do not need this visa. If you plan to leave the airport during transit, apply for a standard e-Visa instead."
  ),

  h3("5. Azerbaijan Student Visa"),
  paragraph(
    "If you've been accepted to study at an Azerbaijani university — such as Baku State University, ADA University, or Khazar University — you must apply for a long-term student visa through an Azerbaijani embassy or consulate. The student visa is NOT available through the e-Visa system. You'll need an admission letter from the institution, financial documentation, and sometimes medical clearance."
  ),

  h3("6. Azerbaijan Work Visa"),
  paragraph(
    "Foreign nationals who plan to work in Azerbaijan must obtain a work permit through their employer first, then apply for a corresponding work visa at an Azerbaijani embassy or consulate. This category is also outside the e-Visa system and requires a full embassy application."
  ),

  paragraph(
    "For 95% of leisure and short-term business travelers, the ",
    { text: "electronic visa azerbaijan", bold: true },
    " (e-Visa tourist or business) is the right choice. Of all Azerbaijan visa types, the e-Visa is by far the fastest, cheapest, and most convenient. Continue reading to learn whether your country is eligible for the e-Visa program."
  ),

  // ─── 4. DO YOU NEED A VISA (~350w) ───
  h2("Do You Need a Visa for Azerbaijan?"),
  paragraph(
    "This is one of the most common questions we receive: ",
    { text: "do you need a visa for azerbaijan", bold: true },
    "? The short answer for the vast majority of international travelers is yes — but obtaining one is now easier than ever thanks to the e-Visa system. To determine ",
    { text: "which countries need visa for azerbaijan", bold: true },
    ", the rules are organized into three clear categories:"
  ),

  h3("Visa-Free Countries"),
  paragraph(
    "Citizens of Russia, Belarus, Ukraine, Moldova, Georgia, Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, Turkmenistan, and Turkey can enter Azerbaijan with just a valid passport for stays up to 30–90 days, depending on the specific bilateral agreement. Armenia has limited visa-free conditions due to political circumstances."
  ),

  h3("e-Visa Eligible Countries"),
  paragraph(
    "Over 100 countries qualify for the e-Visa program, including the United States, Canada, Mexico, the United Kingdom, Germany, France, Italy, Spain, the Netherlands, Belgium, Switzerland, Norway, Sweden, Denmark, Finland, Ireland, Portugal, Austria, Greece, Poland, Czech Republic, Hungary, Romania, Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman, Jordan, Japan, South Korea, Singapore, Malaysia, Indonesia, Philippines, Thailand, Vietnam, India, Pakistan, Bangladesh, Sri Lanka, Nepal, China, Australia, New Zealand, South Africa, Nigeria, Egypt, Morocco, Tunisia, Algeria, and Kenya."
  ),

  h3("Embassy-Required Countries"),
  paragraph(
    "A small number of countries are not on the e-Visa list and must apply at an Azerbaijani embassy or consulate. If your country isn't on either the visa-free or e-Visa list, contact your nearest Azerbaijani embassy for current procedures."
  ),

  paragraph(
    "So ",
    { text: "does azerbaijan need visa", bold: true },
    " for your nationality? The answer depends on your passport. For US, UK, EU, Australian, Canadian, Japanese, Korean, GCC, and most South Asian passport holders, the answer is: yes, but you can apply online via the e-Visa portal and have your visa approved in just 3 hours. Continue to the next section for the full Azerbaijan e-Visa eligible countries list."
  ),

  // ─── 5. ELIGIBLE COUNTRIES LIST (~400w) ───
  h2("Azerbaijan e-Visa Eligible Countries List"),
  paragraph(
    "The ",
    { text: "azerbaijan e visa eligible countries", bold: true },
    " list now includes over 100 nations, making the Azerbaijani e-Visa one of the most accessible electronic visa programs in the world. If your country is on this list, you can apply online, pay, and receive your approved visa entirely without visiting an embassy or consulate. The full list of ",
    { text: "asan visa countries", bold: true },
    " is updated periodically by the Azerbaijani government and current as of 2026, it includes:"
  ),

  h3("North and South America"),
  paragraph(
    "United States, Canada, Mexico, Brazil, Argentina, Chile, Peru, Colombia, Costa Rica, Panama, Uruguay, and most Caribbean nations."
  ),

  h3("Europe — Full EU and More"),
  paragraph(
    "United Kingdom, Germany, France, Italy, Spain, Netherlands, Belgium, Switzerland, Austria, Norway, Sweden, Denmark, Finland, Iceland, Ireland, Portugal, Poland, Czech Republic, Slovakia, Hungary, Slovenia, Croatia, Romania, Bulgaria, Greece, Cyprus, Malta, Estonia, Latvia, Lithuania, Luxembourg, Monaco, San Marino, Vatican City, Liechtenstein, and Andorra."
  ),

  h3("Middle East"),
  paragraph(
    "Saudi Arabia, United Arab Emirates, Kuwait, Qatar, Bahrain, Oman, Jordan, Israel, and Lebanon."
  ),

  h3("Asia-Pacific"),
  paragraph(
    "Japan, South Korea, Singapore, Hong Kong, Macao, Taiwan, Malaysia, Indonesia, Brunei, Philippines, Thailand, Vietnam, Cambodia, Laos, Myanmar, Mongolia, India, Pakistan, Bangladesh, Sri Lanka, Nepal, Maldives, Bhutan, and China."
  ),

  h3("Africa"),
  paragraph(
    "South Africa, Nigeria, Egypt, Morocco, Tunisia, Algeria, Kenya, Ghana, Ethiopia, Tanzania, Uganda, Senegal, and Côte d'Ivoire."
  ),

  h3("Oceania"),
  paragraph(
    "Australia, New Zealand, Fiji, and Samoa."
  ),

  paragraph(
    { text: "Important note for Iranian citizens:", bold: true },
    " Iran has a separate visa program with specific procedures. Iranian travelers should check with the Azerbaijani consulate for current rules and processing times."
  ),

  paragraph(
    { text: "For Saudi Iqama Holders:", bold: true },
    " Foreign nationals living in Saudi Arabia with a valid Iqama can apply for an Azerbaijan e-Visa as long as their nationality (home passport) is on the eligible countries list. The Iqama itself is not a passport — your application uses your passport country and details, not your residency."
  ),

  paragraph(
    "The fastest way to confirm whether your country is among the ",
    { text: "Check eligible countries page", link: "/visa" },
    " is to select your nationality from our eligibility tool. Each country listing shows current visa requirements, processing times, and any special conditions."
  ),

  // ─── 6. ASAN VISA (~350w) ───
  h2("What is ASAN Visa? Azerbaijan's Official e-Visa Portal"),
  paragraph(
    { text: "ASAN Visa", bold: true },
    " is the official online visa portal operated by the Government of Azerbaijan. The word \"ASAN\" comes from the Azerbaijani word meaning \"easy\" — a fitting name given how dramatically it has simplified the visa application process. Launched in 2016 and continuously upgraded since, the ",
    { text: "asan visa azerbaijan", bold: true },
    " system processes all e-Visa applications for the Republic of Azerbaijan."
  ),
  paragraph(
    "When you apply for an Azerbaijan e-Visa, whether through a third-party service or directly, your application is ultimately processed by the ASAN system. The platform is operated by the State Agency for Public Service and Social Innovations under the President of the Republic of Azerbaijan. It is fully integrated with the Ministry of Internal Affairs, the State Migration Service, and Azerbaijani border authorities at every entry point."
  ),

  h3("Key Features of the ASAN Visa System"),
  li("Fully online — no embassy visit required"),
  li("Multilingual interface (English, Russian, Azerbaijani, Arabic, Turkish, Chinese, Spanish)"),
  li("Standard processing in 3 business days"),
  li("Urgent processing in as fast as 3 hours"),
  li("Single-entry electronic visa with 30-day stay duration"),
  li("90-day validity from issuance"),
  li("Direct digital delivery — visa arrives in your email as a PDF"),
  li("No physical stamp or sticker required"),

  h3("Why Use a Third-Party Service Instead of the Official Portal?"),
  paragraph(
    "While you can apply directly through the official ASAN portal, many travelers prefer using a licensed third-party service for several practical reasons: better user experience with modern simplified application forms, pre-application document review that reduces rejection risk, direct customer support if anything goes wrong, full support for non-English speakers, and combined services like visa plus hotel plus airport transfer bundles."
  ),
  paragraph(
    "The ",
    { text: "asan azerbaijan visa", bold: true },
    " stamp on your application is identical regardless of whether you applied directly or through an authorized agent — both flow through the same government system, are verified at the same border checkpoints, and have the exact same legal validity."
  ),

  // ─── 7. REQUIREMENTS (~400w) ───
  h2("Azerbaijan e-Visa Requirements — Complete Checklist"),
  paragraph(
    "The ",
    { text: "Azerbaijan visa requirements", bold: true },
    " for the e-Visa are simple and minimal compared to traditional visa applications. Before starting your application, gather the following documents and information:"
  ),

  h3("1. Valid Passport"),
  paragraph(
    "Your passport must be valid for at least 6 months beyond your planned date of departure from Azerbaijan. This is the standard ",
    { text: "Azerbaijan e-visa passport validity requirement", bold: true },
    ". It must have at least 2 blank pages for entry/exit stamps (though stamping is no longer always done — the e-Visa is electronic) and be in good condition without tears, water damage, or missing pages."
  ),

  h3("2. Digital Passport Photo"),
  paragraph(
    "A recent photograph taken within the last 6 months, with a white background, face clearly visible, no sunglasses, hats, or filters. Format: JPG or PNG, typically under 5 MB. Suggested size equivalent to 35×45mm. Most smartphone cameras produce acceptable photos when shot against a plain white wall."
  ),

  h3("3. Travel Itinerary (Recommended)"),
  paragraph(
    "While not always required during application, a hotel booking confirmation or address of where you'll stay, plus a return flight ticket or onward travel plan, may be requested by Azerbaijani border officials upon arrival. Keep these accessible during your travel."
  ),

  h3("4. Valid Email Address"),
  paragraph(
    "Your approved e-Visa is delivered as a PDF to this email address. Use a personal email you check regularly. Avoid temporary or disposable email addresses, as you may need to access it from your phone at the border."
  ),

  h3("5. Payment Method"),
  paragraph(
    "A valid international credit or debit card (Visa, Mastercard, American Express). The standard fee is $69 USD, which includes both the government fee and processing. Urgent processing adds a small fee for 3-hour delivery."
  ),

  h3("6. Personal and Travel Information"),
  paragraph(
    "Be ready to provide: full name as it appears on your passport, date of birth, place of birth, nationality, passport number, passport issue and expiry dates, permanent address in your home country, planned date of arrival in Azerbaijan, purpose of visit, and contact phone number."
  ),

  paragraph(
    "There are ",
    { text: "no minimum age requirements", bold: true },
    " for the e-Visa, but minors typically need a parent or guardian to submit on their behalf. There are no minimum income or bank statement requirements for tourist e-Visas, unlike some other countries' visa systems."
  ),

  // ─── 8. HOW TO APPLY (~500w) ───
  h2("How to Apply for Azerbaijan e-Visa — Step by Step"),
  paragraph(
    "The complete process for ",
    { text: "how to apply azerbaijan e visa", bold: true },
    " has been simplified to just seven clear steps. Most applicants complete the entire process in under five minutes."
  ),

  h3("Step 1: Verify Your Eligibility"),
  paragraph(
    "Before you start, confirm that your country is on the Azerbaijan e-Visa eligible countries list. If it is, you can proceed online. If not, contact your nearest Azerbaijani embassy or consulate."
  ),

  h3("Step 2: Choose Your Processing Speed"),
  paragraph(
    "You'll choose between two main options: standard processing in 3 business days at the base fee, or urgent processing in 3 hours for an additional fee. If you have time before your trip, standard processing saves money. If you're booking a last-minute trip, urgent processing ensures you get your visa in time."
  ),

  h3("Step 3: Complete the Online Application Form"),
  paragraph(
    "The application asks for personal information (name, date of birth, nationality, passport details), contact information (email, phone, address), travel information (arrival date, purpose of visit, accommodation if known), upload of passport photo, and upload of passport bio page (some forms only — many e-Visa applications skip this step entirely)."
  ),
  paragraph(
    { text: "Tips for filling the form:", bold: true },
    " Enter your name exactly as it appears on your passport. Double-check passport number — the most common reason for rejection is a typo. Use a real, monitored email address. Format dates carefully (some forms use DD/MM/YYYY, others MM/DD/YYYY)."
  ),

  h3("Step 4: Pay the Visa Fee"),
  paragraph(
    "Submit payment via credit or debit card. International cards (Visa, Mastercard, AmEx, Discover) are accepted. Payment is secure and processed via SSL encryption. You'll receive an immediate confirmation email with your application reference number."
  ),

  h3("Step 5: Wait for Approval"),
  paragraph(
    "With urgent processing (3 hours), you'll typically receive your approved visa within the same business day. If you apply after business hours, processing may begin the next morning. With standard processing (3 business days), most approvals arrive in 24–72 hours during business days."
  ),

  h3("Step 6: Print or Save Your e-Visa"),
  paragraph(
    "Once approved, your e-Visa arrives as a PDF in your email. You can print 1–2 copies and carry with your passport, save a copy on your phone (offline access is recommended in case of poor airport WiFi), and forward to your travel companion or family member as a backup."
  ),

  h3("Step 7: Travel to Azerbaijan"),
  paragraph(
    "At the Azerbaijani border — whether airport, land crossing, or sea port — present your passport and a copy of your e-Visa. The border officer will verify your e-Visa electronically in the government system. Approved visas typically have no entry issues; the entire border check takes 1–2 minutes."
  ),

  paragraph(
    "That's the complete process. No embassy visit, no in-person interview, no paperwork mailed back and forth. The ",
    { text: "electronic visa azerbaijan", bold: true },
    " system is one of the most efficient government services available globally and the official way to get your Azerbaijan electronic visa quickly."
  ),

  // ─── 9. VISA ON ARRIVAL (~250w) ───
  h2("Azerbaijan Visa on Arrival — Who Qualifies?"),
  paragraph(
    "Many travelers ask about the ",
    { text: "Azerbaijan visa on arrival", bold: true },
    " option. While Azerbaijan does offer limited visa-on-arrival privileges, the system is much more restricted than the e-Visa program. Here's what you need to know about visa on arrival Azerbaijan in 2026:"
  ),

  h3("Who Qualifies for Visa on Arrival"),
  paragraph(
    "Visa on arrival is generally available only to citizens of CIS countries (most of whom can also enter visa-free anyway), specific bilateral agreement holders, diplomatic and official passport holders from certain partner nations, and cruise ship passengers in some special cases."
  ),

  h3("Who Does NOT Qualify"),
  paragraph(
    "Visa on arrival is NOT available to US passport holders, UK passport holders, EU passport holders, or most Asian, African, Australian, Oceanian, and Latin American passport holders. For 99% of travelers, the answer to ",
    { text: "visa for azerbaijan on arrival", bold: true },
    " is: apply for the e-Visa before you travel. Showing up at the airport without a visa is a major mistake — you will be refused boarding by your airline, or refused entry by Azerbaijani border officials."
  ),
  paragraph(
    "The single biggest advantage of the e-Visa over visa on arrival is predictability. With an approved e-Visa, you know you can enter Azerbaijan before you even board your flight. Bottom line: get the e-Visa before you fly. It costs $69, takes 5 minutes to apply, and guarantees your entry."
  ),

  // ─── 10. VALIDITY (~300w) ───
  h2("Azerbaijan e-Visa Validity, Stay Duration and Fees"),
  paragraph(
    "Understanding the ",
    { text: "asan e-visa azerbaijan validity 30 days stay", bold: true },
    " rules and other timing details is critical for planning your trip. The Azerbaijan e-Visa has three timing components: validity period, stay duration, and entry type."
  ),

  h3("Validity Period: 90 Days"),
  paragraph(
    "The e-Visa is valid for 90 days from the date of issue. This means you have a 3-month window after approval to enter Azerbaijan. If you don't enter within this window, the visa expires and you must apply again."
  ),

  h3("Stay Duration: 30 Days"),
  paragraph(
    "Once you enter Azerbaijan, you can remain in the country for a maximum of 30 days per visa. Day of arrival counts as Day 1. Example: enter on May 1, you must leave by May 30. The ",
    { text: "azerbaijan e-visa asan visa 30 days official", bold: true },
    " rule is strict — overstaying results in fines and possible entry bans for future travel."
  ),

  h3("Entry Type: Single Entry"),
  paragraph(
    "The standard e-Visa is single entry only. This means once you exit Azerbaijan, the visa is used up — you can't re-enter on the same visa. If you plan to visit Azerbaijan, exit briefly to Georgia or Iran, and return, you must apply for a new visa for the second entry."
  ),

  h3("Fees Summary"),
  paragraph(
    "Standard e-Visa (3 business days): $69 USD. Urgent e-Visa (3 hours): $69 plus urgent processing fee that varies by service. The fee includes both the government fee and the processing/service fee. Fees are non-refundable, even if your application is rejected (rejection is rare for tourist applications with complete documents)."
  ),

  // ─── 11. COUNTRY-SPECIFIC (~400w) ───
  h2("Country-Specific Notes for Top Searching Nations"),
  paragraph(
    "Different countries have slightly different application experiences. Here are key notes for travelers from the top countries by search interest:"
  ),

  h3("Azerbaijan e-Visa for US Citizens"),
  paragraph(
    "United States passport holders are fully eligible for the e-Visa. Average processing: 3 hours with urgent, 3 days with standard. No additional documents required beyond the standard set. Most US applicants are approved on the same business day they apply, making this one of the smoothest visa processes for American travelers in the entire region."
  ),

  h3("Azerbaijan e-Visa for UK Citizens"),
  paragraph(
    "UK passport holders are eligible. Brexit didn't change Azerbaijan's visa policy — UK nationals continue to apply via the e-Visa portal exactly as they did before 2020. Average approval time: under 24 hours during business days."
  ),

  h3("Azerbaijan Visa for Italian Citizens"),
  paragraph(
    "Italian citizens are fully eligible for the e-Visa. ",
    { text: "Azerbaijan visa for italian", bold: true },
    " travelers is processed the same as any EU citizen — passport must have 6 months validity, $69 standard fee. Many Italians visit Azerbaijan for cultural tourism: Baku Old City, Palace of the Shirvanshahs, the Maiden Tower, and the famous Yanar Dag flaming hillside."
  ),

  h3("Azerbaijan Visa Requirements for Pakistani Citizens"),
  paragraph(
    "Pakistani passport holders are eligible for the e-Visa. The application is identical to other nationalities — no additional embassy documentation required. Most Pakistani applicants choose urgent processing for faster approval. Pakistan ranks among the top sending countries for Azerbaijan tourism."
  ),

  h3("Azerbaijan e-Visa for Saudi Iqama Holders"),
  paragraph(
    { text: "Azerbaijan e visa for saudi iqama holders", bold: true },
    " — important clarification: The Iqama is a Saudi residency permit, not a passport. When applying, you use your home country's passport (not the Iqama). As long as your home country is on the eligible list (most are, including Pakistan, India, Bangladesh, Philippines, Egypt, Nepal), you qualify for the e-Visa. The Iqama is not relevant to the visa decision itself."
  ),

  h3("Azerbaijan Visa for Sri Lankan Passport Holders"),
  paragraph(
    { text: "Azerbaijan visa for sri lankan passport holders", bold: true },
    " are fully eligible for the e-Visa. The application is the standard online process — $69 fee, 3-day or 3-hour processing. Sri Lankan citizens should ensure their passport has 6 months of validity beyond planned departure from Azerbaijan."
  ),

  h3("Azerbaijan e-Visa Requirements for Argentine Citizens"),
  paragraph(
    { text: "Azerbaijan evisa requirements for argentine citizens", bold: true },
    " are the same as for other South American nationalities. Standard documents — passport, photo, payment. Argentine travelers benefit from the same 30-day stay duration as all e-Visa holders."
  ),

  h3("Azerbaijan Visa on Arrival for Malaysian Citizens"),
  paragraph(
    { text: "Azerbaijan visa on arrival malaysia 2024", bold: true },
    " has been replaced by the standard e-Visa for Malaysian citizens. While Malaysia previously had some visa-on-arrival privileges, all Malaysian travelers should now apply for the e-Visa online before flying to avoid issues at the border."
  ),

  // ─── 12. FAQ (~250w) ───
  h2("Frequently Asked Questions"),

  h3("Is there a special visa for Baku Azerbaijan?"),
  paragraph(
    "There's no separate ",
    { text: "visa for baku azerbaijan", bold: true },
    ". The Azerbaijan e-Visa covers entry to the entire country, including Baku, Gabala, Sheki, Quba, Lankaran, and all other cities and regions. One e-Visa works for the whole country."
  ),

  h3("Is Azerbaijan visa-free for any country?"),
  paragraph(
    { text: "Azerbaijan visa free", bold: true },
    " entry is available only to a small list of countries, mostly post-Soviet states like Russia, Georgia, Ukraine, Belarus, Kazakhstan, Uzbekistan, and Tajikistan, plus Turkey. For most international travelers, the e-Visa is the standard route."
  ),

  h3("What's the difference between e-Visa and ASAN visa?"),
  paragraph(
    "They're the same thing. ASAN visa is the name of the government portal that processes e-Visa applications. The terms ",
    { text: "evisa for azerbaijan", bold: true },
    ", ",
    { text: "evisa to azerbaijan", bold: true },
    ", electronic visa, and ASAN visa all refer to the same online visa product."
  ),

  h3("Can I extend my Azerbaijan e-Visa?"),
  paragraph(
    "No — the e-Visa cannot be extended from inside Azerbaijan. You must leave the country before your 30-day stay expires. If you wish to stay longer, you must apply for a new visa from outside the country."
  ),

  h3("What if my e-Visa application is rejected?"),
  paragraph(
    "Rejections are very rare for tourist applications with complete documentation. If rejected, you can either reapply (after correcting the issue, typically a typo or photo problem) or apply via an Azerbaijani embassy."
  ),

  h3("Is the e-Visa accepted at all entry points?"),
  paragraph(
    "Yes — Heydar Aliyev International Airport (Baku), all land border crossings with Georgia, Russia, Iran, and Turkey, and Caspian Sea ports all accept the e-Visa for entry. There are no special entry restrictions based on visa type."
  ),

  quote(
    "Final tip: apply for your Azerbaijan visa at least 5 days before your planned travel date to avoid stress, and always print 1–2 copies of your approved e-Visa to carry alongside your passport. Safe travels to Baku!"
  ),
];

async function run() {
  console.log("Creating Azerbaijan Visa Guide post...");

  const slug = "azerbaijan-visa-complete-guide-2026";

  // Check if already exists
  const existing = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ _id }`,
    { slug }
  );

  const data = {
    _type: "post",
    slug: { _type: "slug", current: slug },
    publishedAt: new Date().toISOString(),
    english: {
      title_en: "Azerbaijan Visa 2026: Complete Guide to e-Visa, Policy & Requirements",
      category_en: "Visa Guide",
      excerpt_en:
        "Everything you need to know about the Azerbaijan visa in 2026 — e-Visa, ASAN visa, visa types, policy, eligible countries, requirements, and how to apply step by step.",
      metaTitle_en:
        "Azerbaijan Visa 2026: e-Visa, ASAN, Policy & Requirements Guide",
      metaDescription_en:
        "Complete Azerbaijan visa guide 2026. Learn about e-Visa, ASAN visa, visa types, requirements, eligible countries, visa policy, and how to apply online. 100+ countries.",
      body_en,
    },
  };

  let result;
  if (existing) {
    console.log(`Post exists (${existing._id}), updating...`);
    result = await client.patch(existing._id).set(data).commit();
  } else {
    console.log("Creating new post...");
    result = await client.create(data);
  }

  console.log("Done. Post ID:", result._id);
  console.log("Slug:", slug);
  console.log(`Live at: https://azerbaijan-evisa.com/en/${slug}`);
  console.log(`Word count: ~4350 words`);
}

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
