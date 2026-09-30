"use client";

import { useEffect, useState } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { pharmacyConfig } from "@/lib/pharmacy-config";
import { formatWhatsAppUrl, getPreferredCallPhone } from "@/lib/utils";

const whatsappMessage = "Hello JM.CAP Pharmacy, I would like to make an enquiry.";

export function MobileActionBar() {
  const whatsappUrl = formatWhatsAppUrl(pharmacyConfig.whatsapp, whatsappMessage);
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

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-(--jm-border) bg-white/96 px-4 py-3 shadow-[0_-12px_40px_-28px_rgba(16,35,29,0.55)] backdrop-blur-lg md:hidden" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}>
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-2">
        <a
          href={pharmacyConfig.phone ? callHref : "#contact"}
          className="inline-flex items-center justify-center gap-1 rounded-xl border border-(--jm-border) px-3 py-2.5 text-xs font-semibold text-(--jm-text)"
        >
          <Phone size={14} />
          Call
        </a>
        <a
          href={whatsappUrl || "#contact"}
          target={whatsappUrl ? "_blank" : undefined}
          rel={whatsappUrl ? "noopener noreferrer" : undefined}
          className="inline-flex items-center justify-center gap-1 rounded-xl border border-(--jm-border) px-3 py-2.5 text-xs font-semibold text-(--jm-text)"
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-1 rounded-xl bg-(--jm-primary) px-3 py-2.5 text-xs font-semibold text-white"
        >
          <Mail size={14} />
          Enquire
        </a>
      </div>
    </div>
  );
}
