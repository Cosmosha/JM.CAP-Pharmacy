import { normalizePhone } from "@/lib/utils";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE_REGEX = /^\+?[0-9\s()\-]{7,20}$/;

export type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
  company?: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export function sanitizeText(value: string) {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

function isLikelyLocalGhanaNumber(value: string) {
  return /^(0(24|54|50)\d{7}|\+233(24|54|50)\d{7})$/.test(value);
}

export function validateName(name: string) {
  const value = sanitizeText(name);
  if (!value) return "Full name is required.";
  if (value.length < 2) return "Please enter at least 2 characters.";
  if (value.length > 120) return "Name is too long.";
  return "";
}

export function validatePhone(phone: string) {
  const value = phone.trim();
  if (!value) return "Phone number is required.";
  if (!PHONE_REGEX.test(value)) {
    return "Please enter a valid phone number.";
  }

  const normalized = normalizePhone(value);
  const digitsOnly = normalized.replace(/^\+/, "");

  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return "Please use a valid international phone format.";
  }

  if (normalized.startsWith("0") || normalized.startsWith("+233")) {
    if (!isLikelyLocalGhanaNumber(normalized)) {
      return "Use formats like 024XXXXXXX, 054XXXXXXX, 050XXXXXXX, or +233XXXXXXXXX.";
    }
  }

  return "";
}

export function validateEmail(email: string) {
  const value = email.trim();
  if (!value) return "Email address is required.";
  if (!EMAIL_REGEX.test(value)) return "Please enter a valid email address.";
  return "";
}

export function validateMessage(message: string) {
  const value = message.trim();
  if (!value) return "Message is required.";
  if (value.length < 10) return "Message should be at least 10 characters.";
  if (value.length > 2000) return "Message must be 2000 characters or fewer.";
  return "";
}

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const messageError = validateMessage(data.message);
  if (messageError) errors.message = messageError;

  if (data.company && data.company.trim().length > 0) {
    errors.company = "Invalid request.";
  }

  return errors;
}
