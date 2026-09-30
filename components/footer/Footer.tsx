"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { pharmacyConfig } from "@/lib/pharmacy-config";
import { hasValue } from "@/lib/utils";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
];

const footerLinkClass =
  "group inline-flex items-center gap-1 rounded-full px-2 py-1 text-white/78 transition-all duration-300 hover:bg-white/8 hover:text-white focus-visible:bg-white/8";

const footerLinkUnderlineClass =
  "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,rgba(216,243,232,0.2),rgba(216,243,232,0.95),rgba(216,243,232,0.2))] transition-transform duration-300 group-hover:scale-x-100";

export function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const footerInView = useInView(footerRef, { amount: 0.2 });
  const socialEntries = Object.entries(pharmacyConfig.social).filter(([, value]) => hasValue(value));

  return (
    <footer ref={footerRef} className="relative bg-(--jm-footer) px-5 pb-28 pt-14 text-white sm:px-8 md:px-10 md:pb-16 md:pt-20">
      <motion.a
        href="#home"
        aria-label="Scroll back to hero section"
        title="Back to top"
        className="absolute right-5 top-0 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-(--jm-primary) text-white shadow-[0_22px_44px_-24px_rgba(8,52,38,0.85)] backdrop-blur-lg transition-all duration-300 hover:scale-[1.04] hover:bg-(--jm-secondary) md:right-10"
        initial={false}
        animate={
          footerInView
            ? { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" }
            : { opacity: 0, y: 16, scale: 0.96, pointerEvents: "none" }
        }
        transition={
          reduceMotion
            ? { duration: 0.15 }
            : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <ArrowUp size={15} />
      </motion.a>

      <motion.div
        className="mx-auto grid w-full max-w-360 gap-12 md:grid-cols-3"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12, delayChildren: 0.05 },
          },
        }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-bold text-(--jm-primary)">
              JM
            </span>
            <p className="text-base font-semibold">{pharmacyConfig.name}</p>
          </div>
          <p className="mt-4 max-w-75 text-base leading-relaxed text-white/80">
            Trusted pharmacy care, designed for today.
          </p>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <p className="text-sm font-semibold tracking-[0.13em] text-white/65">CONTACT</p>
          <div className="mt-4 space-y-2 text-sm text-white/88">
            {pharmacyConfig.phone ? <p>{pharmacyConfig.phone}</p> : null}
            {pharmacyConfig.email ? <p>{pharmacyConfig.email}</p> : null}
            {pharmacyConfig.address || pharmacyConfig.physicalAddress ? (
              <p>{pharmacyConfig.address || pharmacyConfig.physicalAddress}</p>
            ) : null}
            {pharmacyConfig.openingHours ? <p>{pharmacyConfig.openingHours}</p> : null}
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <p className="text-sm font-semibold tracking-[0.13em] text-white/65">QUICK LINKS</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`${footerLinkClass} justify-start text-sm`}
              >
                <span className="relative">
                  {link.label}
                  <span className={footerLinkUnderlineClass} />
                </span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </div>
          {socialEntries.length > 0 ? (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialEntries.map(([name, value]) => (
                <a
                  key={name}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${footerLinkClass} text-xs uppercase tracking-[0.12em]`}
                >
                  <span className="relative">
                    {name}
                    <span className={footerLinkUnderlineClass} />
                  </span>
                  <ArrowUpRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          ) : null}
        </motion.div>
      </motion.div>

      <motion.div
        className="mx-auto mt-12 w-full max-w-360 border-t border-white/15 pt-5 text-sm text-white/68"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© 2026 JM.CAP Pharmacy. All rights reserved.</p>
          <p className="text-white/58">
            Powered by:{" "}
            <a
              href="https://menosofts.com"
              target="_blank"
              rel="noopener noreferrer"
              className={footerLinkClass}
            >
              <span className="relative">
                Menosoft Technology
                <span className={footerLinkUnderlineClass} />
              </span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
