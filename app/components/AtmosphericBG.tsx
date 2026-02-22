"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useMemo } from "react";
import { moodPalettes } from "@/lib/mockData";

interface AtmosphericBGProps {
  mood: number; // 0-1
}

export default function AtmosphericBG({ mood }: AtmosphericBGProps) {
  const colors = useMemo(() => moodPalettes.getColors(mood), [mood]);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `linear-gradient(160deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.primary} 100%)`,
        }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      {/* Cloud blob 1 - large, slow */}
      <motion.div
        className="absolute rounded-full blur-[80px]"
        style={{
          width: 350,
          height: 350,
          left: -50,
          top: "20%",
        }}
        animate={{
          background: `radial-gradient(circle, ${colors.accent}${Math.round(colors.cloudOpacity * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          background: { duration: 2.5, ease: "easeInOut" },
          x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 15, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Cloud blob 2 - medium, drifting right */}
      <motion.div
        className="absolute rounded-full blur-[60px]"
        style={{
          width: 280,
          height: 280,
          right: -40,
          top: "40%",
        }}
        animate={{
          background: `radial-gradient(circle, ${colors.secondary}${Math.round(colors.cloudOpacity * 0.8 * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          x: [0, -25, 15, 0],
          y: [0, 30, -25, 0],
        }}
        transition={{
          background: { duration: 2.5, ease: "easeInOut" },
          x: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 11, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Cloud blob 3 - small, top */}
      <motion.div
        className="absolute rounded-full blur-[50px]"
        style={{
          width: 200,
          height: 200,
          left: "30%",
          top: "10%",
        }}
        animate={{
          background: `radial-gradient(circle, ${colors.accent}${Math.round(colors.cloudOpacity * 0.6 * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          x: [0, 20, -30, 0],
          y: [0, 15, -10, 0],
        }}
        transition={{
          background: { duration: 2.5, ease: "easeInOut" },
          x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 13, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Cloud blob 4 - bottom, moody */}
      <motion.div
        className="absolute rounded-full blur-[70px]"
        style={{
          width: 300,
          height: 250,
          left: "10%",
          bottom: "5%",
        }}
        animate={{
          background: `radial-gradient(circle, ${colors.accent}${Math.round(colors.cloudOpacity * 0.5 * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          x: [0, -15, 25, 0],
          y: [0, -20, 10, 0],
        }}
        transition={{
          background: { duration: 2.5, ease: "easeInOut" },
          x: { duration: 16, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Subtle noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
