"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Sparkles, MessageCircle, Plus } from "lucide-react";
import { FloatingTrustCard } from "@/components/hero/FloatingTrustCard";

type PointerState = { x: number; y: number };

export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const [pointer, setPointer] = useState<PointerState>({ x: 0, y: 0 });

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[620px]"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      onMouseMove={(event) => {
        if (reduceMotion) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
        setPointer({ x, y });
      }}
      onMouseLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-(--jm-border) bg-[linear-gradient(155deg,#f7fcfa_0%,#e9f6ef_44%,#d3efe3_100%)] p-8 shadow-[0_60px_110px_-72px_rgba(8,52,38,0.9)] sm:p-10">
        <motion.div
          className="absolute inset-0 opacity-35"
          animate={
            reduceMotion
              ? undefined
              : {
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }
          }
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 18%, rgba(35,166,127,0.26), transparent 45%), radial-gradient(circle at 82% 72%, rgba(11,93,69,0.28), transparent 52%), linear-gradient(140deg, rgba(255,255,255,0.18), rgba(15,135,102,0.08))",
          }}
        />

        <motion.div
          className="relative grid gap-4"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: pointer.x,
                  y: pointer.y,
                }
          }
          transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.9 }}
        >
          <div className="grid grid-cols-3 gap-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="aspect-[3/2] rounded-xl border border-(--jm-border) bg-white/75"
              />
            ))}
          </div>

          <div className="rounded-2xl border border-(--jm-border) bg-white/90 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-(--jm-text)">Care Interface</p>
              <Sparkles size={16} className="text-(--jm-secondary)" />
            </div>
            <div className="space-y-2.5">
              <div className="h-2.5 w-5/6 rounded-full bg-(--jm-soft)" />
              <div className="h-2.5 w-2/3 rounded-full bg-(--jm-soft)" />
              <div className="h-2.5 w-3/4 rounded-full bg-(--jm-soft)" />
            </div>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute -left-7 top-10 hidden h-16 w-16 items-center justify-center rounded-full bg-white/75 text-(--jm-primary) shadow-[0_20px_50px_-35px_rgba(16,35,29,0.7)] sm:flex">
          <Plus size={22} />
        </div>
      </div>

      <div className="pointer-events-none absolute -left-5 top-[8%] hidden w-44 md:block">
        <FloatingTrustCard
          title="Trusted Care"
          text="Professional pharmacy support"
          Icon={ShieldCheck}
          duration={6}
          offset={6}
          delay={0.45}
        />
      </div>

      <div className="pointer-events-none absolute -right-6 top-[45%] hidden w-48 md:block">
        <FloatingTrustCard
          title="Quality First"
          text="Carefully selected healthcare products"
          Icon={Sparkles}
          duration={7}
          offset={8}
          delay={0.55}
        />
      </div>

      <div className="pointer-events-none absolute bottom-3 left-[22%] hidden w-48 md:block">
        <FloatingTrustCard
          title="Easy to Reach"
          text="Phone · WhatsApp · Online"
          Icon={MessageCircle}
          duration={5}
          offset={5}
          delay={0.65}
        />
      </div>
    </motion.div>
  );
}
