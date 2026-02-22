"use client";

import { motion } from "framer-motion";
import type { Insight } from "@/lib/mockData";

export default function MoodInsight({
  insight,
  onContinue,
}: {
  insight: Insight;
  onContinue: () => void;
}) {
  const color = getMoodColor(insight.mood);

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Dim backdrop */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Card */}
      <motion.div
        className="relative rounded-3xl backdrop-blur-2xl w-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 100%)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow:
            "0 12px 48px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.12)",
          padding: "28px 24px 22px",
          maxWidth: 340,
        }}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Header label */}
        <p className="text-[11px] text-white/40 uppercase tracking-widest mb-3">
          AI Mood Detection
        </p>

        {/* Mood label */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="rounded-full"
            style={{
              width: 12,
              height: 12,
              background: color,
              boxShadow: `0 0 10px ${color}, 0 0 20px ${color}40`,
            }}
          />
          <span className="text-[18px] text-white/90 font-semibold tracking-wide uppercase">
            {insight.mood}
          </span>
        </div>

        {/* Signal pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {insight.signals.map((signal) => (
            <span
              key={signal}
              className="text-[12px] text-white/65 rounded-full"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "5px 14px",
              }}
            >
              {signal}
            </span>
          ))}
        </div>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className="w-full rounded-xl text-[14px] text-white/80 font-medium"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "12px 0",
          }}
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  );
}

function getMoodColor(mood: string): string {
  switch (mood) {
    case "warm":
      return "#E8A050";
    case "withdrawn":
      return "#8B9CC7";
    case "low":
      return "#5B7FA5";
    case "distressed":
      return "#C75050";
    case "supportive":
      return "#7BC77B";
    default:
      return "#A080C0";
  }
}
