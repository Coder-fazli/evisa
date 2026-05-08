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

async function completeEnglish() {
  try {
    console.log("📝 Completing English content...\n");

    // Get existing English homePage
    const homePage = await client.fetch(`*[_type == "homePage" && language == "en"][0]{ _id }`);

    if (!homePage) {
      console.log("❌ English homePage not found, creating...");
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
            description: "Fill out our secure application form in just a few minutes from any device.",
            color: "#E8671A",
          },
          {
            title: "Secure Payment",
            description: "Pay the processing fee securely using your credit card or other payment methods.",
            color: "#3b82f6",
          },
          {
            title: "Get your e-Visa",
            description: "Receive your official Azerbaijan e-Visa directly to your email once approved.",
            color: "#10b981",
          },
        ],
        faqs: [
          {
            question: "Who is eligible for the Azerbaijan e-Visa?",
            answer: "Citizens of over 100 countries are eligible to apply for the Azerbaijan e-Visa online. You can check eligibility by selecting your nationality on our application page. Most European, North American, and Asian passport holders qualify.",
          },
          {
            question: "How long does it take to get an Azerbaijan e-Visa?",
            answer: "Standard processing takes 3 business days. If you need your visa sooner, our urgent processing option delivers your approved e-Visa in just 3 hours for an additional fee.",
          },
          {
            question: "How much does the Azerbaijan e-Visa cost?",
            answer: "The standard e-Visa fee is $69 USD, which includes all government and processing charges. Urgent processing is available for an additional fee. Payment is accepted via all major credit and debit cards.",
          },
          {
            question: "How long can I stay in Azerbaijan with an e-Visa?",
            answer: "The Azerbaijan e-Visa allows a single entry with a maximum stay of 30 days. The visa is valid for 90 days from the date of issue, so you must enter Azerbaijan within that 90-day window.",
          },
          {
            question: "What documents do I need to apply?",
            answer: "You need a valid passport with at least 6 months of validity beyond your intended stay, a digital passport-sized photo with a white background, a valid email address, and a credit or debit card for payment.",
          },
          {
            question: "Can I extend my Azerbaijan e-Visa?",
            answer: "The Azerbaijan e-Visa cannot be extended online. If you wish to stay longer, you must apply for a new visa or contact the State Migration Service of Azerbaijan directly.",
          },
        ],
      });
      console.log("✅ Created complete English homePage\n");
    } else {
      console.log("✅ English homePage exists\n");
      console.log("Updating with complete FAQs...");
      await client
        .patch(homePage._id)
        .set({
          faqs: [
            {
              question: "Who is eligible for the Azerbaijan e-Visa?",
              answer: "Citizens of over 100 countries are eligible to apply for the Azerbaijan e-Visa online. You can check eligibility by selecting your nationality on our application page.",
            },
            {
              question: "How long does it take to get an Azerbaijan e-Visa?",
              answer: "Standard processing takes 3 business days. If you need your visa sooner, our urgent processing option delivers in just 3 hours.",
            },
            {
              question: "How much does the Azerbaijan e-Visa cost?",
              answer: "The standard e-Visa fee is $69 USD, which includes all government and processing charges. Urgent processing available for additional fee.",
            },
            {
              question: "How long can I stay in Azerbaijan with an e-Visa?",
              answer: "The Azerbaijan e-Visa allows a single entry with a maximum stay of 30 days. Valid for 90 days from date of issue.",
            },
            {
              question: "What documents do I need to apply?",
              answer: "You need a valid passport with 6+ months validity, digital passport photo, valid email, and credit/debit card for payment.",
            },
            {
              question: "Can I extend my Azerbaijan e-Visa?",
              answer: "The Azerbaijan e-Visa cannot be extended online. You must apply for a new visa if you wish to stay longer.",
            },
          ],
        })
        .commit();
      console.log("✅ Updated English homePage with complete FAQs\n");
    }

    console.log("✨ Complete!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

completeEnglish();
