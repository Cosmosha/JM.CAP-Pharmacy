"use client";

import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
};

const linkAnim: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 bg-(--jm-soft)/98 px-6 pb-8 pt-6"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? {} : { opacity: 1 }}
          exit={reduceMotion ? {} : { opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto flex h-full max-w-lg flex-col">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm font-semibold tracking-[0.12em] text-(--jm-muted)">
                MENU
              </p>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--jm-border) bg-white text-(--jm-text)"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="space-y-3" aria-label="Mobile navigation">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  custom={index}
                  variants={reduceMotion ? undefined : linkAnim}
                  initial={reduceMotion ? false : "hidden"}
                  animate={reduceMotion ? {} : "visible"}
                  className="flex items-center justify-between rounded-2xl border border-(--jm-border) bg-white px-5 py-4 text-lg font-medium text-(--jm-text)"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={18} className="text-(--jm-primary)" />
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-(--jm-primary) px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(11,93,69,0.7)]"
              >
                Contact Us
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
