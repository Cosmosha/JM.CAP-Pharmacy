"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motionVariants, sectionMotion } from "@/lib/utils";

const benefits = [
  {
    id: "01",
    title: "Reliable Supply",
    text: "A wholesale approach focused on consistency, product quality and dependable availability.",
  },
  {
    id: "02",
    title: "Responsive",
    text: "Reach JM.CAP through convenient communication channels for enquiries, orders and follow-up.",
  },
  {
    id: "03",
    title: "Business-Focused",
    text: "A modern wholesale pharmacy experience designed around today's healthcare and trade partners.",
  },
];

export function WhyJMCAP() {
  const reduceMotion = useReducedMotion() ?? undefined;
  const reveal = sectionMotion(reduceMotion);

  return (
    <section className="px-5 py-14 sm:px-8 md:px-10 md:py-20">
      <motion.div
        className="mx-auto grid w-full max-w-[1440px] gap-10 rounded-3xl border border-(--jm-border) bg-white p-6 shadow-[0_28px_65px_-44px_rgba(16,35,29,0.52)] md:p-10 lg:grid-cols-[1fr_1fr]"
        variants={motionVariants.staggerChildren}
        {...reveal}
      >
        <motion.div variants={motionVariants.slideRight}>
          <h2 className="max-w-[560px] text-balance text-[clamp(2rem,4.2vw,3.8rem)] font-[680] leading-[1.06] tracking-[-0.03em] text-(--jm-text)">
            Reliable supply. Professional standards. A wholesale pharmacy experience built for today.
          </h2>
        </motion.div>

        <motion.div variants={motionVariants.staggerChildren} className="space-y-5">
          {benefits.map((item) => (
            <motion.article
              key={item.id}
              variants={motionVariants.slideLeft}
              className="rounded-2xl border border-(--jm-border) bg-(--jm-soft)/70 p-5"
            >
              <p className="text-xs font-semibold tracking-[0.13em] text-(--jm-muted)">{item.id}</p>
              <h3 className="mt-2 text-lg font-semibold text-(--jm-text)">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-(--jm-muted)">{item.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
