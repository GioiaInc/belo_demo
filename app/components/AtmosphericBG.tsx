"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { moodPalettes } from "@/lib/mockData";

// Deterministic star positions
const STARS = Array.from({ length: 40 }, (_, i) => ({
  x: ((i * 7919 + 104729) % 1000) / 10,
  y: ((i * 6271 + 83647) % 1000) / 10,
  size: 1 + (i % 3) * 0.4,
  twinkleDelay: (i % 8) * 0.7,
  twinkleDuration: 2.5 + (i % 4) * 0.8,
}));

interface AtmosphericBGProps {
  mood: number;
}

export default function AtmosphericBG({ mood }: AtmosphericBGProps) {
  const colors = useMemo(() => moodPalettes.getColors(mood), [mood]);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Sky base */}
      <motion.div
        className="absolute inset-0"
        animate={{ background: colors.sky }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      {/* Stars — behind clouds */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: colors.starOpacity }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        {STARS.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            animate={{ opacity: [0.2, 0.85, 0.2] }}
            transition={{
              duration: star.twinkleDuration,
              repeat: Infinity,
              delay: star.twinkleDelay,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* ===== CLOUD / FOG LAYERS ===== */}
      {/* Smaller, more diffuse, lower opacity — subtle atmospheric haze */}

      {/* Layer 1 — upper left haze */}
      <motion.div
        className="absolute"
        style={{
          width: 420,
          height: 220,
          borderRadius: "50%",
          filter: "blur(100px)",
          left: "-5%",
          top: "8%",
        }}
        animate={{
          backgroundColor: colors.cloudA,
          opacity: colors.fogOpacity,
          x: [0, 30, -15, 0],
          y: [0, -12, 8, 0],
        }}
        transition={{
          backgroundColor: { duration: 2.5, ease: "easeInOut" },
          opacity: { duration: 2.5, ease: "easeInOut" },
          x: { duration: 30, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 38, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Layer 2 — upper right */}
      <motion.div
        className="absolute"
        style={{
          width: 350,
          height: 180,
          borderRadius: "50%",
          filter: "blur(90px)",
          right: "0%",
          top: "15%",
        }}
        animate={{
          backgroundColor: colors.cloudB,
          opacity: colors.fogOpacity * 0.8,
          x: [0, -25, 18, 0],
          y: [0, 10, -8, 0],
        }}
        transition={{
          backgroundColor: { duration: 2.5, ease: "easeInOut" },
          opacity: { duration: 2.5, ease: "easeInOut" },
          x: { duration: 26, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 32, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Layer 3 — center, slightly larger */}
      <motion.div
        className="absolute"
        style={{
          width: 450,
          height: 280,
          borderRadius: "50%",
          filter: "blur(110px)",
          left: "10%",
          top: "35%",
        }}
        animate={{
          backgroundColor: colors.cloudC,
          opacity: colors.fogOpacity * 0.7,
          x: [0, 20, -25, 0],
          y: [0, -15, 18, 0],
        }}
        transition={{
          backgroundColor: { duration: 2.5, ease: "easeInOut" },
          opacity: { duration: 2.5, ease: "easeInOut" },
          x: { duration: 24, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 28, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Layer 4 — lower right */}
      <motion.div
        className="absolute"
        style={{
          width: 380,
          height: 200,
          borderRadius: "50%",
          filter: "blur(95px)",
          right: "-3%",
          bottom: "15%",
        }}
        animate={{
          backgroundColor: colors.cloudA,
          opacity: colors.fogOpacity * 0.65,
          x: [0, -18, 22, 0],
          y: [0, -10, 8, 0],
        }}
        transition={{
          backgroundColor: { duration: 2.5, ease: "easeInOut" },
          opacity: { duration: 2.5, ease: "easeInOut" },
          x: { duration: 22, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 34, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Layer 5 — bottom left wisp */}
      <motion.div
        className="absolute"
        style={{
          width: 320,
          height: 160,
          borderRadius: "50%",
          filter: "blur(85px)",
          left: "5%",
          bottom: "8%",
        }}
        animate={{
          backgroundColor: colors.cloudB,
          opacity: colors.fogOpacity * 0.55,
          x: [0, 28, -15, 0],
          y: [0, 8, -12, 0],
        }}
        transition={{
          backgroundColor: { duration: 2.5, ease: "easeInOut" },
          opacity: { duration: 2.5, ease: "easeInOut" },
          x: { duration: 28, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Subtle grain for texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
