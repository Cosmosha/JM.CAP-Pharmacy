"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, HeartPulse, MessageCircle, Pill, ShieldCheck } from "lucide-react";
import { motionVariants, sectionMotion } from "@/lib/utils";
import { serviceCards } from "@/lib/pharmacy-config";

const icons = [Pill, HeartPulse, ShieldCheck, MessageCircle];

export function Services() {
  const reduceMotion = useReducedMotion() ?? undefined;
  const reveal = sectionMotion(reduceMotion);

  return (
    <section id="services" className="px-5 py-14 sm:px-8 md:px-10 md:py-20">
      <motion.div className="mx-auto w-full max-w-[1440px]" variants={motionVariants.staggerChildren} {...reveal}>
        <motion.h2
          variants={motionVariants.fadeUp}
          className="max-w-[780px] text-balance text-[clamp(2rem,4.2vw,3.6rem)] font-[680] leading-[1.04] tracking-[-0.03em] text-(--jm-text)"
        >
          Built for Modern Wholesale Pharmacy Supply.
        </motion.h2>
        <motion.p
          variants={motionVariants.fadeUp}
          className="mt-5 max-w-[700px] text-[1.04rem] leading-[1.75] text-(--jm-muted)"
        >
          Explore a wholesale pharmacy experience shaped around dependable supply, product quality and responsive business support.
        </motion.p>

        <motion.div variants={motionVariants.staggerChildren} className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {serviceCards.map((card, index) => {
            const Icon = icons[index] ?? Pill;
            return (
              <motion.article
                key={card.id}
                variants={motionVariants.fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-(--jm-border) bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-(--jm-secondary)/45 hover:shadow-[0_28px_50px_-36px_rgba(16,35,29,0.48)]"
              >
                <span className="text-xs font-semibold tracking-[0.13em] text-(--jm-muted)">{card.id}</span>
                <div className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-(--jm-mint) text-(--jm-primary) transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-(--jm-text)">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-(--jm-muted)">{card.description}</p>
                <ArrowRight
                  size={17}
                  className="mt-6 text-(--jm-secondary) transition-transform duration-300 group-hover:translate-x-1"
                />
                <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-(--jm-mint) opacity-40 blur-2xl transition-opacity duration-300 group-hover:opacity-70" />
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
