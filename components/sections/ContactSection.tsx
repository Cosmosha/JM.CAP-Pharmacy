"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ContactInformation } from "@/components/contact/ContactInformation";
import { ContactForm } from "@/components/contact/ContactForm";
import { motionVariants, sectionMotion } from "@/lib/utils";

export function ContactSection() {
  const reduceMotion = useReducedMotion() ?? undefined;
  const reveal = sectionMotion(reduceMotion);

  return (
    <section id="contact" className="px-5 py-14 sm:px-8 md:px-10 md:py-20">
      <motion.div
        className="mx-auto grid w-full max-w-[1440px] gap-10 rounded-[2rem] border border-(--jm-border) bg-(--jm-soft) p-6 md:p-10 lg:grid-cols-[1fr_1fr]"
        variants={motionVariants.staggerChildren}
        {...reveal}
      >
        <motion.div variants={motionVariants.fadeUp}>
          <p className="text-xs font-semibold tracking-[0.13em] text-(--jm-muted)">LET'S CONNECT</p>
          <h2 className="mt-4 max-w-[520px] text-balance text-[clamp(2rem,4.4vw,3.8rem)] font-[680] leading-[1.04] tracking-[-0.03em] text-(--jm-text)">
            Have a question? We're here to help.
          </h2>
          <p className="mt-5 max-w-[560px] text-[1.03rem] leading-[1.75] text-(--jm-muted)">
            Reach JM.CAP Pharmacy directly or send us a message and our team will get back to you.
          </p>
          <div className="mt-8">
            <ContactInformation />
          </div>
        </motion.div>

        <motion.div variants={motionVariants.fadeUp}>
          <ContactForm />
        </motion.div>
      </motion.div>
    </section>
  );
}
