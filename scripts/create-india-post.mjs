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
const span = (text, marks = []) => ({ _type: "span", _key: key(), text, marks });
const block = (style, children, markDefs = []) => ({ _type: "block", _key: key(), style, markDefs, children });
const h2 = (text) => block("h2", [span(text)]);
const h3 = (text) => block("h3", [span(text)]);
const quote = (text) => block("blockquote", [span(text)]);

function p(...parts) {
  const markDefs = [];
  const children = parts.map((p) => {
    if (typeof p === "string") return span(p);
    if (p.bold) return span(p.text, ["strong"]);
    if (p.link) {
      const k = key();
      markDefs.push({ _key: k, _type: "link", href: p.link, blank: false });
      return span(p.text, [k]);
    }
    return span(p.text);
  });
  return block("normal", children, markDefs);
}

function li(...parts) {
  const children = parts.map((p) =>
    typeof p === "string" ? span(p) : span(p.text, p.bold ? ["strong"] : [])
  );
  return { _type: "block", _key: key(), style: "normal", markDefs: [], listItem: "bullet", level: 1, children };
}

// ─── Keywords from Search Console data ───
// "azerbaijan visa for indians" 387 imp pos 65
// "baku visa for indians" 114 imp
// "azerbaijan visa requirements for indian citizens" 50 imp
// "do indians need visa for azerbaijan" 29 imp
// "azerbaijan visa for indian citizens" 29 imp
// "azerbaijan e visa for indian" 26 imp
// "azerbaijan visa on arrival for indian" 20 imp
// "azerbaijan visa for indian passport holders" 14 imp
// "azerbaijan e visa for indian citizens" pos 12
// "azerbaijan e-visa for indian citizens" pos 11
// "do indians need a visa for azerbaijan" pos 1
// "azerbaijan indian passport" pos 1
// "azerbaijan visa for uae residents with indian passport" 5 imp

const body_en = [

  // ── INTRO — triggers country grid ──
  p(
    "Planning a trip to Baku from India? The first question every Indian traveler asks is: ",
    { text: "do Indians need a visa for Azerbaijan?", bold: true },
    " The answer is yes — but getting one is easier than you think. Indian passport holders are eligible for the Azerbaijan e-Visa, which can be applied for entirely online in under 5 minutes, with approval in as little as 3 hours. No embassy visit, no appointment, no paperwork. This complete guide covers everything Indian citizens need to know about the ",
    { text: "Azerbaijan visa for Indians", bold: true },
    " — requirements, fees, processing times, on-arrival options, and step-by-step application instructions. Find your answers below."
  ),

  // ── 1 ──
  h2("Do Indians Need a Visa for Azerbaijan?"),
  p(
    "Yes — ",
    { text: "Indian citizens need a visa to visit Azerbaijan", bold: true },
    ". India and Azerbaijan do not have a visa-free agreement, so Indian passport holders must obtain a visa before traveling. However, the process is completely online through the official ASAN e-Visa portal, which means no embassy queues, no physical documents to mail, and no waiting weeks for an appointment."
  ),
  p(
    "The ",
    { text: "Azerbaijan e-Visa for Indian citizens", bold: true },
    " is a single-entry electronic visa valid for 30 days of stay within a 90-day window from issuance. It covers tourism, business visits, family visits, and transit. The standard processing fee is ",
    { text: "$69 USD", bold: true },
    " and approval typically arrives within 3 business days — or within 3 hours with urgent processing."
  ),
  p(
    "The short answer for the popular search \"",
    { text: "do indians need visa for azerbaijan", bold: true },
    "\" — yes, but it takes 5 minutes to apply online and is approved in 3 days. This is one of the fastest and most straightforward visa processes for Indian travelers."
  ),

  // ── 2 ──
  h2("Azerbaijan e-Visa for Indian Citizens — Key Facts"),
  li({ text: "Visa type:", bold: true }, " Single-entry e-Visa (electronic, delivered by email)"),
  li({ text: "Validity:", bold: true }, " 90 days from date of issue"),
  li({ text: "Maximum stay:", bold: true }, " 30 days per entry"),
  li({ text: "Standard processing:", bold: true }, " 3 business days"),
  li({ text: "Urgent processing:", bold: true }, " 3 hours"),
  li({ text: "Fee:", bold: true }, " $69 USD standard (urgent costs more)"),
  li({ text: "Where to apply:", bold: true }, " Online only — no embassy visit required"),
  li({ text: "Who qualifies:", bold: true }, " All Indian passport holders"),
  li({ text: "Entry points:", bold: true }, " Heydar Aliyev International Airport (GYD), all land borders, Caspian Sea ports"),

  // ── 3 ──
  h2("Azerbaijan Visa Requirements for Indian Citizens"),
  p(
    "The ",
    { text: "Azerbaijan visa requirements for Indian citizens", bold: true },
    " are minimal compared to many other countries. Here is the complete document checklist:"
  ),

  h3("1. Valid Indian Passport"),
  p(
    "Your Indian passport must be valid for at least ",
    { text: "6 months beyond your planned departure date from Azerbaijan", bold: true },
    ". Example: if you plan to leave Azerbaijan on July 15, your passport must be valid until at least January 15 of the following year. The passport must be in good physical condition — no torn pages, water damage, or unreadable data."
  ),

  h3("2. Digital Passport-Sized Photo"),
  p(
    "A recent digital photo is required for all ",
    { text: "Azerbaijan visa applications for Indian passport holders", bold: true },
    ". Specifications:"
  ),
  li("White background only"),
  li("35×45mm equivalent dimensions"),
  li("Face clearly visible, front-facing, neutral expression"),
  li("No sunglasses or hats"),
  li("JPEG or PNG format, under 5 MB"),
  li("Taken within the last 6 months"),

  h3("3. Valid Email Address"),
  p(
    "Your approved ",
    { text: "Azerbaijan e-Visa", bold: true },
    " is sent as a PDF to your email address. Use a personal email you check regularly — not a temporary or work email managed by IT."
  ),

  h3("4. Payment Method"),
  p(
    "International credit or debit cards are accepted: Visa, Mastercard, American Express, Discover. Indian RuPay cards may not be accepted on all platforms — use a Visa or Mastercard international card. The standard ",
    { text: "Azerbaijan e-Visa fees for Indian citizens", bold: true },
    " are $69 USD for standard processing."
  ),

  h3("5. Travel Details"),
  p(
    "You'll need to provide your planned arrival date, purpose of visit (tourism, business, family visit), and accommodation details (hotel name or host address). A confirmed hotel booking is not mandatory for the online application but may be requested at the Azerbaijan border on arrival."
  ),

  // ── 4 ──
  h2("How to Apply for Azerbaijan Visa from India — Step by Step"),
  p(
    "Here is the complete process to get the ",
    { text: "Azerbaijan e-Visa for Indians", bold: true },
    " from India:"
  ),

  h3("Step 1: Gather Your Documents"),
  p("Before starting the online form, have ready: your Indian passport, a digital photo meeting the specifications above, your travel dates, and an international credit or debit card."),

  h3("Step 2: Go to the Application Portal"),
  p(
    "Apply through the official ASAN e-Visa portal or a licensed third-party service. The process is identical — both route through the same Azerbaijani government system."
  ),

  h3("Step 3: Fill in Your Details"),
  p(
    "Enter your personal information exactly as it appears on your Indian passport — full name including any middle names shown on the passport, date of birth, passport number, issue date, expiry date, and permanent address in India. ",
    { text: "A single typo in your passport number will result in rejection", bold: true },
    " — double-check before submitting."
  ),

  h3("Step 4: Upload Your Photo"),
  p("Upload your digital photo. The system will flag if the photo does not meet specifications. Resubmit if needed before proceeding to payment."),

  h3("Step 5: Select Processing Speed and Pay"),
  p(
    "Standard: 3 business days, $69 USD. Urgent: 3 hours, higher fee. Pay with your international card. You'll receive an immediate confirmation email with your application reference number."
  ),

  h3("Step 6: Receive Your e-Visa"),
  p(
    "Your approved Azerbaijan e-Visa arrives by email as a PDF. Print 1–2 copies and save a digital copy on your phone. Present it alongside your Indian passport at Azerbaijan immigration."
  ),

  // ── 5 ──
  h2("Azerbaijan Visa on Arrival for Indians — Is It Available?"),
  p(
    "This is one of the most searched questions: ",
    { text: "Azerbaijan visa on arrival for Indian", bold: true },
    " passport holders — is it possible?"
  ),
  p(
    { text: "No — visa on arrival is not available for Indian citizens.", bold: true },
    " Azerbaijan's visa-on-arrival facility is limited to citizens of specific countries under bilateral agreements, and India is not on that list. If an Indian traveler arrives at Baku's Heydar Aliyev Airport without a pre-approved e-Visa, they will be denied entry and put on the next flight back."
  ),
  p(
    "The only option for Indian citizens is to apply for the e-Visa online before traveling. The good news: the online process takes 5 minutes and costs $69 — far less hassle than many other countries' visa processes."
  ),
  p(
    "Similarly, for \"",
    { text: "baku visa for Indians", bold: true },
    "\" — there is no separate Baku visa. The Azerbaijan e-Visa covers the entire country including Baku, Gabala, Sheki, Quba, Lankaran, and all other cities and regions."
  ),

  // ── 6 ──
  h2("Azerbaijan Tourist Visa for Indian Citizens"),
  p(
    "The ",
    { text: "Azerbaijan tourist visa for Indian citizens", bold: true },
    " is the standard e-Visa described throughout this guide. It is valid for tourism, sightseeing, leisure travel, and visiting friends or family. Key points for Indian tourists:"
  ),
  li("No invitation letter required for tourism"),
  li("No proof of onward travel required for the online application"),
  li("Hotel booking not mandatory for the application (may be asked at border)"),
  li("No income proof or bank statements required"),
  li("Multiple tourists can apply independently — no group application needed"),
  p(
    "Popular tourist destinations for Indians visiting Azerbaijan: Baku Old City (Icheri Sheher, UNESCO World Heritage), Flame Towers, Heydar Aliyev Center, Gobustan Rock Art, Mud Volcanoes, Sheki Khan's Palace, and the Caspian Sea coastal promenade."
  ),

  // ── 7 ──
  h2("Azerbaijan Visit Visa for Indians — Family and Friends"),
  p(
    "The ",
    { text: "Azerbaijan visit visa for Indian", bold: true },
    " travelers visiting family or friends is the same e-Visa product applied under the \"family visit\" or \"personal\" purpose category. No invitation letter from the Azerbaijani host is required for the online e-Visa application. The Azerbaijani host does not need to register the visit with authorities in advance."
  ),
  p(
    "If you are visiting a family member who is an Azerbaijani citizen or long-term resident, you may be asked at the border to provide your host's contact details or address. Keep this information handy on your phone."
  ),

  // ── 8 ──
  h2("Azerbaijan e-Visa for Indians Living in UAE"),
  p(
    "A specific and common query: \"",
    { text: "Azerbaijan visa for UAE residents with Indian passport", bold: true },
    "\". Indian passport holders living in the UAE apply for the Azerbaijan e-Visa in exactly the same way as Indians applying from India. Your UAE residence (Iqama or UAE visa) does not affect the Azerbaijan e-Visa application."
  ),
  p(
    "You apply using your Indian passport details, not your UAE residency. As long as your Indian passport is valid for 6 months beyond your departure from Azerbaijan, you qualify. Many UAE-based Indians visit Azerbaijan as it is a short flight from Dubai (approximately 3.5 hours)."
  ),

  // ── 9 ──
  h2("Azerbaijan Transit Visa for Indians"),
  p(
    "For the search \"",
    { text: "do Indians need transit visa for Azerbaijan", bold: true },
    "\" — it depends:"
  ),
  li({ text: "Airside transit (not leaving the international zone):", bold: true }, " No visa required. You stay in the international terminal and board your next flight without passing through immigration."),
  li({ text: "Landside transit (leaving the airport, staying in Baku overnight):", bold: true }, " You need a standard e-Visa or transit visa. Apply for the regular e-Visa and indicate \"transit\" as your purpose of visit."),
  p(
    "Most Indian travelers transiting through Baku's Heydar Aliyev Airport on connecting flights do not need any visa as long as they do not exit the international terminal."
  ),

  // ── 10 ──
  h2("Azerbaijan Visa Fees for Indian Citizens"),
  p(
    "The ",
    { text: "Azerbaijan e-visa fees for Indian citizens", bold: true },
    " are straightforward with no hidden charges:"
  ),
  li({ text: "Standard processing (3 business days):", bold: true }, " $69 USD — includes government fee + processing"),
  li({ text: "Urgent processing (3 hours):", bold: true }, " $69 USD + urgent processing surcharge (varies by service, typically $40–80 extra)"),
  li({ text: "Children:", bold: true }, " Same fee applies regardless of age"),
  li({ text: "Payment currency:", bold: true }, " USD — automatically converted from INR by your bank at the prevailing rate"),
  p(
    "The fee is non-refundable even if your application is rejected — though rejections are rare for Indian tourist applications with complete documentation. The fee covers both the Azerbaijani government visa issuance fee and the processing service fee."
  ),

  // ── 11 ──
  h2("Azerbaijan Visa Validity for Indians — What the Numbers Mean"),
  p(
    "Understanding the three timing components of the ",
    { text: "Azerbaijan e-Visa validity", bold: true },
    " prevents costly mistakes:"
  ),

  h3("90-Day Validity Window"),
  p(
    "Once your e-Visa is approved, you have 90 days to enter Azerbaijan. If you apply on January 1, you must enter Azerbaijan by April 1. If you miss this window, the visa expires and you must apply again."
  ),

  h3("30-Day Maximum Stay"),
  p(
    "Once you enter Azerbaijan, you can stay for a maximum of 30 days. Day of arrival = Day 1. If you arrive on March 15, you must leave by April 13."
  ),

  h3("Single Entry"),
  p(
    "The standard e-Visa is single entry. If you exit Azerbaijan — for example, a day trip to Georgia — the visa is considered used. You cannot re-enter on the same visa. Plan your itinerary accordingly if you are doing a South Caucasus multi-country trip (Azerbaijan, Georgia, Armenia)."
  ),

  // ── 12 ──
  h2("Tips for Indian Travelers Visiting Azerbaijan"),
  li({ text: "Currency:", bold: true }, " Azerbaijani Manat (AZN). 1 AZN ≈ 49 INR. ATMs in Baku widely available. Card acceptance is high in the city."),
  li({ text: "Flight time:", bold: true }, " Approx 4.5–6 hours direct from Delhi/Mumbai. Azerbaijan Airlines (AZAL) and Air India operate routes."),
  li({ text: "Best time to visit:", bold: true }, " April–June and September–October for mild weather. Summers are hot (35°C+), winters are cold."),
  li({ text: "Language:", bold: true }, " Azerbaijani is the official language. Russian is widely spoken. English is common in tourist areas and hotels."),
  li({ text: "SIM card:", bold: true }, " Buy at Baku airport on arrival. Azercell and Bakcell offer affordable tourist data plans."),
  li({ text: "Food:", bold: true }, " Indian restaurants available in Baku city center. Azerbaijani cuisine is meat-heavy — vegetarian options are limited outside restaurants."),
  li({ text: "Visa photo:", bold: true }, " Get it taken before traveling — photo studios inside India are more reliable than last-minute airport photos."),

  // ── 13 ──
  h2("Frequently Asked Questions — Azerbaijan Visa for Indians"),

  h3("Is Azerbaijan visa free for Indians?"),
  p(
    { text: "No", bold: true },
    " — ",
    { text: "Azerbaijan is not visa free for Indians", bold: true },
    ". Indian passport holders must apply for the Azerbaijan e-Visa online before traveling. The process is simple and fully online."
  ),

  h3("How long does the Azerbaijan visa take for Indians?"),
  p(
    "Standard processing: 3 business days. Urgent processing: 3 hours. Apply at least 5 days before your trip for standard, or use urgent processing for last-minute travel."
  ),

  h3("Can Indians get Azerbaijan visa on arrival?"),
  p(
    { text: "No", bold: true },
    " — visa on arrival is not available for Indian citizens. You must apply online before arriving in Azerbaijan."
  ),

  h3("What is the Azerbaijan visa cost for Indians?"),
  p(
    "The standard fee is $69 USD (approximately ₹5,750 INR at current rates). Urgent processing costs more."
  ),

  h3("Can I apply for Azerbaijan visa from India?"),
  p(
    "Yes — the entire application is done online from anywhere, including India. You do not need to visit any embassy or consulate."
  ),

  h3("Does Indian passport need visa for Azerbaijan?"),
  p(
    "Yes — ",
    { text: "Indian passport holders need a visa for Azerbaijan", bold: true },
    ". Apply online for the e-Visa at least 3 business days before your travel date."
  ),

  h3("What is the Azerbaijan visa for Indians processing time?"),
  p(
    "Standard: 3 business days. Urgent: 3 hours. Most applications are processed faster than the stated time during business hours."
  ),

  h3("Can I visit Baku without a visa from India?"),
  p(
    "No — ",
    { text: "Indians need a visa to visit Baku", bold: true },
    ". Apply for the Azerbaijan e-Visa online. The e-Visa covers the entire country including Baku."
  ),

  quote(
    "Apply for your Azerbaijan e-Visa today — simple online process, $69 USD, approved in 3 business days or 3 hours with urgent processing. No embassy visit required for Indian citizens."
  ),
];

async function run() {
  const slug = "azerbaijan-visa-for-indians";

  const existing = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ _id }`,
    { slug }
  );

  const data = {
    _type: "post",
    slug: { _type: "slug", current: slug },
    publishedAt: new Date().toISOString(),
    english: {
      title_en: "Azerbaijan Visa for Indians — Complete Guide for Indian Citizens",
      category_en: "Visa Guide",
      excerpt_en: "Do Indians need a visa for Azerbaijan? Yes — but it takes 5 minutes online. Complete guide covering e-Visa requirements, fees, processing time, on-arrival rules, and step-by-step application for Indian passport holders.",
      metaTitle_en: "Azerbaijan Visa for Indians — Requirements, Fees & How to Apply",
      metaDescription_en: "Do Indians need a visa for Azerbaijan? Yes. Apply online in 5 min, approved in 3 days, $69 USD. Full guide: requirements, photo, fees, on-arrival rules for Indian passport holders.",
      body_en,
    },
  };

  let result;
  if (existing) {
    console.log(`Updating ${existing._id}...`);
    result = await client.patch(existing._id).set(data).commit();
  } else {
    console.log("Creating new post...");
    result = await client.create(data);
  }

  console.log("✅ Done:", result._id);
  console.log("URL: https://azerbaijan-evisa.com/en/" + slug);
}

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
