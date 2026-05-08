import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});

async function createContent() {
  try {
    console.log("🚀 Creating content...\n");

    // ============ HOME PAGE - ENGLISH ============
    console.log("Creating homePage (English)...");
    await client.create({
      _type: "homePage",
      language: "en",
      heroTitle: "Visa Approved in 3 Simple Steps",
      heroPrimaryButton: {
        text: "Apply Now",
        link: "/apply",
      },
      heroSecondaryButton: {
        text: "Track Application",
        link: "/track",
      },
      processingOptions: [
        { name: "Urgent", time: "3 Hours" },
        { name: "Standard", time: "3–5 Business Days" },
      ],
      steps: [
        {
          title: "Apply Online",
          description:
            "Fill out our secure application form in just a few minutes from any device.",
          color: "#E8671A",
        },
        {
          title: "Secure Payment",
          description:
            "Pay the processing fee securely using your credit card or other payment methods.",
          color: "#3b82f6",
        },
        {
          title: "Get your e-Visa",
          description:
            "Receive your official Azerbaijan e-Visa directly to your email once approved.",
          color: "#10b981",
        },
      ],
      faqs: [
        {
          question: "Who is eligible for the Azerbaijan e-Visa?",
          answer:
            "Citizens of over 100 countries are eligible to apply for the Azerbaijan e-Visa online. You can check eligibility by selecting your nationality on our application page.",
        },
        {
          question: "How long does it take to get an Azerbaijan e-Visa?",
          answer:
            "Standard processing takes 3 business days. If you need your visa sooner, our urgent processing option delivers your approved e-Visa in just 3 hours for an additional fee.",
        },
        {
          question: "How much does the Azerbaijan e-Visa cost?",
          answer:
            "The standard e-Visa fee is $69 USD, which includes all government and processing charges. Urgent processing is available for an additional fee.",
        },
        {
          question: "How long can I stay in Azerbaijan with an e-Visa?",
          answer:
            "The Azerbaijan e-Visa allows a single entry with a maximum stay of 30 days. The visa is valid for 90 days from the date of issue.",
        },
        {
          question: "What documents do I need to apply?",
          answer:
            "You need a valid passport with at least 6 months of validity, a digital passport-sized photo, a valid email address, and a credit or debit card for payment.",
        },
        {
          question: "Can I extend my Azerbaijan e-Visa?",
          answer:
            "The Azerbaijan e-Visa cannot be extended online. If you wish to stay longer, you must apply for a new visa.",
        },
      ],
    });

    // ============ HOME PAGE - SPANISH ============
    console.log("Creating homePage (Spanish)...");
    await client.create({
      _type: "homePage",
      language: "es",
      heroTitle: "Visa Aprobada en 3 Pasos Simples",
      heroPrimaryButton: {
        text: "Solicitar Ahora",
        link: "/apply",
      },
      heroSecondaryButton: {
        text: "Rastrear Solicitud",
        link: "/track",
      },
      processingOptions: [
        { name: "Urgente", time: "3 Horas" },
        { name: "Estándar", time: "3–5 Días Hábiles" },
      ],
      steps: [
        {
          title: "Solicitar en Línea",
          description:
            "Complete nuestro formulario de solicitud seguro en solo unos minutos desde cualquier dispositivo.",
          color: "#E8671A",
        },
        {
          title: "Pago Seguro",
          description:
            "Pague la tarifa de procesamiento de forma segura con su tarjeta de crédito u otros métodos de pago.",
          color: "#3b82f6",
        },
        {
          title: "Obtenga su e-Visa",
          description:
            "Reciba su visado electrónico oficial de Azerbaiyán directamente en su correo electrónico una vez aprobado.",
          color: "#10b981",
        },
      ],
      faqs: [
        {
          question: "¿Quién es elegible para la e-Visa de Azerbaiyán?",
          answer:
            "Ciudadanos de más de 100 países son elegibles para solicitar la e-Visa de Azerbaiyán en línea. Puede verificar su elegibilidad seleccionando su nacionalidad en nuestra página de solicitud.",
        },
        {
          question: "¿Cuánto tiempo tarda en obtener la e-Visa de Azerbaiyán?",
          answer:
            "El procesamiento estándar tarda 3 días hábiles. Si necesita su visa más rápido, nuestra opción de procesamiento urgente entrega su e-Visa aprobada en solo 3 horas.",
        },
        {
          question: "¿Cuánto cuesta la e-Visa de Azerbaiyán?",
          answer:
            "La tarifa estándar de e-Visa es de $69 USD, que incluye todos los cargos gubernamentales y de procesamiento. El procesamiento urgente está disponible por una tarifa adicional.",
        },
        {
          question:
            "¿Cuánto tiempo puedo permanecer en Azerbaiyán con una e-Visa?",
          answer:
            "La e-Visa de Azerbaiyán permite una sola entrada con una estadía máxima de 30 días. La visa es válida por 90 días desde la fecha de emisión.",
        },
        {
          question: "¿Qué documentos necesito para solicitar?",
          answer:
            "Necesita un pasaporte válido con al menos 6 meses de validez, una foto de pasaporte digital, una dirección de correo electrónico válida y una tarjeta de crédito o débito.",
        },
        {
          question: "¿Puedo extender mi e-Visa de Azerbaiyán?",
          answer:
            "La e-Visa de Azerbaiyán no se puede extender en línea. Si desea permanecer más tiempo, debe solicitar una nueva visa.",
        },
      ],
    });

    // ============ HOME PAGE - ARABIC ============
    console.log("Creating homePage (Arabic)...");
    await client.create({
      _type: "homePage",
      language: "ar",
      heroTitle: "تم الموافقة على التأشيرة في 3 خطوات بسيطة",
      heroPrimaryButton: {
        text: "قدم الآن",
        link: "/apply",
      },
      heroSecondaryButton: {
        text: "تتبع الطلب",
        link: "/track",
      },
      processingOptions: [
        { name: "عاجل", time: "3 ساعات" },
        { name: "قياسي", time: "3–5 أيام عمل" },
      ],
      steps: [
        {
          title: "التقديم عبر الإنترنت",
          description:
            "أكمل نموذج طلبنا الآمن في بضع دقائق فقط من أي جهاز.",
          color: "#E8671A",
        },
        {
          title: "الدفع الآمن",
          description:
            "ادفع رسوم المعالجة بأمان باستخدام بطاقة الائتمان أو طرق الدفع الأخرى.",
          color: "#3b82f6",
        },
        {
          title: "احصل على تأشيرتك الإلكترونية",
          description:
            "احصل على تأشيرة أذربيجان الإلكترونية الرسمية مباشرة إلى بريدك الإلكتروني بعد الموافقة.",
          color: "#10b981",
        },
      ],
      faqs: [
        {
          question: "من يستحق الحصول على التأشيرة الإلكترونية لأذربيجان؟",
          answer:
            "مواطنو أكثر من 100 دولة مؤهلون للتقديم على التأشيرة الإلكترونية لأذربيجان عبر الإنترنت. يمكنك التحقق من أهليتك بتحديد جنسيتك.",
        },
        {
          question: "كم من الوقت يستغرق الحصول على التأشيرة الإلكترونية؟",
          answer:
            "تستغرق المعالجة القياسية 3 أيام عمل. إذا كنت بحاجة إلى تأشيرتك بسرعة أكبر، فإن خيار المعالجة العاجلة يسلم تأشيرتك المعتمدة في 3 ساعات فقط.",
        },
        {
          question: "كم تكلفة التأشيرة الإلكترونية لأذربيجان؟",
          answer:
            "رسوم التأشيرة الإلكترونية القياسية هي 69 دولار أمريكي، والذي يشمل جميع الرسوم الحكومية ورسوم المعالجة.",
        },
        {
          question: "كم من الوقت يمكنني البقاء في أذربيجان برسم التأشيرة الإلكترونية؟",
          answer:
            "تسمح التأشيرة الإلكترونية بدخول واحد مع حد أقصى للإقامة 30 يوم. التأشيرة صالحة لمدة 90 يومًا من تاريخ الإصدار.",
        },
        {
          question: "ما المستندات التي أحتاجها للتقديم؟",
          answer:
            "تحتاج إلى جواز سفر صالح مع 6 أشهر على الأقل من الصلاحية وصورة جواز سفر رقمية وعنوان بريد إلكتروني صالح وبطاقة ائتمان.",
        },
        {
          question: "هل يمكنني تمديد التأشيرة الإلكترونية لأذربيجان؟",
          answer:
            "لا يمكن تمديد التأشيرة الإلكترونية عبر الإنترنت. إذا كنت ترغب في البقاء لفترة أطول، يجب عليك التقديم على تأشيرة جديدة.",
        },
      ],
    });

    // ============ COUNTRIES ============
    const countries = [
      { en: "United States", es: "Estados Unidos", ar: "الولايات المتحدة", code: "us" },
      { en: "United Kingdom", es: "Reino Unido", ar: "المملكة المتحدة", code: "gb" },
      { en: "Canada", es: "Canadá", ar: "كندا", code: "ca" },
      { en: "Australia", es: "Australia", ar: "أستراليا", code: "au" },
      { en: "Germany", es: "Alemania", ar: "ألمانيا", code: "de" },
      { en: "France", es: "Francia", ar: "فرنسا", code: "fr" },
      { en: "Spain", es: "España", ar: "إسبانيا", code: "es" },
      { en: "Japan", es: "Japón", ar: "اليابان", code: "jp" },
      { en: "China", es: "China", ar: "الصين", code: "cn" },
      { en: "India", es: "India", ar: "الهند", code: "in" },
    ];

    console.log("Creating countries...");
    for (const country of countries) {
      // English
      await client.create({
        _type: "country",
        language: "en",
        name: country.en,
        slug: { current: country.en.toLowerCase().replace(/ /g, "-") },
        countryCode: country.code,
      });

      // Spanish
      await client.create({
        _type: "country",
        language: "es",
        name: country.es,
        slug: { current: country.es.toLowerCase().replace(/ /g, "-") },
        countryCode: country.code,
      });

      // Arabic
      await client.create({
        _type: "country",
        language: "ar",
        name: country.ar,
        slug: { current: country.ar.toLowerCase().replace(/ /g, "-") },
        countryCode: country.code,
      });
    }

    console.log("\n✅ All content created successfully!");
    console.log("\n📋 Created:");
    console.log("   • 3 homePage documents (en, es, ar)");
    console.log("   • 30 country documents (10 countries × 3 languages)");
    console.log("\n🚀 Next: Visit http://localhost:3000/en/ to see it live!");
  } catch (error) {
    console.error("❌ Error creating content:", error);
    process.exit(1);
  }
}

createContent();
