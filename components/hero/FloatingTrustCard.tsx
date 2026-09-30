"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type FloatingTrustCardProps = {
  title: string;
  text: string;
  Icon: LucideIcon;
  duration: number;
  offset: number;
  delay?: number;
  className?: string;
};

export function FloatingTrustCard({
  title,
  text,
  Icon,
  duration,
  offset,
  delay = 0,
  className = "",
}: FloatingTrustCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={[
        "rounded-2xl border border-(--jm-border) bg-white/95 p-4 shadow-[0_26px_60px_-44px_rgba(16,35,29,0.58)] backdrop-blur-sm",
        className,
      ].join(" ")}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={
        reduceMotion
          ? { opacity: 1, y: 0 }
          : {
              opacity: 1,
              y: [0, -offset, 0],
            }
      }
      transition={
        reduceMotion
          ? { duration: 0.3 }
          : {
              opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
              y: {
                duration,
                ease: "easeInOut",
                repeat: Infinity,
                delay,
              },
            }
      }
    >
      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-(--jm-mint) text-(--jm-primary)">
        <Icon size={16} />
      </div>
      <h3 className="text-sm font-semibold text-(--jm-text)">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-(--jm-muted)">{text}</p>
    </motion.div>
  );
}
