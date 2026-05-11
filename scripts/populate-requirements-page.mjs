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

function paragraph(...parts) {
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

// ═══════════════════════════════════════════════════════════════════════
// ENGLISH — ~4000 words
// Targeting: azerbaijan e visa (774), e visa azerbaijan (616),
// azerbaijan visa requirements (260), azerbaijan e visa requirements (41, pos 5),
// documents required for azerbaijan e visa (pos 1), photo, passport, turkish citizens, etc.
// ═══════════════════════════════════════════════════════════════════════

const body_en = [
  // ── 1. INTRO ──
  paragraph(
    "Planning a trip to Baku? The most important step before booking your flights is understanding the ",
    { text: "Azerbaijan e-Visa requirements", bold: true },
    ". The good news: citizens of over 100 countries can apply for an ",
    { text: "e-Visa Azerbaijan", bold: true },
    " entirely online, with no embassy visit required. This complete guide covers every requirement you need — documents, passport validity, photo specifications, application steps, validity rules, country-specific notes for Turkish, UK, US, Pakistani, Nigerian, and Iranian citizens, and answers to the most common questions. Whether you call it an ",
    { text: "evisa Azerbaijan", bold: true },
    ", ASAN visa, or ",
    { text: "Azerbaijan electronic visa", bold: true },
    ", the requirements are the same. Read this before you apply."
  ),

  // ── 2. OVERVIEW ──
  h2("Azerbaijan e-Visa Requirements 2026 — Overview"),
  paragraph(
    "The ",
    { text: "Azerbaijan e-Visa", bold: true },
    " is the official online travel authorization issued by the government of Azerbaijan through the ASAN portal. To apply successfully, you must meet a basic set of eligibility criteria and submit specific documents. Unlike traditional embassy visas, the ",
    { text: "evisa for Azerbaijan", bold: true },
    " requires no in-person appointment, no paper forms, and no courier service. Everything is done online."
  ),
  paragraph(
    "Here is a quick checklist of the core ",
    { text: "visa requirements for Azerbaijan", bold: true },
    " before we go into detail:"
  ),
  li({ text: "Valid passport", bold: true }, " with at least 6 months validity beyond your planned departure from Azerbaijan"),
  li({ text: "Digital passport photo", bold: true }, " meeting specific size and format requirements"),
  li({ text: "Valid email address", bold: true }, " to receive your approved e-Visa PDF"),
  li({ text: "Credit or debit card", bold: true }, " for online payment ($69 USD standard fee)"),
  li({ text: "Travel dates", bold: true }, " — your planned date of arrival in Azerbaijan"),
  li("Accommodation details (hotel name or host address — recommended but not mandatory for online application)"),
  paragraph(
    "These ",
    { text: "Azerbaijan evisa requirements", bold: true },
    " are the same for all nationalities. There are no income requirements, no bank statements needed, no invitation letters for tourist visas, and no medical certificates. The ",
    { text: "e-Visa for Azerbaijan", bold: true },
    " is one of the most streamlined electronic visa systems in the world."
  ),

  // ── 3. REQUIRED DOCUMENTS ──
  h2("Documents Required for Azerbaijan e-Visa"),
  paragraph(
    "The ",
    { text: "documents required for Azerbaijan e-Visa", bold: true },
    " are minimal. Here is exactly what you need to prepare before starting your online application:"
  ),

  h3("1. Valid Passport (Mandatory)"),
  paragraph(
    "Your passport is the single most critical document for the ",
    { text: "Azerbaijan e-Visa application", bold: true },
    ". Requirements:"
  ),
  li({ text: "Validity:", bold: true }, " Must be valid for at least 6 months beyond your planned departure date from Azerbaijan"),
  li({ text: "Condition:", bold: true }, " Must be in good physical condition — no water damage, torn pages, or illegible data"),
  li({ text: "Blank pages:", bold: true }, " At least 1–2 blank pages for entry/exit stamps (though Azerbaijan often processes entries electronically)"),
  li({ text: "Type:", bold: true }, " Regular (tourist/ordinary) passport. Some restrictions may apply to official and diplomatic passports — contact the relevant embassy"),
  paragraph(
    "Note: The ",
    { text: "Azerbaijan e-visa passport validity requirement", bold: true },
    " of 6 months is strictly enforced. If your passport expires in less than 6 months from your intended departure from Azerbaijan, you will be rejected at the application stage or refused entry at the border."
  ),

  h3("2. Digital Passport-Sized Photo (Mandatory)"),
  paragraph(
    "A common question is: what is the ",
    { text: "Azerbaijan visa photo size", bold: true },
    " and format? Here are the exact specifications:"
  ),
  li({ text: "Background:", bold: true }, " Plain white only — no gray, cream, or off-white"),
  li({ text: "Size:", bold: true }, " 35×45mm equivalent (standard international passport photo)"),
  li({ text: "Face:", bold: true }, " Full face, front-facing, eyes open and clearly visible"),
  li({ text: "No accessories:", bold: true }, " No sunglasses, no hats (unless worn for religious reasons)"),
  li({ text: "Format:", bold: true }, " JPEG or PNG, file size under 5 MB"),
  li({ text: "Recency:", bold: true }, " Taken within the last 6 months"),
  li({ text: "Expression:", bold: true }, " Neutral expression, mouth closed"),
  paragraph(
    "Smartphone photos taken against a white wall work well if the lighting is even and the face is not shadowed. Many photo apps (Adobe Scan, Passport Photo Maker) can automatically generate a compliant photo. Avoid heavy filters, Photoshop edits that alter your facial features, or photos where your face is partially covered."
  ),

  h3("3. Valid Email Address (Mandatory)"),
  paragraph(
    "Your approved ",
    { text: "e-Visa to Azerbaijan", bold: true },
    " is delivered as a PDF to the email address you provide. Use a personal email you actively monitor — not a work email managed by IT, and not a temporary/disposable address. If the approval email lands in spam, you could miss it close to your travel date."
  ),

  h3("4. Payment Method (Mandatory)"),
  paragraph(
    "All major international credit and debit cards are accepted: Visa, Mastercard, American Express, Discover. The standard fee for the ",
    { text: "Azerbaijan e-Visa online apply", bold: true },
    " is ",
    { text: "$69 USD", bold: true },
    ", which covers both the government fee and processing. For urgent processing (3 hours), an additional fee applies. Prepaid cards and some regional bank cards may be declined — use a major international card if possible."
  ),

  h3("5. Travel Information (Partially Required)"),
  paragraph(
    "During the ",
    { text: "azerbaijan e visa application", bold: true },
    ", you will be asked to provide:"
  ),
  li({ text: "Planned arrival date:", bold: true }, " Your estimated first day in Azerbaijan"),
  li({ text: "Purpose of visit:", bold: true }, " Tourism, business, transit, visiting family/friends"),
  li({ text: "Accommodation:", bold: true }, " Hotel name or host address (often optional — you can enter approximate details)"),
  li({ text: "Port of entry:", bold: true }, " Airport (Heydar Aliyev International), land border, or sea port"),
  paragraph(
    "You do not need a confirmed return flight ticket or hotel booking to apply for the e-Visa online. These may be requested at the Azerbaijani border on arrival, but are not part of the digital application form."
  ),

  h3("6. Passport Scan (Some Platforms Only)"),
  paragraph(
    "Some application portals request a scanned copy of your passport data page (",
    { text: "Azerbaijan visa passport scan", bold: true },
    "). This is a photo or scan of the biographical page showing your name, photo, passport number, and expiry date. If requested, ensure the scan is clear, all text is legible, and there is no glare or shadow. A smartphone photo works well if taken in bright natural light on a flat surface."
  ),

  // ── 4. PASSPORT REQUIREMENTS ──
  h2("Azerbaijan e-Visa Passport Requirements"),
  paragraph(
    "The ",
    { text: "azerbaijan e-visa passport validity requirement", bold: true },
    " is one of the most misunderstood aspects of the application. Here is everything you need to know about passport eligibility."
  ),

  h3("Minimum Passport Validity"),
  paragraph(
    "Your passport must be valid for at least ",
    { text: "6 months beyond the date you plan to leave Azerbaijan", bold: true },
    " — not 6 months from today, and not 6 months from when you enter Azerbaijan. Example: if you plan to enter on June 1 and leave on June 20, your passport must be valid until at least December 20 (6 months after June 20)."
  ),

  h3("Passport Nationality vs. Country of Residence"),
  paragraph(
    "The e-Visa eligibility is based on your passport nationality, not your country of residence. If you hold a Pakistani passport and live in Saudi Arabia, you apply as a Pakistani citizen. If you hold a UK passport and live in the UAE, you apply as a UK citizen. The ",
    { text: "Azerbaijan passport requirements", bold: true },
    " are the same regardless of where you currently live."
  ),

  h3("Dual Nationality"),
  paragraph(
    "If you hold two passports, apply with the passport of the country that has easier or more established e-Visa eligibility. Once approved, travel to Azerbaijan using the passport you used to apply — the e-Visa is linked to a specific passport number."
  ),

  h3("Refugee Travel Documents"),
  paragraph(
    "Citizens traveling on refugee travel documents or stateless person documents should contact the nearest Azerbaijani embassy or consulate for specific guidance. The standard e-Visa system is designed for standard national passports. There is a specific query for ",
    { text: "azerbaijan visa for refugee travel document", bold: true },
    " holders — embassy application is the recommended route."
  ),

  // ── 5. PHOTO REQUIREMENTS ──
  h2("Azerbaijan e-Visa Photo Requirements — Size, Format & Common Mistakes"),
  paragraph(
    "Photo rejection is one of the top reasons for application delays. Understanding the ",
    { text: "azerbaijan visa photo size", bold: true },
    " and format requirements in full detail prevents this issue."
  ),

  h3("Accepted Photo Specifications"),
  li({ text: "Dimensions:", bold: true }, " 35mm × 45mm (standard biometric passport photo)"),
  li({ text: "Resolution:", bold: true }, " Minimum 600×800 pixels recommended"),
  li({ text: "Color:", bold: true }, " Full color (no black-and-white)"),
  li({ text: "Background:", bold: true }, " Pure white (#FFFFFF) — light backgrounds that are not white will be rejected"),
  li({ text: "File type:", bold: true }, " JPEG (.jpg) preferred, PNG also accepted"),
  li({ text: "File size:", bold: true }, " Under 5 MB"),
  li({ text: "Face coverage:", bold: true }, " Face should occupy 70–80% of the frame"),

  h3("Common Rejection Reasons"),
  li("Background is off-white, gray, or has shadows"),
  li("Wearing sunglasses or a hat (unless religious headwear not obscuring the face)"),
  li("Photo is too old (more than 6 months)"),
  li("Face is tilted, not fully front-facing, or partially cut off"),
  li("Heavy filter, over-exposure, or heavy editing"),
  li("Glare on glasses (if you wear glasses, remove them for the photo)"),
  li("Photo is blurry or pixelated"),

  paragraph(
    "If you are unsure about your photo, use the official ASAN portal's built-in photo checker or a dedicated passport photo app. A rejected photo typically means you must resubmit — this delays your application and may require a new payment if a different application reference is used."
  ),

  // ── 6. HOW TO APPLY ──
  h2("How to Apply for Azerbaijan e-Visa Online — Step by Step"),
  paragraph(
    "Here is the complete process for ",
    { text: "how to apply Azerbaijan e-Visa", bold: true },
    " online, from preparation to receiving your approved document:"
  ),

  h3("Step 1: Check Your Eligibility"),
  paragraph(
    "Visit the ",
    { text: "eligible countries page", link: "/visa" },
    " and confirm your nationality is on the e-Visa eligible list. Citizens of over 100 countries can apply online. If your country is not on the list, you must apply through an Azerbaijani embassy."
  ),

  h3("Step 2: Select Processing Speed"),
  paragraph(
    "Standard processing: ",
    { text: "3 business days — $69 USD", bold: true },
    ". Urgent processing: ",
    { text: "3 hours — additional fee", bold: true },
    ". If your trip is within the next 4 days, select urgent processing to ensure your visa arrives in time."
  ),

  h3("Step 3: Complete the Online Application Form"),
  paragraph(
    "The ",
    { text: "azerbaijan e visa apply online", bold: true },
    " form asks for:"
  ),
  li("Full name (exactly as on passport — including middle names if shown)"),
  li("Date of birth, place of birth, nationality"),
  li("Passport number, issue date, expiry date"),
  li("Permanent home address"),
  li("Planned arrival date and port of entry"),
  li("Purpose of visit"),
  li("Emergency contact (name and phone number)"),
  li("Upload passport photo"),
  paragraph(
    { text: "Critical:", bold: true },
    " Enter your passport number exactly as printed — even a single character error causes rejection. Double-check before submitting."
  ),

  h3("Step 4: Upload Your Photo"),
  paragraph(
    "Upload your digital photo meeting the specifications above. The system will auto-check for compliance on some platforms. If rejected, re-upload with the required adjustments before proceeding."
  ),

  h3("Step 5: Pay Online"),
  paragraph(
    "Pay $69 USD (standard) or the urgent fee using your international credit or debit card. You'll receive an immediate payment confirmation email with your application reference number."
  ),

  h3("Step 6: Wait for Approval"),
  paragraph(
    "Standard: approval within 3 business days. Urgent: within 3 hours during business hours. You'll receive an email notification when your ",
    { text: "Azerbaijan evisa online", bold: true },
    " is approved, with the e-Visa PDF attached."
  ),

  h3("Step 7: Print and Travel"),
  paragraph(
    "Print 1–2 copies of your approved e-Visa and carry them with your passport. Save a digital copy on your phone (offline access recommended — airport WiFi can be unreliable). Present the printout at Azerbaijani immigration alongside your passport."
  ),

  h3("How to Check Your Azerbaijan e-Visa Status"),
  paragraph(
    "Some travelers ask how to do an ",
    { text: "azerbaijan e visa check by passport number", bold: true },
    ". You can check the status of your application on the official ASAN portal (evisa.gov.az) using your application reference number or passport number. Third-party services also provide status tracking if you applied through them."
  ),

  // ── 7. VALIDITY ──
  h2("Azerbaijan e-Visa Validity, Stay Duration and Entry Rules"),
  paragraph(
    "Understanding the ",
    { text: "azerbaijan e visa validity", bold: true },
    " rules before you travel prevents overstay fines and entry bans."
  ),

  h3("Validity Period: 90 Days from Issue"),
  paragraph(
    "The ",
    { text: "ASAN e-visa azerbaijan validity", bold: true },
    " window is 90 days from the date the visa is issued. This means you must enter Azerbaijan within 90 days of your e-Visa approval — not within 90 days of when you submitted your application."
  ),

  h3("Maximum Stay: 30 Days"),
  paragraph(
    "Once you enter Azerbaijan, you may stay for a ",
    { text: "maximum of 30 days", bold: true },
    " per e-Visa. Day of entry counts as Day 1. If you enter on May 1, you must leave by May 30. Overstaying results in fines at the exit point and can affect future visa eligibility."
  ),

  h3("Entry Type: Single Entry"),
  paragraph(
    "The standard e-Visa is ",
    { text: "single entry only", bold: true },
    ". If you leave Azerbaijan during your 30-day stay — for example, a day trip to Georgia or Iran — the visa is considered used. You would need a new e-Visa to re-enter. Plan accordingly if you're doing a multi-country itinerary."
  ),

  h3("Can You Extend the Azerbaijan e-Visa?"),
  paragraph(
    "No — the e-Visa cannot be extended from inside Azerbaijan. The ",
    { text: "asan e-visa azerbaijan maximum stay 30 days", bold: true },
    " rule is firm. If you need to stay longer, you must leave the country and apply for a new visa before returning."
  ),

  // ── 8. TURKISH CITIZENS ──
  h2("Azerbaijan e-Visa for Turkish Citizens"),
  paragraph(
    "Turkey is one of the highest-search nationalities for Azerbaijan visa information. Here is everything about the ",
    { text: "azerbaijan e-visa turkish citizens", bold: true },
    " process:"
  ),
  paragraph(
    "Turkish citizens actually have a special status with Azerbaijan — ",
    { text: "Turkish passport holders can enter Azerbaijan visa-free", bold: true },
    " for up to 90 days without any visa, e-Visa, or ASAN application. This is due to the bilateral agreement between Turkey and Azerbaijan based on their close historical, cultural, and diplomatic ties."
  ),
  paragraph(
    "This means for the query ",
    { text: "\"azerbaijan visa requirements for turkish citizens 2024\"", bold: true },
    " — the answer is: no visa required. Turkish citizens only need a valid Turkish passport (or even just a Turkish national ID card) to enter Azerbaijan. This applies to tourism, business visits, and short stays."
  ),
  paragraph(
    "For longer stays or specific visa types (work, student, residence), Turkish citizens should contact the Azerbaijani consulate. But for standard tourism, no Azerbaijan visa is required whatsoever — Turkish citizens are exempt."
  ),

  // ── 9. COUNTRY-SPECIFIC ──
  h2("Country-Specific Azerbaijan e-Visa Requirements"),

  h3("Azerbaijan e-Visa for UK Citizens"),
  paragraph(
    "UK passport holders are fully eligible for the ",
    { text: "azerbaijan e visa for uk citizens", bold: true },
    " through the standard ASAN online portal. Brexit did not affect Azerbaijan's visa policy toward UK nationals. Standard documents apply: valid passport (6 months), photo, email, payment. Approval: 3 business days standard or 3 hours urgent."
  ),

  h3("Azerbaijan Visa Requirements for US Citizens"),
  paragraph(
    "The ",
    { text: "azerbaijan visa requirements for us citizens", bold: true },
    " are identical to other eligible nationalities. US passport holders apply online, pay $69 USD, and typically receive approval within 24–48 hours. No additional documentation beyond the standard requirements is needed."
  ),

  h3("Azerbaijan e-Visa Requirements for Pakistani Citizens"),
  paragraph(
    "For the popular search ",
    { text: "\"azerbaijan e visa requirements for pakistani\"", bold: true },
    " — Pakistani passport holders are fully eligible and apply through the standard online process. Same documents, same fee ($69), same 3-day processing. No invitation letter, no embassy visit."
  ),

  h3("Azerbaijan Visa Requirements for Nigerian Citizens"),
  paragraph(
    "Nigerian passport holders are eligible for the Azerbaijan e-Visa. The ",
    { text: "azerbaijan visa requirements for nigerian citizens", bold: true },
    " are the standard set: valid passport, photo, payment. One note: Nigerian travelers should ensure their yellow fever vaccination certificate is up to date, as this may be requested at the Azerbaijan border (not part of the e-Visa application but a border health requirement)."
  ),

  h3("Azerbaijan Visa Requirements for Iranian Citizens"),
  paragraph(
    "The ",
    { text: "azerbaijan visa requirements for iranian citizens", bold: true },
    " are handled through a separate agreement. Iranian citizens should contact the nearest Azerbaijani embassy or consulate for current procedures, as the standard e-Visa process may not be available to all Iranian passport holders. Specific rules can change based on diplomatic relations — always verify before traveling."
  ),

  h3("Azerbaijan Visa for Philippine Passport Holders"),
  paragraph(
    "Philippine passport holders (queries about \"",
    { text: "azerbaijan visa for philippine passport holder", bold: true },
    "\") are eligible for the e-Visa. Standard requirements apply. Processing typically takes 3 business days."
  ),

  h3("Azerbaijan Visa for Afghans"),
  paragraph(
    "Afghan passport holders (",
    { text: "azerbaijan visa for afghans", bold: true },
    ") should apply through the standard e-Visa channel — Afghan nationals are generally on the eligible list. Verify current eligibility on the ASAN portal before applying, as rules can be updated."
  ),

  h3("Azerbaijan Visa for Filipino Citizens"),
  paragraph(
    "Filipino citizens (\"",
    { text: "azerbaijan visa for filipino", bold: true },
    "\") are eligible for the standard e-Visa. Same process, same documents, same $69 USD fee."
  ),

  h3("Aserbaidschan e-Visa (For German-Speaking Travelers)"),
  paragraph(
    "German-speaking travelers searching for \"",
    { text: "evisa Aserbaidschan", bold: true },
    "\", \"",
    { text: "e Visa Aserbaidschan", bold: true },
    "\", \"",
    { text: "e-Visum Aserbaidschan", bold: true },
    "\", or \"",
    { text: "e Visum Azerbaijan", bold: true },
    "\" — the process is the same. Austrian, German, and Swiss citizens are all eligible for the Azerbaijan e-Visa through the standard ASAN portal, with documents and fees identical to all other EU nationals."
  ),

  // ── 10. ENTRY REQUIREMENTS ──
  h2("Azerbaijan Entry Requirements at the Border"),
  paragraph(
    "Beyond the e-Visa itself, ",
    { text: "azerbaijan entry requirements", bold: true },
    " at the actual border crossing include several practical points travelers should prepare for:"
  ),

  h3("What to Show at Immigration"),
  li({ text: "Your passport", bold: true }, " (the one linked to your e-Visa)"),
  li({ text: "A printed or digital copy of your approved e-Visa", bold: true }, " PDF"),
  li("Return or onward flight ticket (may be requested)"),
  li("Hotel booking or host address in Azerbaijan"),
  li("Proof of sufficient funds for your stay (bank card or cash — rarely asked but possible)"),

  h3("Health & Vaccination Requirements"),
  paragraph(
    "As of 2026, Azerbaijan has no mandatory vaccination requirements for entry. However, travelers from certain countries may be asked about yellow fever vaccination. Always check the latest requirements from the Azerbaijani State Border Service or your airline before traveling, as health entry requirements can change."
  ),

  h3("Currency Declaration"),
  paragraph(
    "If you are carrying more than $10,000 USD (or equivalent) in cash, you must declare it on the customs form upon entry. Undeclared amounts above this threshold can be confiscated. Azerbaijan's currency is the Azerbaijani Manat (AZN) — exchange is available at the airport and major banks."
  ),

  h3("Dual-Use Item Restrictions"),
  paragraph(
    "Azerbaijan prohibits import of certain items including narcotics, psychotropic substances, weapons without authorization, and materials offensive to national or religious values. Standard international travel customs rules apply."
  ),

  // ── 11. FAQ ──
  h2("Frequently Asked Questions About Azerbaijan e-Visa Requirements"),

  h3("What is the Azerbaijan e-Visa online application website?"),
  paragraph(
    "The official ",
    { text: "azerbaijan e visa website", bold: true },
    " is evisa.gov.az. Third-party licensed services are also available and provide the same approved visa through the same government system, often with additional support."
  ),

  h3("Can I apply for the e-Visa on arrival?"),
  paragraph(
    "Azerbaijan e-Visa on arrival is not available for most nationalities. Apply online before traveling. The only exceptions are CIS country citizens and specific bilateral agreement holders — and most of those can already enter visa-free."
  ),

  h3("What if I enter my passport number wrong?"),
  paragraph(
    "If you entered the wrong passport number in your application, your e-Visa is linked to the wrong passport number and will not be valid. Contact the service immediately — some platforms allow corrections before processing. If already approved, you must apply again."
  ),

  h3("Does the e-Visa cover the entire country or just Baku?"),
  paragraph(
    "The ",
    { text: "e visa baku azerbaijan", bold: true },
    " (or simply Azerbaijan e-Visa) covers the entire country — Baku, Gabala, Sheki, Quba, Lankaran, Nakhchivan (note: Nakhchivan requires a separate entry permit for some nationalities — verify before visiting). One e-Visa covers all cities and regions."
  ),

  h3("Is there an Azerbaijan business e-Visa?"),
  paragraph(
    "Yes — an ",
    { text: "azerbaijan business e visa", bold: true },
    " is available for travelers attending meetings, conferences, or conducting business. Same application portal, same documents, $69 USD fee. You may need an invitation letter from the Azerbaijani company, but this varies by nationality."
  ),

  h3("What is the Azerbaijan e-Visa official website vs unofficial services?"),
  paragraph(
    "The ",
    { text: "azerbaijan e visa official website", bold: true },
    " is evisa.gov.az (operated by the government). Third-party services submit on your behalf through the same system. Both result in the same official e-Visa from the Azerbaijani government. Third-party services typically offer better user experience, support, and faster issue resolution."
  ),

  h3("Can I get an Azerbaijan e-Visa if I was previously refused?"),
  paragraph(
    "A previous refusal does not automatically disqualify you. Address the reason for the initial refusal (usually a document issue or incomplete form), correct it, and reapply. Mention any previous refusals in the application if asked."
  ),

  // ── 12. FINAL TIPS ──
  h2("Final Tips Before Applying"),
  li("Apply at least 5–7 days before your travel date, even with standard 3-day processing — buffer for weekends and public holidays"),
  li("Double-check all passport details before submitting — typos are the most common rejection reason"),
  li("Use an international credit card — local cards from some countries are declined"),
  li("Save and print your approval email — don't rely on airport WiFi to access it"),
  li("The e-Visa is single entry — if you plan to cross into Georgia or Iran and return, apply for two separate e-Visas"),
  li("Turkish, Georgian, Russian, and several other CIS nationalities don't need a visa at all — check before applying"),

  quote(
    "Apply for your Azerbaijan e-Visa with confidence. Over 100 countries eligible, simple requirements, 100% online, no embassy visit needed. Start your application today."
  ),
];

// ═══════════════════════════════════════════════════════════════════════
// SPANISH
// ═══════════════════════════════════════════════════════════════════════

const body_es = [
  paragraph(
    "¿Planeas visitar Bakú? El paso más importante antes de reservar tu vuelo es entender los ",
    { text: "requisitos de la e-visa de Azerbaiyán", bold: true },
    ". La buena noticia: los ciudadanos de más de 100 países pueden solicitar la ",
    { text: "e-visa de Azerbaiyán", bold: true },
    " completamente en línea, sin necesidad de visitar una embajada. Esta guía completa cubre todos los requisitos: documentos, validez del pasaporte, especificaciones de foto, pasos de solicitud, reglas de validez, notas específicas por país y respuestas a las preguntas más comunes."
  ),

  h2("Requisitos de la e-Visa de Azerbaiyán 2026 — Descripción General"),
  paragraph(
    "La ",
    { text: "e-visa de Azerbaiyán", bold: true },
    " es la autorización de viaje electrónica oficial emitida por el gobierno de Azerbaiyán a través del portal ASAN. Para solicitar con éxito, debes cumplir con un conjunto básico de criterios de elegibilidad y presentar documentos específicos. A diferencia de las visas tradicionales de embajada, la ",
    { text: "evisa de Azerbaiyán", bold: true },
    " no requiere cita en persona, formularios en papel ni servicio de mensajería."
  ),
  paragraph(
    "Lista de verificación rápida de los principales ",
    { text: "requisitos de visa para Azerbaiyán", bold: true },
    ":"
  ),
  li({ text: "Pasaporte válido", bold: true }, " con al menos 6 meses de validez más allá de tu salida planeada de Azerbaiyán"),
  li({ text: "Foto digital tipo pasaporte", bold: true }, " que cumpla los requisitos específicos de tamaño y formato"),
  li({ text: "Dirección de email válida", bold: true }, " para recibir el PDF de tu e-visa aprobada"),
  li({ text: "Tarjeta de crédito o débito", bold: true }, " para el pago en línea (tarifa estándar $69 USD)"),
  li({ text: "Fechas de viaje", bold: true }, " — tu fecha de llegada planeada a Azerbaiyán"),

  h2("Documentos Requeridos para la e-Visa de Azerbaiyán"),
  paragraph(
    "Los ",
    { text: "documentos requeridos para la e-visa de Azerbaiyán", bold: true },
    " son mínimos. Esto es exactamente lo que necesitas preparar antes de iniciar tu solicitud en línea:"
  ),
  h3("1. Pasaporte Válido (Obligatorio)"),
  paragraph(
    "Tu pasaporte debe ser válido por al menos 6 meses más allá de tu fecha planeada de salida de Azerbaiyán. Debe estar en buen estado físico, sin daños por agua, páginas rasgadas o datos ilegibles."
  ),
  h3("2. Foto Digital Tipo Pasaporte (Obligatorio)"),
  paragraph(
    "El ",
    { text: "tamaño de foto para visa de Azerbaiyán", bold: true },
    " es 35×45mm equivalente, fondo blanco puro, cara visible, sin gafas de sol ni sombreros. Formato JPEG o PNG, menos de 5 MB."
  ),
  h3("3. Dirección de Email Válida (Obligatorio)"),
  paragraph(
    "Tu e-visa aprobada se entrega como PDF a esta dirección de email. Usa un email personal que revises regularmente."
  ),
  h3("4. Método de Pago (Obligatorio)"),
  paragraph(
    "Se aceptan las principales tarjetas de crédito y débito internacionales. La tarifa estándar para solicitar la ",
    { text: "e-visa de Azerbaiyán en línea", bold: true },
    " es de $69 USD."
  ),

  h2("Cómo Solicitar la e-Visa de Azerbaiyán — Paso a Paso"),
  paragraph(
    "Así es cómo ",
    { text: "solicitar la e-visa de Azerbaiyán en línea", bold: true },
    " paso a paso:"
  ),
  h3("Paso 1: Verifica tu Elegibilidad"),
  paragraph("Confirma que tu país está en la lista de países elegibles para e-visa. Más de 100 países califican."),
  h3("Paso 2: Selecciona la Velocidad de Procesamiento"),
  paragraph("Procesamiento estándar: 3 días hábiles — $69 USD. Procesamiento urgente: 3 horas — tarifa adicional."),
  h3("Paso 3: Completa el Formulario de Solicitud"),
  paragraph("Proporciona información personal, detalles del pasaporte, fecha de llegada y sube tu foto. Verifica el número de pasaporte dos veces."),
  h3("Paso 4: Paga en Línea"),
  paragraph("Paga con tarjeta de crédito o débito internacional. Recibirás confirmación inmediata."),
  h3("Paso 5: Espera la Aprobación"),
  paragraph("Estándar: 3 días hábiles. Urgente: dentro de 3 horas. Recibirás la e-visa como PDF en tu email."),
  h3("Paso 6: Imprime y Viaja"),
  paragraph("Imprime 1-2 copias de tu e-visa aprobada y lleva una copia en tu teléfono. Preséntala junto con tu pasaporte en inmigración."),

  h2("Validez de la e-Visa de Azerbaiyán, Duración de Estancia y Reglas de Entrada"),
  paragraph(
    "La ventana de validez de la ",
    { text: "e-visa de Azerbaiyán", bold: true },
    " es de 90 días desde la fecha de emisión. Una vez que entras a Azerbaiyán, puedes quedarte un máximo de 30 días por visa. La visa estándar es de entrada única."
  ),

  h2("e-Visa de Azerbaiyán para Ciudadanos Turcos"),
  paragraph(
    "Los ciudadanos turcos tienen un estatus especial con Azerbaiyán — ",
    { text: "los titulares de pasaportes turcos pueden entrar a Azerbaiyán sin visa", bold: true },
    " hasta 90 días sin ningún proceso de visa. Solo necesitan un pasaporte turco válido o incluso la tarjeta de identidad nacional turca."
  ),

  h2("Notas Específicas por País"),
  h3("e-Visa de Azerbaiyán para Ciudadanos del Reino Unido"),
  paragraph("Los ciudadanos del Reino Unido son completamente elegibles para la e-visa estándar. El Brexit no cambió la política de visa de Azerbaiyán."),
  h3("Requisitos de Visa de Azerbaiyán para Ciudadanos de EE.UU."),
  paragraph("Los ciudadanos estadounidenses aplican en línea, pagan $69 USD y normalmente reciben aprobación en 24-48 horas."),
  h3("e-Visa de Azerbaiyán para Ciudadanos Paquistaníes"),
  paragraph("Los titulares de pasaportes paquistaníes son completamente elegibles. Mismo proceso, mismos documentos, misma tarifa."),

  h2("Preguntas Frecuentes sobre Requisitos de e-Visa de Azerbaiyán"),
  h3("¿Puedo obtener la e-visa a la llegada?"),
  paragraph("La e-visa a la llegada no está disponible para la mayoría de nacionalidades. Solicita en línea antes de viajar."),
  h3("¿Cubre la e-visa todo el país o solo Bakú?"),
  paragraph("La e-visa cubre toda Azerbaiyán — Bakú, Gabala, Sheki, Quba, Lankaran y todas las demás ciudades."),
  h3("¿Puedo extender la e-visa?"),
  paragraph("No — la e-visa no puede extenderse desde dentro de Azerbaiyán. Debes salir y solicitar una nueva."),

  quote("Solicita tu e-visa de Azerbaiyán con confianza. Más de 100 países elegibles, requisitos simples, 100% en línea, sin visita a embajada."),
];

// ═══════════════════════════════════════════════════════════════════════
// ARABIC
// ═══════════════════════════════════════════════════════════════════════

const body_ar = [
  paragraph(
    "هل تخطط لزيارة باكو؟ أهم خطوة قبل حجز رحلاتك هي فهم ",
    { text: "متطلبات التأشيرة الإلكترونية لأذربيجان", bold: true },
    ". البشرى السارة: يمكن لمواطني أكثر من 100 دولة التقدم بطلب ",
    { text: "التأشيرة الإلكترونية لأذربيجان", bold: true },
    " بالكامل عبر الإنترنت، دون الحاجة لزيارة سفارة. يغطي هذا الدليل الشامل كل المتطلبات: الوثائق، صلاحية جواز السفر، مواصفات الصورة، خطوات التقديم، قواعد الصلاحية، ملاحظات خاصة بكل دولة والأسئلة الأكثر شيوعاً."
  ),

  h2("متطلبات التأشيرة الإلكترونية لأذربيجان 2026 — نظرة عامة"),
  paragraph(
    "التأشيرة الإلكترونية لأذربيجان هي تصريح السفر الإلكتروني الرسمي الصادر عن حكومة أذربيجان من خلال بوابة ASAN. للتقدم بنجاح، يجب أن تستوفي مجموعة أساسية من معايير الأهلية وتقديم وثائق محددة."
  ),
  paragraph("قائمة التحقق السريع من ",
    { text: "متطلبات تأشيرة أذربيجان", bold: true }, ":"
  ),
  li({ text: "جواز سفر ساري المفعول", bold: true }, " بصلاحية لا تقل عن 6 أشهر بعد مغادرتك المخططة لأذربيجان"),
  li({ text: "صورة رقمية بحجم جواز السفر", bold: true }, " تستوفي متطلبات الحجم والتنسيق المحددة"),
  li({ text: "عنوان بريد إلكتروني صالح", bold: true }, " لاستلام تأشيرتك الإلكترونية المعتمدة كملف PDF"),
  li({ text: "بطاقة ائتمان أو خصم", bold: true }, " للدفع عبر الإنترنت (الرسوم القياسية 69 دولاراً أمريكياً)"),
  li({ text: "تواريخ السفر", bold: true }, " — تاريخ وصولك المخطط إلى أذربيجان"),

  h2("الوثائق المطلوبة للتأشيرة الإلكترونية لأذربيجان"),
  paragraph({ text: "الوثائق المطلوبة للتأشيرة الإلكترونية لأذربيجان", bold: true }, " محدودة. إليك بالضبط ما تحتاج تحضيره قبل بدء طلبك عبر الإنترنت:"),
  h3("1. جواز سفر ساري المفعول (إلزامي)"),
  paragraph("يجب أن يكون جواز سفرك صالحاً لمدة لا تقل عن 6 أشهر بعد تاريخ مغادرتك المخططة من أذربيجان. يجب أن يكون في حالة جيدة دون تلف."),
  h3("2. صورة رقمية بحجم جواز السفر (إلزامية)"),
  paragraph(
    { text: "حجم صورة تأشيرة أذربيجان", bold: true },
    " هو 35×45 مم، خلفية بيضاء نقية، وجه مرئي بوضوح، بدون نظارات شمسية أو قبعات. تنسيق JPEG أو PNG، أقل من 5 ميغابايت."
  ),
  h3("3. عنوان بريد إلكتروني صالح (إلزامي)"),
  paragraph("يتم تسليم تأشيرتك الإلكترونية المعتمدة كملف PDF إلى هذا العنوان. استخدم بريداً إلكترونياً شخصياً تتحقق منه بانتظام."),
  h3("4. طريقة الدفع (إلزامية)"),
  paragraph("تُقبل بطاقات الائتمان والخصم الدولية الكبرى. الرسوم القياسية للتقدم للتأشيرة الإلكترونية لأذربيجان عبر الإنترنت هي 69 دولاراً أمريكياً."),

  h2("كيفية التقدم للتأشيرة الإلكترونية لأذربيجان — خطوة بخطوة"),
  h3("الخطوة 1: تحقق من أهليتك"),
  paragraph("تأكد من أن دولتك مدرجة في قائمة الدول المؤهلة للتأشيرة الإلكترونية. أكثر من 100 دولة مؤهلة."),
  h3("الخطوة 2: اختر سرعة المعالجة"),
  paragraph("المعالجة القياسية: 3 أيام عمل — 69 دولاراً. المعالجة العاجلة: 3 ساعات — رسوم إضافية."),
  h3("الخطوة 3: أكمل نموذج الطلب"),
  paragraph("قدم المعلومات الشخصية، تفاصيل جواز السفر، تاريخ الوصول وقم بتحميل صورتك. تحقق من رقم جواز سفرك مرتين."),
  h3("الخطوة 4: ادفع عبر الإنترنت"),
  paragraph("ادفع ببطاقة الائتمان أو الخصم الدولية. ستتلقى تأكيداً فورياً."),
  h3("الخطوة 5: انتظر الموافقة"),
  paragraph("قياسي: 3 أيام عمل. عاجل: خلال 3 ساعات. ستتلقى التأشيرة الإلكترونية كملف PDF في بريدك الإلكتروني."),
  h3("الخطوة 6: اطبع وسافر"),
  paragraph("اطبع 1-2 نسخ من تأشيرتك الإلكترونية المعتمدة واحتفظ بنسخة رقمية على هاتفك. قدمها مع جواز سفرك عند الهجرة."),

  h2("صلاحية التأشيرة الإلكترونية لأذربيجان ومدة الإقامة"),
  paragraph("نافذة صلاحية التأشيرة الإلكترونية هي 90 يوماً من تاريخ الإصدار. بمجرد دخولك لأذربيجان، يمكنك البقاء لمدة أقصاها 30 يوماً لكل تأشيرة. التأشيرة القياسية بدخول واحد فقط."),

  h2("التأشيرة الإلكترونية لأذربيجان للمواطنين الأتراك"),
  paragraph(
    "المواطنون الأتراك لديهم وضع خاص مع أذربيجان — ",
    { text: "يمكن لحاملي جوازات السفر التركية الدخول إلى أذربيجان بدون تأشيرة", bold: true },
    " لمدة تصل إلى 90 يوماً. يحتاجون فقط إلى جواز سفر تركي ساري المفعول أو حتى بطاقة الهوية الوطنية التركية."
  ),

  h2("متطلبات خاصة بكل دولة"),
  h3("التأشيرة الإلكترونية لأذربيجان للمواطنين البريطانيين"),
  paragraph("حاملو جوازات السفر البريطانية مؤهلون تماماً للتأشيرة الإلكترونية القياسية. لم يغير خروج بريطانيا من الاتحاد الأوروبي سياسة التأشيرة في أذربيجان."),
  h3("متطلبات تأشيرة أذربيجان للمواطنين الأمريكيين"),
  paragraph("يتقدم المواطنون الأمريكيون عبر الإنترنت ويدفعون 69 دولاراً ويحصلون عادةً على الموافقة خلال 24-48 ساعة."),
  h3("متطلبات التأشيرة الإلكترونية لأذربيجان للمواطنين الباكستانيين"),
  paragraph("حاملو جوازات السفر الباكستانية مؤهلون تماماً. نفس العملية، نفس الوثائق، نفس الرسوم."),
  h3("متطلبات تأشيرة أذربيجان للمواطنين النيجيريين"),
  paragraph("المواطنون النيجيريون مؤهلون للتأشيرة الإلكترونية لأذربيجان. يجب التأكد من أن شهادة التطعيم ضد الحمى الصفراء محدّثة."),
  h3("متطلبات تأشيرة أذربيجان للمواطنين الإيرانيين"),
  paragraph("يجب على المواطنين الإيرانيين الاتصال بأقرب سفارة أو قنصلية أذربيجانية للحصول على إجراءات محددة."),

  h2("الأسئلة المتداولة حول متطلبات التأشيرة الإلكترونية لأذربيجان"),
  h3("هل يمكنني الحصول على التأشيرة الإلكترونية عند الوصول؟"),
  paragraph("التأشيرة الإلكترونية عند الوصول غير متاحة لمعظم الجنسيات. تقدم بالطلب عبر الإنترنت قبل السفر."),
  h3("هل تغطي التأشيرة الإلكترونية البلاد بالكامل أم باكو فقط؟"),
  paragraph("تغطي التأشيرة الإلكترونية أذربيجان بالكامل — باكو وغبالا وشكي وقوبا ولنكران وجميع المدن الأخرى."),
  h3("هل يمكن تمديد التأشيرة الإلكترونية؟"),
  paragraph("لا — لا يمكن تمديد التأشيرة الإلكترونية من داخل أذربيجان. يجب مغادرة البلاد والتقدم بطلب جديد."),

  quote("تقدم بطلب تأشيرتك الإلكترونية لأذربيجان بثقة. أكثر من 100 دولة مؤهلة، متطلبات بسيطة، 100% عبر الإنترنت، بدون زيارة سفارة."),
];

// ═══════════════════════════════════════════════════════════════════════
// PUBLISH TO SANITY
// ═══════════════════════════════════════════════════════════════════════

async function run() {
  console.log("Fetching requirements infoPage...");

  const doc = await client.fetch(
    `*[_type == "infoPage" && slug.current == "requirements"][0]{ _id }`
  );

  if (!doc) {
    console.error("❌ requirements page not found in Sanity");
    process.exit(1);
  }

  console.log(`Found: ${doc._id}. Patching...`);

  await client.patch(doc._id).set({
    "english.title_en": "Azerbaijan e-Visa Requirements 2026 — Documents, Photo & How to Apply",
    "english.metaTitle_en": "Azerbaijan e-Visa Requirements 2026 — Documents, Photo, Passport & How to Apply",
    "english.metaDescription_en": "Complete guide to Azerbaijan e-Visa requirements 2026. Documents needed, photo specs, passport validity, how to apply online, validity rules and country-specific info. 100+ countries.",
    "english.body_en": body_en,

    "spanish.title_es": "Requisitos de la e-Visa de Azerbaiyán 2026 — Documentos, Foto y Cómo Solicitar",
    "spanish.metaTitle_es": "Requisitos e-Visa Azerbaiyán 2026 — Documentos, Foto, Pasaporte y Cómo Solicitar",
    "spanish.metaDescription_es": "Guía completa de requisitos de la e-visa de Azerbaiyán 2026. Documentos necesarios, especificaciones de foto, pasaporte, cómo solicitar en línea y reglas de validez.",
    "spanish.body_es": body_es,

    "arabic.title_ar": "متطلبات التأشيرة الإلكترونية لأذربيجان 2026 — الوثائق والصورة وكيفية التقديم",
    "arabic.metaTitle_ar": "متطلبات التأشيرة الإلكترونية لأذربيجان 2026 — الوثائق والصورة وجواز السفر وكيفية التقديم",
    "arabic.metaDescription_ar": "الدليل الكامل لمتطلبات التأشيرة الإلكترونية لأذربيجان 2026. الوثائق المطلوبة، مواصفات الصورة، صلاحية جواز السفر، كيفية التقديم عبر الإنترنت وقواعد الصلاحية.",
    "arabic.body_ar": body_ar,
  }).commit();

  console.log("✅ Done. Requirements page updated in all 3 languages.");
  console.log("Live at: https://azerbaijan-evisa.com/en/requirements");
}

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
