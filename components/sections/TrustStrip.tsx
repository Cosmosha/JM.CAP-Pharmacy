"use client";

import { motion, useReducedMotion } from "framer-motion";
import { trustPillars } from "@/lib/pharmacy-config";
import { motionVariants, sectionMotion } from "@/lib/utils";

export function TrustStrip() {
  const reduceMotion = useReducedMotion() ?? undefined;
  const reveal = sectionMotion(reduceMotion);

  return (
    <section className="px-5 pb-12 sm:px-8 md:px-10 md:pb-16">
      <motion.div
        className="mx-auto grid w-full max-w-[1440px] gap-3 rounded-3xl border border-(--jm-border) bg-white p-4 shadow-[0_22px_55px_-42px_rgba(16,35,29,0.6)] sm:grid-cols-2 sm:p-6 lg:grid-cols-4"
        variants={motionVariants.staggerChildren}
        {...reveal}
      >
        {trustPillars.map((item, index) => (
          <motion.div
            key={item}
            variants={motionVariants.fadeUp}
            className="rounded-2xl border border-(--jm-border) bg-(--jm-soft)/70 p-4"
          >
            <p className="text-xs font-semibold tracking-[0.13em] text-(--jm-muted)">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 text-sm font-semibold text-(--jm-text)">{item}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
