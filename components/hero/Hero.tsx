"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { getPreferredCallPhone, motionVariants } from "@/lib/utils";
import { pharmacyConfig } from "@/lib/pharmacy-config";

export function Hero() {
  const reduceMotion = useReducedMotion();
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
    <section id="home" className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-8 md:px-10 md:pb-20 md:pt-14">
      <div className="hero-grid absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <div className="hero-glow absolute -top-24 right-0 -z-10 h-[420px] w-[420px] rounded-full" aria-hidden="true" />
      <div className="hero-organic absolute left-[-10rem] top-[45%] -z-10 h-[340px] w-[340px] rounded-full" aria-hidden="true" />

      <div className="mx-auto grid min-h-[85vh] w-full max-w-[1440px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <motion.div
          variants={motionVariants.staggerChildren}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? {} : "visible"}
          className="max-w-[620px]"
        >
          <motion.div
            variants={motionVariants.fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-(--jm-border) bg-white/85 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-(--jm-muted)"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-(--jm-primary)" aria-hidden="true" />
            COMING SOON
          </motion.div>

          <motion.h1
            variants={motionVariants.fadeUp}
            className="text-balance text-[clamp(3rem,6vw,6.5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-(--jm-text)"
          >
            A New Standard for
            <span className="block text-(--jm-primary)">Modern Pharmacy Care.</span>
          </motion.h1>

          <motion.p
            variants={motionVariants.fadeUp}
            className="mt-6 max-w-[560px] text-pretty text-[clamp(1rem,1.5vw,1.18rem)] leading-[1.7] text-(--jm-muted)"
          >
            JM.CAP Pharmacy is preparing a modern wholesale pharmacy experience built around trusted pharmaceutical supply, quality products and responsive business support.
          </motion.p>

          <motion.div variants={motionVariants.fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-(--jm-primary) px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_40px_-24px_rgba(11,93,69,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--jm-secondary) active:scale-[0.985]"
            >
              Contact JM.CAP Pharmacy
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            {pharmacyConfig.phone ? (
              <a
                href={callHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-(--jm-border) bg-white px-6 py-3.5 text-sm font-semibold text-(--jm-text) transition-all duration-300 hover:bg-(--jm-mint) active:scale-[0.985]"
              >
                <Phone size={16} />
                Call Pharmacy
              </a>
            ) : (
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-(--jm-border) bg-white px-6 py-3.5 text-sm font-semibold text-(--jm-text) transition-all duration-300 hover:bg-(--jm-mint) active:scale-[0.985]"
              >
                <Phone size={16} />
                Call Pharmacy
              </a>
            )}
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
}
