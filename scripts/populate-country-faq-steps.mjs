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

const faq = (q, a) => ({ _type: "object", _key: key(), q, a });
const step = (title, desc) => ({ _type: "object", _key: key(), title, desc });

// ─── STEPS (same structure for all countries, all languages) ───

const steps_en = [
  step("Fill Out the Application", "Complete our secure online application form with your personal details, passport information, and travel dates. Takes about 5 minutes."),
  step("Make a Secure Payment", "Pay the visa fee online using your credit or debit card. Visa, Mastercard, and American Express are accepted."),
  step("Receive Your e-Visa by Email", "Once approved, your Azerbaijan e-Visa will be sent directly to your email as a PDF. Print it or save it to your phone."),
];

const steps_es = [
  step("Completa la Solicitud", "Completa nuestro formulario de solicitud seguro en línea con tus datos personales, información del pasaporte y fechas de viaje. Solo toma unos 5 minutos."),
  step("Realiza el Pago Seguro", "Paga la tarifa de visa en línea usando tu tarjeta de crédito o débito. Se aceptan Visa, Mastercard y American Express."),
  step("Recibe tu e-Visa por Email", "Una vez aprobada, tu e-Visa de Azerbaiyán será enviada directamente a tu email como PDF. Imprímela o guárdala en tu teléfono."),
];

const steps_ar = [
  step("أكمل طلبك", "أكمل نموذج الطلب الآمن عبر الإنترنت ببياناتك الشخصية ومعلومات جواز سفرك وتواريخ سفرك. يستغرق حوالي 5 دقائق."),
  step("أجرِ الدفع الآمن", "ادفع رسوم التأشيرة عبر الإنترنت باستخدام بطاقة الائتمان أو الخصم. يُقبل فيزا وماستركارد وأمريكان إكسبريس."),
  step("استلم تأشيرتك الإلكترونية بالبريد", "بمجرد الموافقة، سيتم إرسال تأشيرتك الإلكترونية لأذربيجان مباشرة إلى بريدك الإلكتروني كملف PDF. اطبعها أو احفظها على هاتفك."),
];

// ─── FAQ generator per country ───

function faqs_en(name) {
  return [
    faq(
      `Are citizens of ${name} eligible for Azerbaijan e-Visa?`,
      `Yes, citizens of ${name} are eligible to apply for the Azerbaijan e-Visa online. You can complete the application in minutes and receive your approved visa by email without visiting an embassy.`
    ),
    faq(
      `How long does it take to process Azerbaijan e-Visa for ${name} citizens?`,
      `Standard processing takes 3 business days. Urgent processing is available and delivers your approved e-Visa in as little as 3 hours for an additional fee.`
    ),
    faq(
      `What documents do ${name} citizens need for Azerbaijan e-Visa?`,
      `You need a valid passport with at least 6 months of remaining validity, a recent passport-sized digital photo with a white background, a valid email address, and a credit or debit card for payment.`
    ),
    faq(
      `How much does the Azerbaijan e-Visa cost for ${name} citizens?`,
      `The standard e-Visa fee is $69 USD, which includes all government and processing charges. Urgent processing is available for an additional fee.`
    ),
    faq(
      `How long can ${name} citizens stay in Azerbaijan with an e-Visa?`,
      `The Azerbaijan e-Visa allows a single entry with a maximum stay of 30 days. The visa is valid for 90 days from the date of issue, so you must enter Azerbaijan within that 90-day window.`
    ),
    faq(
      `Can ${name} citizens extend their Azerbaijan e-Visa?`,
      `The e-Visa cannot be extended from inside Azerbaijan. If you wish to stay longer, you must leave the country and apply for a new visa before re-entering.`
    ),
  ];
}

function faqs_es(name) {
  return [
    faq(
      `¿Son elegibles los ciudadanos de ${name} para la e-Visa de Azerbaiyán?`,
      `Sí, los ciudadanos de ${name} son elegibles para solicitar la e-Visa de Azerbaiyán en línea. Puedes completar la solicitud en minutos y recibir tu visa aprobada por email sin visitar una embajada.`
    ),
    faq(
      `¿Cuánto tiempo tarda la e-Visa de Azerbaiyán para ciudadanos de ${name}?`,
      `El procesamiento estándar tarda 3 días hábiles. El procesamiento urgente está disponible y entrega tu e-Visa aprobada en tan solo 3 horas por una tarifa adicional.`
    ),
    faq(
      `¿Qué documentos necesitan los ciudadanos de ${name} para la e-Visa de Azerbaiyán?`,
      `Necesitas un pasaporte válido con al menos 6 meses de validez restante, una foto digital tipo pasaporte con fondo blanco, una dirección de email válida y una tarjeta de crédito o débito para el pago.`
    ),
    faq(
      `¿Cuánto cuesta la e-Visa de Azerbaiyán para ciudadanos de ${name}?`,
      `La tarifa estándar de la e-Visa es de $69 USD, que incluye todos los cargos gubernamentales y de procesamiento.`
    ),
    faq(
      `¿Cuánto tiempo pueden quedarse los ciudadanos de ${name} en Azerbaiyán con una e-Visa?`,
      `La e-Visa de Azerbaiyán permite una entrada única con una estancia máxima de 30 días. La visa es válida durante 90 días desde la fecha de emisión.`
    ),
    faq(
      `¿Pueden los ciudadanos de ${name} extender su e-Visa de Azerbaiyán?`,
      `La e-Visa no se puede extender desde dentro de Azerbaiyán. Si deseas quedarte más tiempo, debes salir del país y solicitar una nueva visa antes de reingresar.`
    ),
  ];
}

function faqs_ar(name) {
  return [
    faq(
      `هل مواطنو ${name} مؤهلون للتأشيرة الإلكترونية لأذربيجان؟`,
      `نعم، مواطنو ${name} مؤهلون للتقدم بطلب التأشيرة الإلكترونية لأذربيجان عبر الإنترنت. يمكنك إكمال الطلب في دقائق واستلام التأشيرة المعتمدة عبر البريد الإلكتروني دون زيارة سفارة.`
    ),
    faq(
      `كم من الوقت يستغرق معالجة التأشيرة الإلكترونية لأذربيجان لمواطني ${name}؟`,
      `تستغرق المعالجة القياسية 3 أيام عمل. تتوفر المعالجة العاجلة وتُسلّم التأشيرة المعتمدة في غضون 3 ساعات فقط مقابل رسوم إضافية.`
    ),
    faq(
      `ما المستندات التي يحتاجها مواطنو ${name} للتأشيرة الإلكترونية لأذربيجان؟`,
      `تحتاج إلى جواز سفر ساري المفعول بصلاحية لا تقل عن 6 أشهر، وصورة رقمية بحجم جواز السفر بخلفية بيضاء، وعنوان بريد إلكتروني صالح، وبطاقة ائتمان أو خصم للدفع.`
    ),
    faq(
      `كم تكلّف التأشيرة الإلكترونية لأذربيجان لمواطني ${name}؟`,
      `رسوم التأشيرة الإلكترونية القياسية هي 69 دولارًا أمريكيًا، وتشمل جميع رسوم الحكومة والمعالجة.`
    ),
    faq(
      `كم من الوقت يمكن لمواطني ${name} البقاء في أذربيجان بالتأشيرة الإلكترونية؟`,
      `تتيح التأشيرة الإلكترونية لأذربيجان دخولاً واحداً بإقامة قصوى 30 يومًا. التأشيرة صالحة لمدة 90 يومًا من تاريخ الإصدار.`
    ),
    faq(
      `هل يمكن لمواطني ${name} تمديد تأشيرتهم الإلكترونية لأذربيجان؟`,
      `لا يمكن تمديد التأشيرة الإلكترونية من داخل أذربيجان. إذا كنت ترغب في البقاء لفترة أطول، يجب مغادرة البلاد والتقدم بطلب تأشيرة جديدة قبل العودة.`
    ),
  ];
}

// ─── MAIN ───

async function run() {
  // Fetch all countries — only those missing FAQ or steps
  const countries = await client.fetch(`
    *[_type == "country"] {
      _id,
      "name_en": english.name_en,
      "name_es": spanish.name_es,
      "name_ar": arabic.name_ar,
      "has_faqs": defined(english.faqs_en) && count(english.faqs_en) > 0,
      "has_steps": defined(english.steps_en) && count(english.steps_en) > 0
    }
  `);

  console.log(`Found ${countries.length} countries total.`);

  const toUpdate = countries.filter((c) => !c.has_faqs || !c.has_steps);
  console.log(`${toUpdate.length} need FAQ/steps populated.`);

  let done = 0;
  for (const c of toUpdate) {
    const name_en = c.name_en || "your country";
    const name_es = c.name_es || name_en;
    const name_ar = c.name_ar || name_en;

    const patch = {};

    if (!c.has_faqs) {
      patch["english.faqs_en"] = faqs_en(name_en);
      patch["spanish.faqs_es"] = faqs_es(name_es);
      patch["arabic.faqs_ar"] = faqs_ar(name_ar);
    }

    if (!c.has_steps) {
      patch["english.steps_en"] = steps_en;
      patch["spanish.steps_es"] = steps_es;
      patch["arabic.steps_ar"] = steps_ar;
    }

    await client.patch(c._id).set(patch).commit();
    done++;
    console.log(`[${done}/${toUpdate.length}] ✓ ${name_en}`);
  }

  console.log(`\nDone. ${done} countries updated.`);
}

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
