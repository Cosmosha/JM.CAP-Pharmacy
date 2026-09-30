"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { motionVariants, sectionMotion } from "@/lib/utils";

export function ComingSoon() {
  const reduceMotion = useReducedMotion() ?? undefined;
  const reveal = sectionMotion(reduceMotion);

  return (
    <section className="px-5 py-14 sm:px-8 md:px-10 md:py-20">
      <motion.div
        className="coming-soon relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.16)] bg-[linear-gradient(135deg,#0a4d3a_0%,#0b5d45_44%,#0f8766_100%)] p-6 text-white shadow-[0_52px_110px_-58px_rgba(8,52,38,0.9)] md:p-10"
        variants={motionVariants.staggerChildren}
        {...reveal}
      >
        <div className="absolute inset-0 opacity-35" aria-hidden="true" />
        <div className="absolute -left-20 top-8 h-56 w-56 rounded-full bg-[rgba(196,245,224,0.28)] blur-3xl" aria-hidden="true" />
        <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[rgba(152,226,197,0.22)] blur-3xl" aria-hidden="true" />

        <div className="relative max-w-[740px]">
          <motion.h2
            variants={motionVariants.fadeUp}
            className="text-balance text-[clamp(2rem,4.6vw,4rem)] font-[690] leading-[1.03] tracking-[-0.03em]"
          >
            Something Better Is Coming.
          </motion.h2>
          <motion.p variants={motionVariants.fadeUp} className="mt-5 text-[1.03rem] leading-[1.75] text-white/84">
            Our digital experience is currently being prepared. Stay connected with JM.CAP Pharmacy and be among the first to know when we launch.
          </motion.p>
          <motion.div variants={motionVariants.fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-(--jm-primary) transition-transform duration-300 hover:-translate-y-0.5"
            >
              Stay Connected
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/35 px-6 py-3.5 text-sm font-semibold text-white/95 transition-colors duration-300 hover:bg-white/10"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
