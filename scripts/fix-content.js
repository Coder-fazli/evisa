import { createClient } from "next-sanity";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function fixContent() {
  try {
    console.log("🔧 Fixing content...\n");

    // ============ ADD MISSING HOME PAGES ============
    console.log("Adding homePage documents (ES, AR)...");

    // Spanish homePage
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
          description: "Complete nuestro formulario de solicitud seguro en solo unos minutos desde cualquier dispositivo.",
          color: "#E8671A",
        },
        {
          title: "Pago Seguro",
          description: "Pague la tarifa de procesamiento de forma segura con su tarjeta de crédito u otros métodos de pago.",
          color: "#3b82f6",
        },
        {
          title: "Obtenga su e-Visa",
          description: "Reciba su visado electrónico oficial de Azerbaiyán directamente en su correo electrónico una vez aprobado.",
          color: "#10b981",
        },
      ],
      faqs: [
        {
          question: "¿Quién es elegible para la e-Visa de Azerbaiyán?",
          answer: "Ciudadanos de más de 100 países son elegibles para solicitar la e-Visa de Azerbaiyán en línea.",
        },
        {
          question: "¿Cuánto tiempo tarda en obtener la e-Visa?",
          answer: "El procesamiento estándar tarda 3 días hábiles. La opción urgente entrega en 3 horas.",
        },
        {
          question: "¿Cuánto cuesta?",
          answer: "La tarifa estándar es de $69 USD, que incluye todos los cargos gubernamentales.",
        },
        {
          question: "¿Cuánto tiempo puedo permanecer?",
          answer: "La e-Visa permite una sola entrada con una estadía máxima de 30 días.",
        },
        {
          question: "¿Qué documentos necesito?",
          answer: "Necesita un pasaporte válido, una foto de pasaporte digital, un correo electrónico y una tarjeta de pago.",
        },
        {
          question: "¿Puedo extender mi visa?",
          answer: "La e-Visa no se puede extender en línea. Debe solicitar una nueva visa.",
        },
      ],
    });

    // Arabic homePage
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
          description: "أكمل نموذج طلبنا الآمن في بضع دقائق فقط من أي جهاز.",
          color: "#E8671A",
        },
        {
          title: "الدفع الآمن",
          description: "ادفع رسوم المعالجة بأمان باستخدام بطاقة الائتمان أو طرق الدفع الأخرى.",
          color: "#3b82f6",
        },
        {
          title: "احصل على تأشيرتك الإلكترونية",
          description: "احصل على تأشيرة أذربيجان الإلكترونية الرسمية مباشرة إلى بريدك الإلكتروني.",
          color: "#10b981",
        },
      ],
      faqs: [
        {
          question: "من يستحق الحصول على التأشيرة الإلكترونية؟",
          answer: "مواطنو أكثر من 100 دولة مؤهلون للتقديم على التأشيرة الإلكترونية عبر الإنترنت.",
        },
        {
          question: "كم من الوقت يستغرق الحصول على التأشيرة؟",
          answer: "تستغرق المعالجة القياسية 3 أيام عمل. المعالجة العاجلة تسلم في 3 ساعات.",
        },
        {
          question: "كم التكلفة؟",
          answer: "رسوم التأشيرة هي 69 دولار أمريكي، والذي يشمل جميع الرسوم.",
        },
        {
          question: "كم من الوقت يمكنني البقاء؟",
          answer: "تسمح التأشيرة بدخول واحد مع حد أقصى للإقامة 30 يوم.",
        },
        {
          question: "ما المستندات المطلوبة؟",
          answer: "تحتاج إلى جواز سفر صالح وصورة جواز سفر وبريد إلكتروني وبطاقة ائتمان.",
        },
        {
          question: "هل يمكنني تمديد التأشيرة؟",
          answer: "لا يمكن تمديد التأشيرة عبر الإنترنت. يجب عليك التقديم على تأشيرة جديدة.",
        },
      ],
    });

    console.log("✅ Added Spanish and Arabic homePages\n");

    // Get all countries
    const countries = await client.fetch(`*[_type == "country"]{ _id, name, slug, countryCode }`);
    console.log(`Found ${countries.length} countries\n`);

    // Add language field to existing countries (set to English)
    console.log("Adding language field to countries...");
    for (const country of countries) {
      await client.patch(country._id).set({ language: "en" }).commit();
    }
    console.log(`✅ Added language field to ${countries.length} countries\n`);

    // Create Spanish versions
    console.log("Creating Spanish country versions...");
    const countryTranslations = {
      "United States": "Estados Unidos",
      "United Kingdom": "Reino Unido",
      "Canada": "Canadá",
      "Australia": "Australia",
      "Germany": "Alemania",
      "France": "Francia",
      "Spain": "España",
      "Italy": "Italia",
      "Japan": "Japón",
      "China": "China",
      "India": "India",
      "Brazil": "Brasil",
      "Mexico": "México",
      "Netherlands": "Países Bajos",
      "Belgium": "Bélgica",
      "Switzerland": "Suiza",
      "Sweden": "Suecia",
      "Norway": "Noruega",
      "Denmark": "Dinamarca",
      "Finland": "Finlandia",
      "Poland": "Polonia",
      "Greece": "Grecia",
      "Portugal": "Portugal",
      "Ireland": "Irlanda",
      "Austria": "Austria",
      "Czech Republic": "República Checa",
      "Hungary": "Hungría",
      "Romania": "Rumania",
      "Bulgaria": "Bulgaria",
      "Croatia": "Croacia",
      "Serbia": "Serbia",
      "Ukraine": "Ucrania",
      "Russia": "Rusia",
      "Turkey": "Turquía",
      "South Korea": "Corea del Sur",
      "Thailand": "Tailandia",
      "Vietnam": "Vietnam",
      "Philippines": "Filipinas",
      "Indonesia": "Indonesia",
      "Malaysia": "Malasia",
      "Singapore": "Singapur",
      "New Zealand": "Nueva Zelanda",
      "South Africa": "Sudáfrica",
      "Egypt": "Egipto",
      "Morocco": "Marruecos",
      "Saudi Arabia": "Arabia Saudita",
      "United Arab Emirates": "Emiratos Árabes Unidos",
      "Israel": "Israel",
      "Lebanon": "Líbano",
      "Costa Rica": "Costa Rica",
      "Panama": "Panamá",
      "Colombia": "Colombia",
      "Argentina": "Argentina",
      "Chile": "Chile",
      "Peru": "Perú",
      "Venezuela": "Venezuela",
      "Ecuador": "Ecuador",
      "Bolivia": "Bolivia",
      "Paraguay": "Paraguay",
      "Uruguay": "Uruguay",
      "Dominican Republic": "República Dominicana",
    };

    let spanishCount = 0;
    for (const country of countries) {
      const spanishName = countryTranslations[country.name] || country.name;
      await client.create({
        _type: "country",
        language: "es",
        name: spanishName,
        slug: { current: spanishName.toLowerCase().replace(/ /g, "-") },
        countryCode: country.countryCode,
      });
      spanishCount++;
    }
    console.log(`✅ Created ${spanishCount} Spanish country versions\n`);

    // Create Arabic versions (simplified - using English names transliterated)
    console.log("Creating Arabic country versions...");
    for (const country of countries) {
      await client.create({
        _type: "country",
        language: "ar",
        name: country.name, // Keep English name for now
        slug: { current: country.name.toLowerCase().replace(/ /g, "-") },
        countryCode: country.countryCode,
      });
    }
    console.log(`✅ Created ${countries.length} Arabic country versions\n`);

    console.log("✨ All fixes complete!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

fixContent();
