import type { Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export const motionVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.65, ease: EASE } },
  } satisfies Variants,
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  } satisfies Variants,
  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: EASE },
    },
  } satisfies Variants,
  slideLeft: {
    hidden: { opacity: 0, x: 18 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  } satisfies Variants,
  slideRight: {
    hidden: { opacity: 0, x: -18 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  } satisfies Variants,
  staggerChildren: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.12,
      },
    },
  } satisfies Variants,
};

export function sectionMotion(disableMotion?: boolean) {
  if (disableMotion) {
    return {
      initial: false,
      whileInView: undefined,
      viewport: undefined,
    };
  }

  return {
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.22 },
  };
}

export function normalizePhone(phone: string) {
  return phone.replace(/[\s()\-]/g, "");
}

export function formatWhatsAppUrl(number: string, message: string) {
  if (!number) return "";

  const digits = number.replace(/[^\d]/g, "");
  if (!digits) return "";

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function hasValue(value: string | undefined | null) {
  return Boolean(value && value.trim().length > 0);
}

export function getPreferredCallPhone(localPhone: string, internationalPhone: string) {
  if (typeof window === "undefined") {
    return internationalPhone;
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const languages = [navigator.language, ...(navigator.languages ?? [])]
    .filter(Boolean)
    .map((value) => value.toLowerCase());

  const isGhanaUser =
    timeZone === "Africa/Accra" || languages.some((value) => value.includes("-gh"));

  return isGhanaUser ? localPhone : internationalPhone;
}
