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
// ENGLISH BODY (~4000 words)
// ═══════════════════════════════════════════════════════════════════════
const body_en = [
  // ── INTRO (triggers country grid) ──
  paragraph(
    "Planning a trip to Baku? The most important step before booking your flights is understanding the ",
    { text: "Azerbaijan e-Visa requirements", bold: true },
    ". The good news: citizens of over 100 countries can apply for an ",
    { text: "e-Visa Azerbaijan", bold: true },
    " entirely online, with no embassy visit required. This complete guide covers every requirement you need — documents, passport validity, photo specifications, application steps, validity rules, country-specific notes for Turkish, UK, US, Pakistani, Nigerian, and Iranian citizens, and answers to the most common questions. Whether you call it an ",
    { text: "evisa Azerbaijan", bold: true },
    ", ASAN visa, or ",
    { text: "Azerbaijan electronic visa", bold: true },
    ", the requirements are the same. Find your nationality below, then read the full guide."
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
    "Quick checklist of core ",
    { text: "visa requirements for Azerbaijan", bold: true },
    " before we go into detail:"
  ),
  li({ text: "Valid passport", bold: true }, " — at least 6 months validity beyond your planned departure from Azerbaijan"),
  li({ text: "Digital passport photo", bold: true }, " — specific size, format, and background requirements"),
  li({ text: "Valid email address", bold: true }, " — to receive your approved e-Visa PDF"),
  li({ text: "Credit or debit card", bold: true }, " — for online payment ($69 USD standard fee)"),
  li({ text: "Travel dates", bold: true }, " — your planned date of arrival in Azerbaijan"),
  li("Accommodation details — hotel name or host address (recommended but not mandatory for the online application)"),
  paragraph(
    "These ",
    { text: "Azerbaijan evisa requirements", bold: true },
    " are the same for all nationalities. No income requirements, no bank statements, no invitation letters for tourist visas, no medical certificates. The ",
    { text: "e-Visa for Azerbaijan", bold: true },
    " is one of the most streamlined electronic visa systems in the world."
  ),

  // ── 3. REQUIRED DOCUMENTS ──
  h2("Documents Required for Azerbaijan e-Visa"),
  paragraph(
    "The ",
    { text: "documents required for Azerbaijan e-Visa", bold: true },
    " are minimal. Here is exactly what to prepare before starting your online application:"
  ),

  h3("1. Valid Passport (Mandatory)"),
  paragraph(
    "Your passport is the single most critical document for the ",
    { text: "Azerbaijan e-Visa application", bold: true },
    ". Requirements:"
  ),
  li({ text: "Validity:", bold: true }, " Must be valid for at least 6 months beyond your planned departure date from Azerbaijan"),
  li({ text: "Condition:", bold: true }, " Good physical condition — no water damage, torn pages, or illegible data"),
  li({ text: "Blank pages:", bold: true }, " At least 1–2 blank pages for entry/exit stamps"),
  li({ text: "Type:", bold: true }, " Regular tourist/ordinary passport"),
  paragraph(
    "The ",
    { text: "Azerbaijan e-visa passport validity requirement", bold: true },
    " of 6 months is strictly enforced. If your passport expires in less than 6 months from your intended departure, you will be rejected at the application stage or refused entry at the border."
  ),

  h3("2. Digital Passport-Sized Photo (Mandatory)"),
  paragraph(
    "What is the ",
    { text: "Azerbaijan visa photo size", bold: true },
    " and format? Exact specifications:"
  ),
  li({ text: "Background:", bold: true }, " Plain white only — no gray, cream, or off-white"),
  li({ text: "Size:", bold: true }, " 35×45mm equivalent (standard international passport photo)"),
  li({ text: "Face:", bold: true }, " Full face, front-facing, eyes open and clearly visible"),
  li({ text: "No accessories:", bold: true }, " No sunglasses, no hats (unless worn for religious reasons)"),
  li({ text: "Format:", bold: true }, " JPEG or PNG, file size under 5 MB"),
  li({ text: "Recency:", bold: true }, " Taken within the last 6 months"),
  paragraph(
    "Smartphone photos taken against a white wall work well if lighting is even. Avoid heavy filters or Photoshop edits that alter facial features."
  ),

  h3("3. Valid Email Address (Mandatory)"),
  paragraph(
    "Your approved ",
    { text: "e-Visa to Azerbaijan", bold: true },
    " is delivered as a PDF to this email. Use a personal email you actively monitor — not a temporary address. If the approval email lands in spam, you could miss it close to your travel date."
  ),

  h3("4. Payment Method (Mandatory)"),
  paragraph(
    "Visa, Mastercard, American Express, Discover are accepted. The standard fee for ",
    { text: "Azerbaijan e-Visa online apply", bold: true },
    " is ",
    { text: "$69 USD", bold: true },
    ", covering both government fee and processing. For urgent processing (3 hours), an additional fee applies."
  ),

  h3("5. Travel Information"),
  paragraph(
    "During the ",
    { text: "azerbaijan e visa application", bold: true },
    ", you will provide:"
  ),
  li({ text: "Planned arrival date", bold: true }, " — your estimated first day in Azerbaijan"),
  li({ text: "Purpose of visit", bold: true }, " — tourism, business, transit, family visit"),
  li({ text: "Accommodation", bold: true }, " — hotel name or host address (often optional)"),
  li({ text: "Port of entry", bold: true }, " — airport, land border, or sea port"),
  paragraph(
    "You do not need a confirmed return flight ticket or hotel booking to apply. These may be requested at the border on arrival, but are not part of the digital application."
  ),

  h3("6. Passport Scan (Some Platforms)"),
  paragraph(
    "Some application portals request a scanned copy of your passport data page (",
    { text: "Azerbaijan visa passport scan", bold: true },
    "). Ensure the scan is clear, all text is legible, and there is no glare or shadow."
  ),

  // ── 4. PASSPORT REQUIREMENTS ──
  h2("Azerbaijan e-Visa Passport Requirements in Detail"),
  paragraph(
    "The ",
    { text: "azerbaijan e-visa passport validity requirement", bold: true },
    " is one of the most misunderstood aspects of the application."
  ),

  h3("Minimum Passport Validity — The Correct Way to Calculate"),
  paragraph(
    "Your passport must be valid for at least ",
    { text: "6 months beyond the date you plan to LEAVE Azerbaijan", bold: true },
    " — not 6 months from today. Example: entering June 1, leaving June 20 → passport must be valid until December 20 minimum."
  ),

  h3("Passport Nationality vs. Country of Residence"),
  paragraph(
    "Eligibility is based on your ",
    { text: "passport nationality", bold: true },
    ", not country of residence. Pakistani passport holder living in Saudi Arabia = applies as Pakistani citizen. The ",
    { text: "azerbaijan passport requirements", bold: true },
    " are the same regardless of where you currently live."
  ),

  h3("Dual Nationality"),
  paragraph(
    "If you hold two passports, apply with the passport of the country with established e-Visa eligibility. Travel to Azerbaijan using the same passport you used to apply — the e-Visa is linked to a specific passport number."
  ),

  h3("Refugee Travel Documents"),
  paragraph(
    "Travelers on refugee or stateless person documents should contact the nearest Azerbaijani embassy. The standard e-Visa system is designed for national passports. For ",
    { text: "azerbaijan visa for refugee travel document", bold: true },
    " holders — embassy application is the recommended route."
  ),

  // ── 5. PHOTO REQUIREMENTS ──
  h2("Azerbaijan e-Visa Photo Requirements — Size, Format & Common Mistakes"),
  paragraph(
    "Photo rejection is one of the top reasons for application delays. Master the ",
    { text: "azerbaijan visa photo size", bold: true },
    " and format rules to avoid this."
  ),

  h3("Accepted Photo Specifications"),
  li({ text: "Dimensions:", bold: true }, " 35mm × 45mm (standard biometric passport photo)"),
  li({ text: "Resolution:", bold: true }, " Minimum 600×800 pixels recommended"),
  li({ text: "Color:", bold: true }, " Full color only (no black-and-white)"),
  li({ text: "Background:", bold: true }, " Pure white (#FFFFFF) — light backgrounds that are not white will be rejected"),
  li({ text: "File type:", bold: true }, " JPEG preferred, PNG also accepted"),
  li({ text: "File size:", bold: true }, " Under 5 MB"),
  li({ text: "Face coverage:", bold: true }, " Face should occupy 70–80% of the frame"),

  h3("Common Rejection Reasons"),
  li("Background is off-white, gray, or has shadows"),
  li("Wearing sunglasses or a hat"),
  li("Photo is older than 6 months"),
  li("Face is tilted or not fully front-facing"),
  li("Heavy filter, over-exposure, or editing"),
  li("Glare on glasses — remove them for the photo"),
  li("Photo is blurry or pixelated"),

  // ── 6. HOW TO APPLY ──
  h2("How to Apply for Azerbaijan e-Visa Online — Complete Step-by-Step"),
  paragraph(
    "The full process for ",
    { text: "how to apply Azerbaijan e-Visa", bold: true },
    " online — from preparation to receiving your document:"
  ),

  h3("Step 1: Verify Eligibility"),
  paragraph(
    "Confirm your nationality is on the e-Visa eligible list. Citizens of over 100 countries can apply online. If your country is not on the list, apply through an Azerbaijani embassy."
  ),

  h3("Step 2: Select Processing Speed"),
  paragraph(
    "Standard: ",
    { text: "3 business days — $69 USD", bold: true },
    ". Urgent: ",
    { text: "3 hours — additional fee", bold: true },
    ". If your trip is within the next 4 days, select urgent."
  ),

  h3("Step 3: Fill Out the Form"),
  paragraph(
    "The ",
    { text: "azerbaijan e visa apply online", bold: true },
    " form asks for: full name (exactly as on passport), date of birth, nationality, passport number, issue/expiry dates, home address, planned arrival date, purpose of visit, accommodation, upload passport photo."
  ),
  paragraph(
    { text: "Critical:", bold: true },
    " Enter your passport number exactly as printed — a single character error causes rejection. Double-check before submitting."
  ),

  h3("Step 4: Pay Online"),
  paragraph(
    "Pay $69 USD using an international credit or debit card. You'll receive an immediate payment confirmation with your application reference number."
  ),

  h3("Step 5: Wait for Approval"),
  paragraph(
    "Standard: approval in 3 business days. Urgent: within 3 hours during business hours. Your ",
    { text: "Azerbaijan evisa online", bold: true },
    " PDF will arrive by email."
  ),

  h3("Step 6: Print and Travel"),
  paragraph(
    "Print 1–2 copies and save a digital copy on your phone (offline access). Present the printout at Azerbaijani immigration alongside your passport."
  ),

  h3("Checking Your Application Status"),
  paragraph(
    "To do an ",
    { text: "azerbaijan e visa check by passport number", bold: true },
    ", visit the ASAN portal (evisa.gov.az) and use your application reference number or passport number to track status."
  ),

  // ── 7. VALIDITY ──
  h2("Azerbaijan e-Visa Validity, Stay Duration and Entry Rules"),

  h3("Validity: 90 Days from Issue"),
  paragraph(
    "The ",
    { text: "azerbaijan e visa validity", bold: true },
    " window is 90 days from the date the visa is issued. You must enter Azerbaijan within this 90-day window."
  ),

  h3("Stay Duration: 30 Days Maximum"),
  paragraph(
    "Once you enter, you may stay for a maximum of 30 days. The ",
    { text: "asan e-visa azerbaijan maximum stay 30 days", bold: true },
    " rule is firm. Day of entry counts as Day 1. Overstaying results in fines."
  ),

  h3("Entry Type: Single Entry"),
  paragraph(
    "The standard e-Visa is ",
    { text: "single entry only", bold: true },
    ". If you exit Azerbaijan during your stay — for a day trip to Georgia or Iran — the visa is used. You'll need a new e-Visa to re-enter."
  ),

  h3("Can You Extend?"),
  paragraph(
    "No — the ",
    { text: "azerbaijan e-visa asan visa 30 days official", bold: true },
    " rule is strict. No extensions from inside Azerbaijan. Leave and reapply from outside."
  ),

  // ── 8. TURKISH CITIZENS ──
  h2("Azerbaijan e-Visa for Turkish Citizens — Special Status"),
  paragraph(
    "Turkey is one of the highest-search nationalities for Azerbaijan visa information. Here is everything about ",
    { text: "azerbaijan e-visa turkish citizens", bold: true },
    ":"
  ),
  paragraph(
    "Turkish citizens actually ",
    { text: "do NOT need an e-Visa or any visa for Azerbaijan", bold: true },
    ". Turkish passport holders can enter Azerbaijan visa-free for up to 90 days due to the bilateral agreement based on close historical and diplomatic ties. Even a Turkish national ID card is sufficient in most cases."
  ),
  paragraph(
    "For the popular search \"",
    { text: "azerbaijan visa requirements for turkish citizens 2024", bold: true },
    "\" — the answer is: no visa required. Only a valid Turkish passport (or national ID) is needed for tourism."
  ),

  // ── 9. COUNTRY-SPECIFIC ──
  h2("Country-Specific Azerbaijan e-Visa Requirements"),

  h3("Azerbaijan e-Visa for UK Citizens"),
  paragraph(
    "UK passport holders are fully eligible for the ",
    { text: "azerbaijan e visa for uk citizens", bold: true },
    ". Brexit did not change Azerbaijan's visa policy. Standard documents, $69 USD fee, 3-day or 3-hour processing."
  ),

  h3("Azerbaijan Visa Requirements for US Citizens"),
  paragraph(
    "The ",
    { text: "azerbaijan visa requirements for us citizens", bold: true },
    " are identical to other eligible nationalities. Apply online, pay $69, approval in 24–48 hours typically."
  ),

  h3("Azerbaijan e-Visa for Pakistani Citizens"),
  paragraph(
    "For the query \"",
    { text: "azerbaijan e visa requirements for pakistani", bold: true },
    "\" — Pakistani passport holders are fully eligible. Same documents, same fee, same 3-day processing. No invitation letter, no embassy visit."
  ),

  h3("Azerbaijan Visa Requirements for Nigerian Citizens"),
  paragraph(
    "Nigerian passport holders are eligible. The ",
    { text: "azerbaijan visa requirements for nigerian citizens", bold: true },
    " are the standard set. Note: yellow fever vaccination certificate may be requested at the border as a health requirement."
  ),

  h3("Azerbaijan Visa Requirements for Iranian Citizens"),
  paragraph(
    "The ",
    { text: "azerbaijan visa requirements for iranian citizens", bold: true },
    " are handled through separate procedures. Iranian citizens should contact the nearest Azerbaijani embassy for current rules, as the standard e-Visa process may not be available to all Iranian passport holders."
  ),

  h3("Azerbaijan Visa for Philippine Passport Holders"),
  paragraph(
    "Philippine passport holders (\"",
    { text: "azerbaijan visa for philippine passport holder", bold: true },
    "\") are eligible for the standard e-Visa. Standard requirements and $69 USD fee apply."
  ),

  h3("Azerbaijan Visa for Afghans"),
  paragraph(
    "Afghan passport holders (\"",
    { text: "azerbaijan visa for afghans", bold: true },
    "\") should apply through the standard e-Visa channel. Verify current eligibility on the ASAN portal before applying."
  ),

  h3("Azerbaijan Business e-Visa"),
  paragraph(
    "An ",
    { text: "azerbaijan business e visa", bold: true },
    " is available for meetings, conferences, or business activities. Same portal, same documents, $69 USD. An invitation letter from the Azerbaijani company may be required for some nationalities."
  ),

  h3("German-Speaking Travelers — Aserbaidschan e-Visa"),
  paragraph(
    "Travelers searching \"",
    { text: "evisa Aserbaidschan", bold: true },
    "\", \"",
    { text: "e Visa Aserbaidschan", bold: true },
    "\", \"",
    { text: "e-Visum Aserbaidschan", bold: true },
    "\" or \"",
    { text: "e Visum Azerbaijan", bold: true },
    "\" — Austrian, German, and Swiss citizens apply through the standard ASAN portal. Same documents, same fee, same process as all other EU nationals."
  ),

  // ── 10. ENTRY REQUIREMENTS ──
  h2("Azerbaijan Entry Requirements at the Border"),
  paragraph(
    "Beyond the e-Visa, these ",
    { text: "azerbaijan entry requirements", bold: true },
    " apply at the actual border:"
  ),

  li({ text: "Passport", bold: true }, " — the one linked to your e-Visa"),
  li({ text: "Printed or digital e-Visa PDF", bold: true }, " — approved document"),
  li("Return or onward flight ticket — may be requested"),
  li("Hotel booking or host address in Azerbaijan"),
  li("Proof of funds — bank card or cash (rarely asked but possible)"),

  h3("Health Requirements"),
  paragraph(
    "As of 2026, Azerbaijan has no mandatory vaccination requirements for entry. Travelers from certain countries may be asked about yellow fever vaccination. Always verify with the Azerbaijani State Border Service or your airline before traveling."
  ),

  h3("Currency Declaration"),
  paragraph(
    "If carrying more than $10,000 USD (or equivalent) in cash, you must declare it on the customs form. Azerbaijan's currency is the Azerbaijani Manat (AZN) — exchange is available at the airport and major banks."
  ),

  // ── 11. FAQ ──
  h2("Frequently Asked Questions — Azerbaijan e-Visa Requirements"),

  h3("What is the official Azerbaijan e-Visa website?"),
  paragraph(
    "The official ",
    { text: "azerbaijan e visa official website", bold: true },
    " is evisa.gov.az. Third-party licensed services submit on your behalf through the same government system."
  ),

  h3("Can I get the e-Visa on arrival?"),
  paragraph(
    "No — ",
    { text: "azerbaijan visa on arrival", bold: true },
    " is not available for most nationalities. Apply online before traveling. CIS country citizens are the main exception, and most of them enter visa-free anyway."
  ),

  h3("What if I entered my passport number wrong?"),
  paragraph(
    "Your e-Visa is linked to the wrong passport number — it will not be valid. Contact the service immediately to correct before processing. If already approved, reapply."
  ),

  h3("Does the e-Visa cover the entire country?"),
  paragraph(
    "Yes — the ",
    { text: "e visa baku Azerbaijan", bold: true },
    " (or Azerbaijan e-Visa) covers the entire country including Baku, Gabala, Sheki, Quba, Lankaran and all other regions. One e-Visa, whole country."
  ),

  h3("Can I check my e-Visa status online?"),
  paragraph(
    "Yes — use the ASAN portal with your application reference number or passport number to check your ",
    { text: "azerbaijan e visa", bold: true },
    " status at any time."
  ),

  h3("What is the difference between e-Visa and ASAN visa?"),
  paragraph(
    "They are the same thing. ASAN is the name of the government portal that processes e-Visa applications. ",
    { text: "evisa for azerbaijan", bold: true },
    ", ",
    { text: "evisa to azerbaijan", bold: true },
    ", ASAN visa, electronic visa — all refer to the same product."
  ),

  h3("What is the Azerbaijan e-Visa sample?"),
  paragraph(
    "The ",
    { text: "azerbaijan e visa sample", bold: true },
    " is a PDF document showing your name, passport number, visa number, validity dates, entry type, and a QR code. Border officers scan the QR code to verify authenticity. Print it clearly — all text and the QR code must be readable."
  ),

  // ── 12. TIPS ──
  h2("Final Tips Before You Apply"),
  li("Apply at least 5–7 days before travel — buffer for weekends and public holidays"),
  li("Double-check all passport details — typos are the most common rejection reason"),
  li("Use an international credit card — local cards from some countries are declined"),
  li("Save your approval email — don't rely on airport WiFi to access it"),
  li("The e-Visa is single entry — if crossing to Georgia or Iran and returning, apply for two separate e-Visas"),
  li("Turkish, Georgian, Russian and several CIS nationalities are visa-free — check before applying"),

  quote(
    "Apply for your Azerbaijan e-Visa with confidence. Over 100 countries eligible, simple requirements, 100% online, no embassy visit needed. Start your application today."
  ),
];

// ═══════════════════════════════════════════════════════════════════════
// SPANISH BODY
// ═══════════════════════════════════════════════════════════════════════
const body_es = [
  paragraph(
    "¿Planeas visitar Bakú? El paso más importante es entender los ",
    { text: "requisitos de la e-visa de Azerbaiyán", bold: true },
    ". Los ciudadanos de más de 100 países pueden solicitar la ",
    { text: "e-visa de Azerbaiyán", bold: true },
    " completamente en línea, sin necesidad de visitar una embajada. Esta guía completa cubre todos los requisitos: documentos, validez del pasaporte, especificaciones de foto, pasos de solicitud y notas específicas por país. Encuentra tu nacionalidad abajo."
  ),

  h2("Requisitos de la e-Visa de Azerbaiyán 2026 — Descripción General"),
  paragraph(
    "Lista de verificación rápida de los principales ",
    { text: "requisitos de visa para Azerbaiyán", bold: true }, ":"
  ),
  li({ text: "Pasaporte válido", bold: true }, " — al menos 6 meses de validez más allá de tu salida planeada"),
  li({ text: "Foto digital tipo pasaporte", bold: true }, " — fondo blanco, 35×45mm"),
  li({ text: "Email válido", bold: true }, " — para recibir el PDF de la e-visa aprobada"),
  li({ text: "Tarjeta de crédito o débito", bold: true }, " — $69 USD tarifa estándar"),

  h2("Documentos Requeridos para la e-Visa de Azerbaiyán"),
  h3("1. Pasaporte Válido"),
  paragraph("Válido al menos 6 meses más allá de tu fecha planeada de salida. Buen estado físico, sin daños."),
  h3("2. Foto Digital Tipo Pasaporte"),
  paragraph(
    "El ", { text: "tamaño de foto para visa de Azerbaiyán", bold: true }, " es 35×45mm, fondo blanco puro, cara visible, sin gafas ni sombreros. JPEG o PNG, menos de 5 MB."
  ),
  h3("3. Email Válido"),
  paragraph("Tu e-visa aprobada llega como PDF a este correo. Usa un email personal que revises regularmente."),
  h3("4. Método de Pago"),
  paragraph("Tarjetas internacionales Visa, Mastercard, AmEx. Tarifa estándar: $69 USD."),

  h2("Cómo Solicitar la e-Visa de Azerbaiyán — Paso a Paso"),
  h3("Paso 1: Verifica tu Elegibilidad"),
  paragraph("Confirma que tu país está en la lista de países elegibles. Más de 100 países califican."),
  h3("Paso 2: Selecciona Velocidad de Procesamiento"),
  paragraph("Estándar: 3 días hábiles — $69 USD. Urgente: 3 horas — tarifa adicional."),
  h3("Paso 3: Completa el Formulario"),
  paragraph("Nombre completo, detalles del pasaporte, fecha de llegada, sube tu foto. Verifica dos veces el número de pasaporte."),
  h3("Paso 4: Paga en Línea"),
  paragraph("Paga con tarjeta internacional. Recibirás confirmación inmediata."),
  h3("Paso 5: Espera la Aprobación"),
  paragraph("Estándar: 3 días. Urgente: 3 horas. Recibirás la e-visa como PDF en tu email."),
  h3("Paso 6: Imprime y Viaja"),
  paragraph("Imprime 1-2 copias. Guarda copia digital en tu teléfono. Preséntala en inmigración."),

  h2("Validez de la e-Visa, Duración de Estancia y Reglas"),
  paragraph(
    "La e-visa es válida 90 días desde la emisión. Estancia máxima: ",
    { text: "30 días", bold: true }, ". Entrada única."
  ),

  h2("e-Visa de Azerbaiyán para Ciudadanos Turcos"),
  paragraph(
    "Los ciudadanos turcos ",
    { text: "NO necesitan visa para Azerbaiyán", bold: true },
    ". Pueden entrar sin visa hasta 90 días solo con pasaporte turco válido o tarjeta de identidad nacional."
  ),

  h2("Requisitos Específicos por País"),
  h3("Reino Unido"), paragraph("Completamente elegibles. El Brexit no cambió la política de visa. Proceso estándar."),
  h3("Estados Unidos"), paragraph("Solicita en línea, paga $69, aprobación en 24-48 horas."),
  h3("Pakistán"), paragraph("Completamente elegibles. Mismos documentos, misma tarifa, mismos 3 días."),
  h3("Nigeria"), paragraph("Elegibles. Asegúrate de tener certificado de vacunación contra fiebre amarilla."),
  h3("Irán"), paragraph("Consultar embajada azerbaiyana para procedimientos específicos."),

  h2("Preguntas Frecuentes"),
  h3("¿Puedo obtener la e-visa a la llegada?"),
  paragraph("No. Solicita en línea antes de viajar."),
  h3("¿Cubre la e-visa todo el país?"),
  paragraph("Sí — toda Azerbaiyán, no solo Bakú."),
  h3("¿Puedo extender la e-visa?"),
  paragraph("No. Sal del país y aplica de nuevo desde fuera."),
  h3("¿Qué es la e-visa ASAN?"),
  paragraph("Son lo mismo. ASAN es el portal del gobierno que procesa las e-visas de Azerbaiyán."),

  quote("Solicita tu e-visa de Azerbaiyán con confianza. Más de 100 países elegibles, requisitos simples, 100% en línea."),
];

// ═══════════════════════════════════════════════════════════════════════
// ARABIC BODY
// ═══════════════════════════════════════════════════════════════════════
const body_ar = [
  paragraph(
    "هل تخطط لزيارة باكو؟ أهم خطوة قبل حجز رحلاتك هي فهم ",
    { text: "متطلبات التأشيرة الإلكترونية لأذربيجان", bold: true },
    ". يمكن لمواطني أكثر من 100 دولة التقدم للحصول على ",
    { text: "التأشيرة الإلكترونية لأذربيجان", bold: true },
    " بالكامل عبر الإنترنت. يغطي هذا الدليل جميع المتطلبات. ابحث عن جنسيتك أدناه."
  ),

  h2("متطلبات التأشيرة الإلكترونية لأذربيجان 2026 — نظرة عامة"),
  paragraph("قائمة سريعة بـ", { text: "متطلبات تأشيرة أذربيجان", bold: true }, ":"),
  li({ text: "جواز سفر ساري المفعول", bold: true }, " — 6 أشهر صلاحية على الأقل بعد المغادرة"),
  li({ text: "صورة رقمية", bold: true }, " — خلفية بيضاء، 35×45 مم"),
  li({ text: "بريد إلكتروني صالح", bold: true }, " — لاستلام التأشيرة كملف PDF"),
  li({ text: "بطاقة ائتمان أو خصم", bold: true }, " — 69 دولاراً رسوم قياسية"),

  h2("الوثائق المطلوبة للتأشيرة الإلكترونية لأذربيجان"),
  h3("1. جواز سفر ساري المفعول"),
  paragraph("صالح 6 أشهر على الأقل بعد مغادرتك المخططة. في حالة جيدة."),
  h3("2. صورة رقمية بحجم جواز السفر"),
  paragraph({ text: "حجم صورة تأشيرة أذربيجان", bold: true }, ": 35×45 مم، خلفية بيضاء نقية، وجه مرئي. JPEG أو PNG، أقل من 5 ميغابايت."),
  h3("3. بريد إلكتروني صالح"),
  paragraph("التأشيرة المعتمدة تصل كملف PDF. استخدم بريداً شخصياً تتحقق منه بانتظام."),
  h3("4. طريقة الدفع"),
  paragraph("بطاقات فيزا وماستركارد وأمريكان إكسبريس. الرسوم القياسية: 69 دولاراً."),

  h2("كيفية التقدم للتأشيرة الإلكترونية لأذربيجان — خطوة بخطوة"),
  h3("الخطوة 1: تحقق من الأهلية"),
  paragraph("تأكد من أن دولتك مدرجة في قائمة الدول المؤهلة. أكثر من 100 دولة مؤهلة."),
  h3("الخطوة 2: اختر سرعة المعالجة"),
  paragraph("قياسي: 3 أيام عمل — 69 دولاراً. عاجل: 3 ساعات — رسوم إضافية."),
  h3("الخطوة 3: أكمل النموذج"),
  paragraph("الاسم الكامل، تفاصيل جواز السفر، تاريخ الوصول، رفع الصورة. تحقق من رقم جواز السفر مرتين."),
  h3("الخطوة 4: ادفع عبر الإنترنت"),
  paragraph("ادفع ببطاقة دولية. ستتلقى تأكيداً فورياً."),
  h3("الخطوة 5: انتظر الموافقة"),
  paragraph("قياسي: 3 أيام. عاجل: 3 ساعات. ستتلقى التأشيرة كملف PDF في بريدك."),
  h3("الخطوة 6: اطبع وسافر"),
  paragraph("اطبع 1-2 نسخ. احفظ نسخة رقمية على هاتفك. قدمها عند الهجرة."),

  h2("صلاحية التأشيرة ومدة الإقامة"),
  paragraph("الصلاحية: 90 يوماً من الإصدار. الإقامة القصوى: ", { text: "30 يوماً", bold: true }, ". دخول واحد فقط."),

  h2("التأشيرة الإلكترونية لأذربيجان للمواطنين الأتراك"),
  paragraph(
    "المواطنون الأتراك ",
    { text: "لا يحتاجون إلى تأشيرة لأذربيجان", bold: true },
    ". يمكنهم الدخول بدون تأشيرة لمدة 90 يوماً بجواز سفر تركي صالح فقط."
  ),

  h2("متطلبات خاصة بكل دولة"),
  h3("المملكة المتحدة"), paragraph("مؤهلون تماماً. لم يغير بريكسيت سياسة التأشيرة. العملية القياسية."),
  h3("الولايات المتحدة"), paragraph("تقدم عبر الإنترنت، ادفع 69 دولاراً، موافقة خلال 24-48 ساعة."),
  h3("باكستان"), paragraph("مؤهلون تماماً. نفس الوثائق، نفس الرسوم، نفس 3 أيام."),
  h3("نيجيريا"), paragraph("مؤهلون. تأكد من تحديث شهادة تطعيم الحمى الصفراء."),
  h3("إيران"), paragraph("تواصل مع السفارة الأذربيجانية للإجراءات المحددة."),

  h2("الأسئلة المتداولة"),
  h3("هل يمكن الحصول على التأشيرة عند الوصول؟"),
  paragraph("لا. تقدم عبر الإنترنت قبل السفر."),
  h3("هل تغطي التأشيرة البلاد بالكامل؟"),
  paragraph("نعم — أذربيجان بأكملها، ليس باكو فقط."),
  h3("هل يمكن تمديد التأشيرة؟"),
  paragraph("لا. غادر البلاد وتقدم بطلب جديد من الخارج."),
  h3("ما الفرق بين التأشيرة الإلكترونية وتأشيرة ASAN؟"),
  paragraph("هما نفس الشيء. ASAN هو البوابة الحكومية التي تعالج طلبات التأشيرة الإلكترونية."),

  quote("تقدم بطلب تأشيرتك الإلكترونية لأذربيجان بثقة. أكثر من 100 دولة مؤهلة، متطلبات بسيطة، 100% عبر الإنترنت."),
];

// ═══════════════════════════════════════════════════════════════════════
// CREATE THE POST
// ═══════════════════════════════════════════════════════════════════════
async function run() {
  const slug = "azerbaijan-evisa-requirements-2026";

  const existing = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ _id }`,
    { slug }
  );

  const data = {
    _type: "post",
    slug: { _type: "slug", current: slug },
    publishedAt: new Date().toISOString(),

    english: {
      title_en: "Azerbaijan e-Visa Requirements 2026 — Documents, Photo, Passport & How to Apply",
      category_en: "Visa Guide",
      excerpt_en: "Complete guide to Azerbaijan e-Visa requirements 2026. Documents needed, photo specs, passport validity, how to apply online, validity rules, Turkish citizens, country-specific info for UK, US, Pakistani, Nigerian and Iranian citizens.",
      metaTitle_en: "Azerbaijan e-Visa Requirements 2026 — Documents, Photo & How to Apply",
      metaDescription_en: "Complete Azerbaijan e-Visa requirements 2026. Documents needed, photo size, passport validity, how to apply online. Turkish citizens visa-free. UK, US, PK, NG, IR citizens covered.",
      body_en,
    },

    spanish: {
      title_es: "Requisitos de la e-Visa de Azerbaiyán 2026 — Documentos, Foto y Cómo Solicitar",
      category_es: "Guía de Visa",
      excerpt_es: "Guía completa de requisitos de la e-visa de Azerbaiyán 2026. Documentos necesarios, tamaño de foto, validez del pasaporte, cómo solicitar en línea, ciudadanos turcos sin visa y notas específicas por país.",
      metaTitle_es: "Requisitos e-Visa Azerbaiyán 2026 — Documentos, Foto y Cómo Solicitar",
      metaDescription_es: "Requisitos completos de la e-visa de Azerbaiyán 2026. Documentos, foto, pasaporte, cómo solicitar. Ciudadanos turcos sin visa. Reino Unido, EE.UU., Pakistán cubiertos.",
      body_es,
    },

    arabic: {
      title_ar: "متطلبات التأشيرة الإلكترونية لأذربيجان 2026 — الوثائق والصورة وكيفية التقديم",
      category_ar: "دليل التأشيرة",
      excerpt_ar: "الدليل الكامل لمتطلبات التأشيرة الإلكترونية لأذربيجان 2026. الوثائق المطلوبة، مواصفات الصورة، صلاحية جواز السفر، كيفية التقديم، المواطنون الأتراك بدون تأشيرة، وملاحظات خاصة بكل دولة.",
      metaTitle_ar: "متطلبات التأشيرة الإلكترونية لأذربيجان 2026 — الوثائق والصورة وكيفية التقديم",
      metaDescription_ar: "متطلبات التأشيرة الإلكترونية لأذربيجان 2026. الوثائق، الصورة، جواز السفر، كيفية التقديم. الأتراك بدون تأشيرة. المملكة المتحدة، أمريكا، باكستان مشمولون.",
      body_ar,
    },
  };

  let result;
  if (existing) {
    console.log(`Updating existing post ${existing._id}...`);
    result = await client.patch(existing._id).set(data).commit();
  } else {
    console.log("Creating new post...");
    result = await client.create(data);
  }

  console.log("✅ Done. Post ID:", result._id);
  console.log("URLs:");
  console.log(`  EN: https://azerbaijan-evisa.com/en/${slug}`);
  console.log(`  ES: https://azerbaijan-evisa.com/es/${slug}`);
  console.log(`  AR: https://azerbaijan-evisa.com/ar/${slug}`);
}

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
