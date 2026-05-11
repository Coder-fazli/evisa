import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "general", title: "⚙️ General", default: true },
    { name: "english", title: "🇬🇧 English" },
    { name: "spanish", title: "🇪🇸 Spanish" },
    { name: "arabic", title: "🇸🇦 Arabic" },
  ],
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      group: "general",
    }),

    defineField({
      name: "english",
      title: "🇬🇧 English (EN)",
      type: "object",
      group: "english",
      fields: [
        defineField({
          name: "heroTitle_en",
          title: "Hero Title",
          type: "string",
          initialValue: "Contact",
        }),
        defineField({
          name: "label_en",
          title: "Label (above title)",
          type: "string",
          initialValue: "WRITE A MESSAGE",
        }),
        defineField({
          name: "title_en",
          title: "Section Title",
          type: "string",
          initialValue: "Always Here to Help You",
        }),
        defineField({
          name: "description_en",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue: "Have a question, comment, or suggestion? We'd love to hear from you! Use the form below to get in touch with us.",
        }),
        defineField({
          name: "namePlaceholder_en",
          title: "Name field placeholder",
          type: "string",
          initialValue: "Your name",
        }),
        defineField({
          name: "emailPlaceholder_en",
          title: "Email field placeholder",
          type: "string",
          initialValue: "Email address",
        }),
        defineField({
          name: "phonePlaceholder_en",
          title: "Phone field placeholder",
          type: "string",
          initialValue: "Phone number",
        }),
        defineField({
          name: "subjectPlaceholder_en",
          title: "Subject field placeholder",
          type: "string",
          initialValue: "Subject",
        }),
        defineField({
          name: "messagePlaceholder_en",
          title: "Message field placeholder",
          type: "string",
          initialValue: "Write a message",
        }),
        defineField({
          name: "buttonText_en",
          title: "Submit Button Text",
          type: "string",
          initialValue: "Send a Message",
        }),
        defineField({
          name: "successMessage_en",
          title: "Success Message",
          type: "string",
          initialValue: "Thank you! Your message has been sent.",
        }),
        defineField({
          name: "metaTitle_en",
          title: "Meta Title (SEO)",
          type: "string",
        }),
        defineField({
          name: "metaDescription_en",
          title: "Meta Description (SEO)",
          type: "text",
          rows: 2,
        }),
      ],
    }),

    defineField({
      name: "spanish",
      title: "🇪🇸 Spanish (ES)",
      type: "object",
      group: "spanish",
      fields: [
        defineField({
          name: "heroTitle_es",
          title: "Hero Title",
          type: "string",
          initialValue: "Contacto",
        }),
        defineField({
          name: "label_es",
          title: "Label (above title)",
          type: "string",
          initialValue: "ESCRIBE UN MENSAJE",
        }),
        defineField({
          name: "title_es",
          title: "Section Title",
          type: "string",
          initialValue: "Siempre Aquí Para Ayudarte",
        }),
        defineField({
          name: "description_es",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue: "¿Tienes una pregunta, comentario o sugerencia? ¡Nos encantaría saber de ti! Usa el formulario a continuación para ponerte en contacto con nosotros.",
        }),
        defineField({
          name: "namePlaceholder_es",
          title: "Name field placeholder",
          type: "string",
          initialValue: "Tu nombre",
        }),
        defineField({
          name: "emailPlaceholder_es",
          title: "Email field placeholder",
          type: "string",
          initialValue: "Correo electrónico",
        }),
        defineField({
          name: "phonePlaceholder_es",
          title: "Phone field placeholder",
          type: "string",
          initialValue: "Número de teléfono",
        }),
        defineField({
          name: "subjectPlaceholder_es",
          title: "Subject field placeholder",
          type: "string",
          initialValue: "Asunto",
        }),
        defineField({
          name: "messagePlaceholder_es",
          title: "Message field placeholder",
          type: "string",
          initialValue: "Escribe un mensaje",
        }),
        defineField({
          name: "buttonText_es",
          title: "Submit Button Text",
          type: "string",
          initialValue: "Enviar Mensaje",
        }),
        defineField({
          name: "successMessage_es",
          title: "Success Message",
          type: "string",
          initialValue: "¡Gracias! Tu mensaje ha sido enviado.",
        }),
        defineField({
          name: "metaTitle_es",
          title: "Meta Title (SEO)",
          type: "string",
        }),
        defineField({
          name: "metaDescription_es",
          title: "Meta Description (SEO)",
          type: "text",
          rows: 2,
        }),
      ],
    }),

    defineField({
      name: "arabic",
      title: "🇸🇦 Arabic (AR)",
      type: "object",
      group: "arabic",
      fields: [
        defineField({
          name: "heroTitle_ar",
          title: "Hero Title",
          type: "string",
          initialValue: "اتصل بنا",
        }),
        defineField({
          name: "label_ar",
          title: "Label (above title)",
          type: "string",
          initialValue: "اكتب رسالة",
        }),
        defineField({
          name: "title_ar",
          title: "Section Title",
          type: "string",
          initialValue: "نحن هنا دائمًا لمساعدتك",
        }),
        defineField({
          name: "description_ar",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue: "هل لديك سؤال أو تعليق أو اقتراح؟ نحن نحب أن نسمع منك! استخدم النموذج أدناه للتواصل معنا.",
        }),
        defineField({
          name: "namePlaceholder_ar",
          title: "Name field placeholder",
          type: "string",
          initialValue: "اسمك",
        }),
        defineField({
          name: "emailPlaceholder_ar",
          title: "Email field placeholder",
          type: "string",
          initialValue: "البريد الإلكتروني",
        }),
        defineField({
          name: "phonePlaceholder_ar",
          title: "Phone field placeholder",
          type: "string",
          initialValue: "رقم الهاتف",
        }),
        defineField({
          name: "subjectPlaceholder_ar",
          title: "Subject field placeholder",
          type: "string",
          initialValue: "الموضوع",
        }),
        defineField({
          name: "messagePlaceholder_ar",
          title: "Message field placeholder",
          type: "string",
          initialValue: "اكتب رسالة",
        }),
        defineField({
          name: "buttonText_ar",
          title: "Submit Button Text",
          type: "string",
          initialValue: "إرسال رسالة",
        }),
        defineField({
          name: "successMessage_ar",
          title: "Success Message",
          type: "string",
          initialValue: "شكراً لك! تم إرسال رسالتك.",
        }),
        defineField({
          name: "metaTitle_ar",
          title: "Meta Title (SEO)",
          type: "string",
        }),
        defineField({
          name: "metaDescription_ar",
          title: "Meta Description (SEO)",
          type: "text",
          rows: 2,
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page Settings" };
    },
  },
});
