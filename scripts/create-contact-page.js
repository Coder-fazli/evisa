import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
});

async function createContactPage() {
  try {
    const doc = {
      _id: "contactPage",
      _type: "contactPage",
      english: {
        heroTitle_en: "Contact",
        label_en: "WRITE A MESSAGE",
        title_en: "Always Here to Help You",
        description_en: "Have a question, comment, or suggestion? We'd love to hear from you! Use the form below to get in touch with us.",
        namePlaceholder_en: "Your name",
        emailPlaceholder_en: "Email address",
        phonePlaceholder_en: "Phone number",
        subjectPlaceholder_en: "Subject",
        messagePlaceholder_en: "Write a message",
        buttonText_en: "Send a Message",
        successMessage_en: "Thank you! Your message has been sent.",
        metaTitle_en: "Contact Us - eVisa Azerbaijan",
        metaDescription_en: "Have a question about Azerbaijan e-Visa? Get in touch with our support team.",
      },
      spanish: {
        heroTitle_es: "Contacto",
        label_es: "ESCRIBE UN MENSAJE",
        title_es: "Siempre Aquí Para Ayudarte",
        description_es: "¿Tienes una pregunta, comentario o sugerencia? ¡Nos encantaría saber de ti! Usa el formulario a continuación para ponerte en contacto con nosotros.",
        namePlaceholder_es: "Tu nombre",
        emailPlaceholder_es: "Correo electrónico",
        phonePlaceholder_es: "Número de teléfono",
        subjectPlaceholder_es: "Asunto",
        messagePlaceholder_es: "Escribe un mensaje",
        buttonText_es: "Enviar Mensaje",
        successMessage_es: "¡Gracias! Tu mensaje ha sido enviado.",
        metaTitle_es: "Contáctanos - eVisa Azerbaiyán",
        metaDescription_es: "¿Tienes una pregunta sobre la e-Visa de Azerbaiyán? Ponte en contacto con nuestro equipo de soporte.",
      },
      arabic: {
        heroTitle_ar: "اتصل بنا",
        label_ar: "اكتب رسالة",
        title_ar: "نحن هنا دائمًا لمساعدتك",
        description_ar: "هل لديك سؤال أو تعليق أو اقتراح؟ نحن نحب أن نسمع منك! استخدم النموذج أدناه للتواصل معنا.",
        namePlaceholder_ar: "اسمك",
        emailPlaceholder_ar: "البريد الإلكتروني",
        phonePlaceholder_ar: "رقم الهاتف",
        subjectPlaceholder_ar: "الموضوع",
        messagePlaceholder_ar: "اكتب رسالة",
        buttonText_ar: "إرسال رسالة",
        successMessage_ar: "شكراً لك! تم إرسال رسالتك.",
        metaTitle_ar: "اتصل بنا - التأشيرة الإلكترونية لأذربيجان",
        metaDescription_ar: "هل لديك سؤال حول التأشيرة الإلكترونية لأذربيجان؟ تواصل مع فريق الدعم لدينا.",
      },
    };

    await client.createOrReplace(doc);
    console.log("✅ Contact page created!");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

createContactPage();
