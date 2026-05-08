"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import styles from "./ContactForm.module.css";

interface ContactFormProps {
  namePlaceholder?: string;
  emailPlaceholder?: string;
  phonePlaceholder?: string;
  subjectPlaceholder?: string;
  messagePlaceholder?: string;
  buttonText?: string;
  successMessage?: string;
}

export function ContactForm({
  namePlaceholder = "Your name",
  emailPlaceholder = "Email address",
  phonePlaceholder = "Phone number",
  subjectPlaceholder = "Subject",
  messagePlaceholder = "Write a message",
  buttonText = "Send a Message",
  successMessage = "Thank you! Your message has been sent.",
}: ContactFormProps) {
  const [num1] = useState(() => Math.floor(Math.random() * 9) + 1);
  const [num2] = useState(() => Math.floor(Math.random() * 9) + 1);
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (Number(captcha) !== num1 + num2) {
      setError("Incorrect captcha. Please try again.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1000);
  };

  if (success) {
    return (
      <div className={styles.successBox}>
        <p>{successMessage}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input
          type="text"
          name="name"
          placeholder={namePlaceholder}
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder={emailPlaceholder}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.row}>
        <input
          type="tel"
          name="phone"
          placeholder={phonePlaceholder}
          className={styles.input}
        />
        <input
          type="text"
          name="subject"
          placeholder={subjectPlaceholder}
          className={styles.input}
          required
        />
      </div>

      <textarea
        name="message"
        placeholder={messagePlaceholder}
        className={styles.textarea}
        rows={6}
        required
      />

      <div className={styles.captchaRow}>
        <label className={styles.captchaLabel}>
          {num1} + {num2} =
        </label>
        <input
          type="number"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          className={styles.captchaInput}
          required
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.submitButton} disabled={submitting}>
        {submitting ? "Sending..." : buttonText}
        <Send size={16} />
      </button>
    </form>
  );
}
