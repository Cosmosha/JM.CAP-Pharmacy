"use client";

import { useEffect, useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { pharmacyConfig } from "@/lib/pharmacy-config";
import { formatWhatsAppUrl, getPreferredCallPhone, hasValue } from "@/lib/utils";

const whatsappMessage = "Hello JM.CAP Pharmacy, I would like to make an enquiry.";

export function ContactInformation() {
  const [callHref, setCallHref] = useState(
    `tel:${pharmacyConfig.callPhoneInternational}`,
  );

  useEffect(() => {
    setCallHref(
      `tel:${getPreferredCallPhone(
        pharmacyConfig.callPhoneLocal,
        pharmacyConfig.callPhoneInternational,
      )}`,
    );
  }, []);

  const items = [
    {
      title: "Phone",
      label: "Call us",
      value: pharmacyConfig.phone,
      href: pharmacyConfig.phone ? callHref : "",
      Icon: Phone,
    },
    {
      title: "WhatsApp",
      label: "Chat on WhatsApp",
      value: pharmacyConfig.whatsapp,
      href: formatWhatsAppUrl(pharmacyConfig.whatsapp, whatsappMessage),
      Icon: MessageCircle,
    },
    {
      title: "Email",
      label: "Email us",
      value: pharmacyConfig.email,
      href: pharmacyConfig.email ? `mailto:${pharmacyConfig.email}` : "",
      Icon: Mail,
    },
    {
      title: "Location",
      label: "Visit us",
      value: pharmacyConfig.address || pharmacyConfig.physicalAddress,
      href: "",
      Icon: MapPin,
    },
  ] as const;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(({ title, label, value, href, Icon }) => {
        const hasData = hasValue(value);
        return (
          <article
            key={title}
            className="rounded-2xl border border-(--jm-border) bg-white p-4 shadow-[0_16px_40px_-34px_rgba(16,35,29,0.5)]"
          >
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-(--jm-mint) text-(--jm-primary)">
              <Icon size={17} />
            </div>
            <p className="text-xs font-semibold tracking-widest text-(--jm-muted)">{title}</p>
            <p className="mt-1 text-sm font-medium text-(--jm-text)">{label}</p>
            {hasData ? (
              href ? (
                <a
                  href={href}
                  className="mt-2 inline-block text-sm text-(--jm-primary) underline-offset-4 hover:underline"
                  target={title === "WhatsApp" ? "_blank" : undefined}
                  rel={title === "WhatsApp" ? "noopener noreferrer" : undefined}
                >
                  {value}
                </a>
              ) : (
                <p className="mt-2 text-sm text-(--jm-muted)">{value}</p>
              )
            ) : (
              <p className="mt-2 text-sm text-(--jm-muted)">Available soon</p>
            )}
          </article>
        );
      })}
    </div>
  );
}
