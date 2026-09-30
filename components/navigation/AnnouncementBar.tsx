"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pharmacyStatusText } from "@/lib/pharmacy-config";

export function AnnouncementBar() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-b border-(--jm-border) bg-(--jm-soft)/90">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-2 px-5 py-2 text-xs text-(--jm-muted) sm:px-8 md:px-10">
        <p className="text-balance">{pharmacyStatusText}</p>
        <div className="flex items-center gap-2 font-medium text-(--jm-text)">
          <motion.span
            className="inline-flex h-2.5 w-2.5 rounded-full bg-(--jm-primary)"
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.1, 1],
                  }
            }
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <span>Now preparing</span>
        </div>
      </div>
    </div>
  );
}
