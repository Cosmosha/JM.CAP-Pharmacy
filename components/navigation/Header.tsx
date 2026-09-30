"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, ArrowUpRight } from "lucide-react";
import { pharmacyConfig } from "@/lib/pharmacy-config";
import { MobileMenu } from "@/components/navigation/MobileMenu";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="sticky top-3 z-40 px-5 sm:px-8 md:px-10"
        initial={reduceMotion ? false : { opacity: 0, y: -14 }}
        animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={[
            "mx-auto flex w-full max-w-[1440px] items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-500 sm:px-6",
            scrolled
              ? "border-(--jm-border) bg-white/85 shadow-[0_20px_50px_-30px_rgba(16,35,29,0.45)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          ].join(" ")}
        >
          <a href="#home" className="flex items-center gap-3 text-(--jm-text)">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-(--jm-primary) text-sm font-bold text-white">
              JM
            </span>
            <span className="text-sm font-semibold tracking-tight sm:text-base">
              {pharmacyConfig.name}
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-(--jm-muted) transition-colors hover:text-(--jm-text)"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="group hidden items-center gap-1.5 rounded-xl bg-(--jm-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_38px_-24px_rgba(11,93,69,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--jm-secondary) md:inline-flex"
          >
            Contact Us
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-(--jm-border) bg-white text-(--jm-text) md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
    </>
  );
}
