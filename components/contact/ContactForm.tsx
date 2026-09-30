"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  ContactFormData,
  ContactFormErrors,
  validateContactForm,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
} from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

const initialForm: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  message: "",
  company: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const characterCount = useMemo(() => form.message.length, [form.message]);

  const setField = <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (key === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(String(value)) }));
    }

    if (key === "message") {
      setErrors((prev) => ({ ...prev, message: validateMessage(String(value)) }));
    }
  };

  const onBlur = (key: keyof ContactFormData) => {
    setTouched((prev) => ({ ...prev, [key]: true }));

    if (key === "name") {
      setErrors((prev) => ({ ...prev, name: validateName(form.name) }));
    }

    if (key === "phone") {
      setErrors((prev) => ({ ...prev, phone: validatePhone(form.phone) }));
    }

    if (key === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(form.email) }));
    }

    if (key === "message") {
      setErrors((prev) => ({ ...prev, message: validateMessage(form.message) }));
    }
  };

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors = validateContactForm(form);
    setErrors(nextErrors);
    setTouched({ name: true, phone: true, email: true, message: true });

    if (Object.values(nextErrors).some(Boolean)) return;

    try {
      setStatus("submitting");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed request");
      }

      setStatus("success");
      setForm(initialForm);
      setErrors({});
      setTouched({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-(--jm-border) bg-white p-5 shadow-[0_30px_70px_-48px_rgba(16,35,29,0.48)] sm:p-7">
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={(event) => setField("company", event.target.value)}
        className="sr-only"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-4">
        <Field
          id="name"
          label="Full Name *"
          value={form.name}
          onChange={(value) => setField("name", value)}
          onBlur={() => onBlur("name")}
          error={touched.name ? errors.name : ""}
          autoComplete="name"
        />

        <Field
          id="phone"
          label="Phone Number *"
          value={form.phone}
          onChange={(value) => setField("phone", value)}
          onBlur={() => onBlur("phone")}
          error={touched.phone ? errors.phone : ""}
          autoComplete="tel"
          placeholder="024XXXXXXX or +233XXXXXXXXX"
        />

        <Field
          id="email"
          label="Email Address *"
          type="email"
          value={form.email}
          onChange={(value) => setField("email", value)}
          onBlur={() => onBlur("email")}
          error={touched.email ? errors.email : ""}
          autoComplete="email"
          placeholder="name@example.com"
        />

        <label htmlFor="message" className="grid gap-1.5">
          <span className="text-sm font-medium text-(--jm-text)">Message *</span>
          <textarea
            id="message"
            value={form.message}
            onChange={(event) => setField("message", event.target.value)}
            onBlur={() => onBlur("message")}
            minLength={10}
            maxLength={2000}
            rows={6}
            className="w-full rounded-xl border border-(--jm-border) bg-(--jm-soft)/50 px-4 py-3 text-sm text-(--jm-text) outline-none transition-all duration-300 placeholder:text-(--jm-muted)/65 focus-visible:border-(--jm-secondary) focus-visible:shadow-[0_0_0_4px_rgba(14,128,96,0.12)]"
            placeholder="How can we help you?"
            required
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-red-600" role="alert">
              {touched.message ? errors.message : ""}
            </span>
            <span className="text-xs text-(--jm-muted)">{characterCount}/2000</span>
          </div>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-(--jm-primary) px-5 py-3.5 text-sm font-semibold text-white shadow-[0_20px_40px_-26px_rgba(11,93,69,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--jm-secondary) disabled:cursor-not-allowed disabled:opacity-80"
      >
        {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent ✓" : "Send Message"}
        {status === "submitting" ? null : (
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        )}
      </button>

      {status === "success" ? (
        <p className="mt-4 rounded-xl border border-(--jm-border) bg-(--jm-mint) px-4 py-3 text-sm text-(--jm-text)">
          Thank you for contacting JM.CAP Pharmacy. We've received your message and will get back to you shortly.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          We couldn't send your message. Please try again or contact us directly.
        </p>
      ) : null}
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  type?: "text" | "email";
  autoComplete?: string;
  placeholder?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  autoComplete,
  placeholder,
}: FieldProps) {
  return (
    <label htmlFor={id} className="grid gap-1.5">
      <span className="text-sm font-medium text-(--jm-text)">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        className="w-full rounded-xl border border-(--jm-border) bg-(--jm-soft)/50 px-4 py-3 text-sm text-(--jm-text) outline-none transition-all duration-300 placeholder:text-(--jm-muted)/65 focus-visible:border-(--jm-secondary) focus-visible:shadow-[0_0_0_4px_rgba(14,128,96,0.12)]"
      />
      <span className="text-xs text-red-600" role="alert">
        {error || ""}
      </span>
    </label>
  );
}
