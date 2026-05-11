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

// Helper: create a block (paragraph, heading, quote)
function block(style, children) {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children,
  };
}

// Helper: create a span (text run) — accepts string or array of {text, marks}
function span(text, marks = []) {
  return {
    _type: "span",
    _key: key(),
    text,
    marks,
  };
}

// Helper: build a paragraph with mixed bold + normal text
function paragraph(...parts) {
  const children = parts.map((p) =>
    typeof p === "string" ? span(p) : span(p.text, p.marks || ["strong"])
  );
  return block("normal", children);
}

function heading(level, text) {
  return block(level, [span(text)]);
}

function quote(text) {
  return block("blockquote", [span(text)]);
}

// ---- ENGLISH CONTENT ----
const body_en = [
  heading("h2", "Azerbaijan e-Visa Eligible Countries List 2026"),
  paragraph(
    "Over ",
    { text: "100 countries are eligible" },
    " to apply for the Azerbaijan e-Visa online. If you are a citizen of ",
    { text: "Egypt, Saudi Arabia, Pakistan, Malaysia, China, Iran, UAE, India, Turkey" },
    ", or any eligible country, you can get your ASAN electronic visa in just minutes without visiting an embassy."
  ),

  heading("h3", "Is My Country Eligible for Azerbaijan e-Visa?"),
  paragraph(
    "Citizens from countries like ",
    { text: "Egypt, Saudi Arabia, Pakistan, Malaysia, China, Iran, United States, United Kingdom, Germany, France, Italy, Spain, Canada, Australia, Japan, South Korea" },
    ", and many others can apply for Azerbaijan e-Visa. Check the complete eligible countries list by selecting your nationality above."
  ),

  heading("h3", "Popular Countries for Azerbaijan e-Visa"),
  paragraph(
    "Most frequent applicants come from ",
    { text: "Egypt, Saudi Arabia, Pakistan, India, China, Iran, Turkey, Malaysia, Indonesia, Philippines, UAE, Kuwait, Qatar, and Bangladesh" },
    ". All these countries have full access to the Azerbaijan ASAN e-Visa program."
  ),

  heading("h3", "Azerbaijan e-Visa Requirements"),
  paragraph(
    "To apply for the Azerbaijan electronic visa you need: a ",
    { text: "valid passport" },
    " with at least 6 months validity, a digital passport-sized photo, a valid email address, and payment method. The standard fee is ",
    { text: "$69 USD" },
    " which includes all government and processing charges."
  ),

  heading("h3", "Fast e-Visa Processing"),
  paragraph(
    "Our service offers ",
    { text: "3-hour approval" },
    " for urgent processing or 3 business days for standard processing. With a ",
    { text: "99.99% success rate" },
    " and over ",
    { text: "10,450 approved visas" },
    " this year, we are the most trusted e-Visa service for Azerbaijan."
  ),

  heading("h3", "How Long Can I Stay in Azerbaijan?"),
  paragraph(
    "The Azerbaijan e-Visa allows a ",
    { text: "maximum 30-day stay" },
    " with single entry. The visa is valid for 90 days from the date of issue, so you must enter Azerbaijan within that window."
  ),

  quote(
    "Apply for your Azerbaijan e-Visa today. Over 100 eligible countries, 100% online process, no embassy visit required."
  ),
];

// ---- SPANISH CONTENT ----
const body_es = [
  heading("h2", "Lista de Países Elegibles para e-Visa de Azerbaiyán 2026"),
  paragraph(
    "Más de ",
    { text: "100 países son elegibles" },
    " para solicitar la e-visa de Azerbaiyán en línea. Si eres ciudadano de ",
    { text: "Egipto, Arabia Saudita, Paquistán, Malasia, China, Irán, Emiratos Árabes Unidos, India, Turquía" },
    " o cualquier país elegible, puedes obtener tu visa electrónica ASAN en solo unos minutos sin visitar la embajada."
  ),

  heading("h3", "¿Mi país es elegible para la e-visa de Azerbaiyán?"),
  paragraph(
    "Los ciudadanos de países como ",
    { text: "Egipto, Arabia Saudita, Paquistán, Malasia, China, Irán, Estados Unidos, Reino Unido, Alemania, Francia, Italia, España, Canadá, Australia, Japón, Corea del Sur" },
    " y muchos otros pueden solicitar la e-visa de Azerbaiyán. Verifica la lista completa de países elegibles seleccionando tu nacionalidad arriba."
  ),

  heading("h3", "Países Populares con e-Visa para Azerbaiyán"),
  paragraph(
    "Los solicitantes más frecuentes provienen de ",
    { text: "Egipto, Arabia Saudita, Paquistán, India, China, Irán, Turquía, Malasia, Indonesia, Filipinas, EAU, Kuwait, Catar y Bangladés" },
    ". Todos estos países tienen acceso completo al programa de visa electrónica ASAN de Azerbaiyán."
  ),

  heading("h3", "Requisitos de e-Visa para Azerbaiyán"),
  paragraph(
    "Para solicitar la visa electrónica de Azerbaiyán necesitas: ",
    { text: "pasaporte válido" },
    " con al menos 6 meses de validez, una foto digital tamaño pasaporte, una dirección de email válida y un método de pago. La tarifa estándar es de ",
    { text: "$69 USD" },
    " e incluye todos los cargos gubernamentales."
  ),

  heading("h3", "Procesamiento Rápido de e-Visa"),
  paragraph(
    "Nuestro servicio ofrece ",
    { text: "aprobación en 3 horas" },
    " para procesamiento urgente o 3 días hábiles para procesamiento estándar. Con una tasa de éxito del ",
    { text: "99.99%" },
    " y más de ",
    { text: "10,450 visas aprobadas" },
    " este año, somos el servicio de e-visa más confiable para Azerbaiyán."
  ),

  heading("h3", "¿Cuánto Tiempo Puedo Quedarme en Azerbaiyán?"),
  paragraph(
    "La e-visa de Azerbaiyán permite una ",
    { text: "estancia máxima de 30 días" },
    " con entrada única. La visa es válida por 90 días desde la fecha de emisión, por lo que debes ingresar a Azerbaiyán dentro de ese período."
  ),

  quote(
    "Solicita tu e-visa de Azerbaiyán hoy mismo. Más de 100 países elegibles, proceso 100% en línea, sin necesidad de visitar embajada."
  ),
];

// ---- ARABIC CONTENT ----
const body_ar = [
  heading("h2", "قائمة الدول المؤهلة للتأشيرة الإلكترونية لأذربيجان 2026"),
  paragraph(
    "أكثر من ",
    { text: "100 دولة مؤهلة" },
    " للتقدم بطلب التأشيرة الإلكترونية لأذربيجان عبر الإنترنت. إذا كنت من مواطني ",
    { text: "مصر، المملكة العربية السعودية، باكستان، ماليزيا، الصين، إيران، الإمارات، الهند، تركيا" },
    " أو أي دولة مؤهلة، يمكنك الحصول على تأشيرة ASAN الإلكترونية في دقائق قليلة دون زيارة السفارة."
  ),

  heading("h3", "هل بلدي مؤهل للحصول على التأشيرة الإلكترونية لأذربيجان؟"),
  paragraph(
    "يمكن لمواطني دول مثل ",
    { text: "مصر، المملكة العربية السعودية، باكستان، ماليزيا، الصين، إيران، الولايات المتحدة، المملكة المتحدة، ألمانيا، فرنسا، إيطاليا، إسبانيا، كندا، أستراليا، اليابان، كوريا الجنوبية" },
    " وغيرها الكثير التقدم بطلب للحصول على التأشيرة الإلكترونية لأذربيجان. تحقق من القائمة الكاملة باختيار جنسيتك أعلاه."
  ),

  heading("h3", "الدول الأكثر شعبية للحصول على التأشيرة الإلكترونية لأذربيجان"),
  paragraph(
    "يأتي أكثر المتقدمين من ",
    { text: "مصر، المملكة العربية السعودية، باكستان، الهند، الصين، إيران، تركيا، ماليزيا، إندونيسيا، الفلبين، الإمارات، الكويت، قطر، وبنغلاديش" },
    ". جميع هذه الدول لديها وصول كامل إلى برنامج التأشيرة الإلكترونية ASAN لأذربيجان."
  ),

  heading("h3", "متطلبات التأشيرة الإلكترونية لأذربيجان"),
  paragraph(
    "للتقدم بطلب التأشيرة الإلكترونية لأذربيجان، تحتاج إلى: ",
    { text: "جواز سفر صالح" },
    " لمدة 6 أشهر على الأقل، صورة رقمية بحجم جواز السفر، عنوان بريد إلكتروني صالح وطريقة دفع. الرسوم القياسية هي ",
    { text: "69 دولاراً أمريكياً" },
    " وتشمل جميع الرسوم الحكومية."
  ),

  heading("h3", "معالجة سريعة للتأشيرة الإلكترونية"),
  paragraph(
    "تقدم خدمتنا ",
    { text: "موافقة خلال 3 ساعات" },
    " للمعالجة العاجلة أو 3 أيام عمل للمعالجة القياسية. مع معدل نجاح ",
    { text: "99.99%" },
    " وأكثر من ",
    { text: "10,450 تأشيرة موافق عليها" },
    " هذا العام، نحن خدمة التأشيرة الإلكترونية الأكثر موثوقية لأذربيجان."
  ),

  heading("h3", "كم من الوقت يمكنني البقاء في أذربيجان؟"),
  paragraph(
    "تسمح التأشيرة الإلكترونية لأذربيجان ",
    { text: "بإقامة قصوى 30 يوماً" },
    " بدخول واحد. التأشيرة صالحة لمدة 90 يوماً من تاريخ الإصدار، لذلك يجب الدخول إلى أذربيجان خلال هذه الفترة."
  ),

  quote(
    "تقدم بطلب التأشيرة الإلكترونية لأذربيجان اليوم. أكثر من 100 دولة مؤهلة، عملية 100% عبر الإنترنت، بدون الحاجة لزيارة السفارة."
  ),
];

async function run() {
  console.log("Fetching visa-by-nationality document...");
  const doc = await client.fetch(
    `*[_type == "infoPage" && slug.current == "visa-by-nationality"][0]{ _id, _rev }`
  );

  if (!doc) {
    console.error("Document not found");
    process.exit(1);
  }

  console.log(`Found document: ${doc._id}`);
  console.log("Patching with SEO-optimized content for EN, ES, AR...");

  const result = await client
    .patch(doc._id)
    .set({
      "english.title_en": "Azerbaijan e-Visa Eligible Countries 2026",
      "english.metaTitle_en": "Azerbaijan e-Visa Eligible Countries List 2026 | Check Now",
      "english.metaDescription_en":
        "Check Azerbaijan e-Visa eligible countries list. Apply online from Egypt, Saudi Arabia, Pakistan, Malaysia, China, Iran & 100+ eligible countries. Official ASAN visa.",
      "english.body_en": body_en,

      "spanish.title_es": "Países Elegibles para e-Visa de Azerbaiyán 2026",
      "spanish.metaTitle_es": "Países Elegibles para e-Visa Azerbaiyán 2026 | Lista Completa",
      "spanish.metaDescription_es":
        "Lista completa de países elegibles para la e-visa de Azerbaiyán. Solicita online desde Egipto, Arabia Saudita, Paquistán, Malasia, China, Irán y 100+ países más. Visa ASAN.",
      "spanish.body_es": body_es,

      "arabic.title_ar": "الدول المؤهلة للتأشيرة الإلكترونية لأذربيجان 2026",
      "arabic.metaTitle_ar": "الدول المؤهلة للتأشيرة الإلكترونية لأذربيجان 2026 | قائمة كاملة",
      "arabic.metaDescription_ar":
        "قائمة كاملة بالدول المؤهلة للتأشيرة الإلكترونية لأذربيجان. تقدم بالطلب من مصر والسعودية وباكستان وماليزيا والصين وإيران وأكثر من 100 دولة. تأشيرة ASAN.",
      "arabic.body_ar": body_ar,
    })
    .commit();

  console.log("Success. Document updated:", result._id);
  console.log(`Title (EN): ${result.english?.title_en}`);
  console.log(`Title (ES): ${result.spanish?.title_es}`);
  console.log(`Title (AR): ${result.arabic?.title_ar}`);
}

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
