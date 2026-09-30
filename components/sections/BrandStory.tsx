"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { motionVariants, sectionMotion } from "@/lib/utils";

export function BrandStory() {
  const reduceMotion = useReducedMotion() ?? undefined;
  const reveal = sectionMotion(reduceMotion);

  return (
    <section id="about" className="px-5 py-14 sm:px-8 md:px-10 md:py-20">
      <motion.div
        className="mx-auto grid w-full max-w-[1440px] gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14"
        variants={motionVariants.staggerChildren}
        {...reveal}
      >
        <motion.div variants={motionVariants.fadeUp}>
          <p className="text-xs font-semibold tracking-[0.13em] text-(--jm-muted)">
            ABOUT JM.CAP
          </p>
          <h2 className="mt-4 max-w-[580px] text-balance text-[clamp(2.1rem,4.5vw,4rem)] font-[680] leading-[1.02] tracking-[-0.03em] text-(--jm-text)">
            Pharmacy care, designed around people.
          </h2>
        </motion.div>

        <motion.div variants={motionVariants.fadeUp} className="space-y-8">
          <p className="max-w-[620px] text-[1.05rem] leading-[1.75] text-(--jm-muted)">
            JM.CAP Pharmacy is preparing a modern pharmacy experience designed to make trusted pharmaceutical care more accessible, convenient and personal.
          </p>

          <div className="relative overflow-hidden rounded-[2rem] border border-(--jm-border) bg-white p-6 shadow-[0_30px_65px_-42px_rgba(16,35,29,0.55)] sm:p-8">
            <div className="absolute -right-20 -top-16 h-52 w-52 rounded-full bg-(--jm-mint) blur-2xl" />
            <div className="relative grid gap-6 sm:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-(--jm-border) bg-[linear-gradient(145deg,#f7fcf9,#ecf6f2)] p-5">
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="h-12 rounded-lg border border-(--jm-border) bg-white/75" />
                  ))}
                </div>
              </div>

              <motion.div
                className="rounded-2xl border border-(--jm-border) bg-white p-4"
                variants={motionVariants.scaleIn}
              >
                <p className="text-sm font-semibold text-(--jm-text)">JM.CAP</p>
                <p className="text-sm font-semibold text-(--jm-text)">Pharmacy</p>
                <ul className="mt-4 space-y-2 text-xs text-(--jm-muted)">
                  <li>Care</li>
                  <li>Quality</li>
                  <li>Convenience</li>
                </ul>
                <Sparkles size={16} className="mt-4 text-(--jm-secondary)" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
