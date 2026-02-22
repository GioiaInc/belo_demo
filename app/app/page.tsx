"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { outerRingContacts, centerGroup, userAvatar } from "@/lib/mockData";

// =============================================
// OUTER RING — angles in degrees, clockwise from top
// Order: Person 2, 3, 6, 5, 4, 1
// =============================================
const outerAngles = [270, 330, 30, 90, 150, 210];

// =============================================
// SIZE CONTROLS — fractions of viewport width
// e.g. 0.27 on a 430px screen = ~116px
// =============================================
const CENTER_GROUP_SCALE = 0.52;   // center pair (Group 227) width
const VECTOR_RING_SCALE = 0.95;    // organic vector outlines — scales relative to viewport width
const USER_AVATAR_SCALE = 0.27;    // bottom-left user profile
const FAB_SCALE = 0.14;            // bottom-right + button

// Per-avatar scale — one for each outer ring position
// Order: [top, top-right, bottom-right, bottom, bottom-left, top-left]
// Names: [Person 2/Saeed, Person 3/Timur, Person 6/Leila, Person 5/Zarina, Person 4/Bekzat, Person 1/Aisha]
const OUTER_AVATAR_SCALES = [
  0.24,  // top        — Person 2 (Saeed)
  0.27,  // top-right  — Person 3 (Timur)
  0.23,  // bot-right  — Person 6 (Leila)
  0.25,  // bottom     — Person 5 (Zarina)
  0.25,  // bot-left   — Person 4 (Bekzat)
  0.25,  // top-left   — Person 1 (Aisha)
];

// Per-avatar radius offset — pushes each avatar closer (negative) or further (positive) from center
// 0 = sits exactly on the orbit circle. 0.05 = 5% of viewport width further out. -0.05 = closer in.
const OUTER_AVATAR_RADIUS_OFFSETS = [
  0.00,  // top        — Person 2 (Saeed)
  0.00,  // top-right  — Person 3 (Timur)
  0.00,  // bot-right  — Person 6 (Leila)
  0.00,  // bottom     — Person 5 (Zarina)
  0.00,  // bot-left   — Person 4 (Bekzat)
  0.00,  // top-left   — Person 1 (Aisha)
];

// =============================================
// ORBIT SHAPE — adjust to make more/less circular
// Higher ORBIT_RADIUS = bigger orbit
// ORBIT_ROUNDNESS: 1.0 = perfect circle, <1 = taller oval, >1 = wider oval
// =============================================
const ORBIT_RADIUS = 0.40;      // base radius as fraction of viewport width
const ORBIT_ROUNDNESS = 0.85;   // 1.0 = circle. <1 = taller. Current: slightly tall oval

// =============================================
// SPACING
// =============================================
const HEADER_TOP_PAD = 32;      // px from top of screen to header
const HEADER_SIDE_PAD = 28;     // px left/right padding on header
const BOTTOM_SIDE_PAD = 28;     // px left/right padding on bottom bar
const BOTTOM_PAD = 28;          // px from bottom edge
const BELO_FONT_SIZE = 34;      // px — belo logo size

// =============================================
// ANIMATION
// =============================================
const VECTOR_RING_ROTATE = true;        // set false to disable rotation
const VECTOR_RING_ROTATE_SPEED = 120;    // seconds per full rotation (higher = slower)
// =============================================

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 430, h: 700 });
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDims({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleContactTap = (contactId: string) => {
    setExiting(true);
    setTimeout(() => router.push(`/chat/${contactId}`), 350);
  };

  // Ellipse geometry — derived from controls above
  // cx/cy = dead center of the constellation container
  const cx = dims.w / 2;
  const cy = dims.h / 2;
  const outerRx = dims.w * ORBIT_RADIUS;
  const outerRy = outerRx / ORBIT_ROUNDNESS; // when roundness=1, ry=rx (circle)

  // Computed sizes
  const centerW = Math.round(dims.w * CENTER_GROUP_SCALE);
  const centerH = Math.round(centerW * (851 / 949));
  const vectorRingSize = Math.round(dims.w * VECTOR_RING_SCALE);
  const userSize = Math.round(dims.w * USER_AVATAR_SCALE);
  const fabSize = Math.round(dims.w * FAB_SCALE);

  return (
    <motion.div
      className="relative w-full h-dvh overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1F1F1F 0%, #4F2C5A 46%, #3C1749 100%)" }}
      animate={exiting ? { opacity: 0, scale: 0.96, y: -20 } : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Status bar spacer */}
      <div style={{ height: HEADER_TOP_PAD }} />

      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        style={{ paddingLeft: HEADER_SIDE_PAD, paddingRight: HEADER_SIDE_PAD, paddingBottom: 4 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-white/90"
          style={{ fontFamily: "var(--font-bumbbled)", fontSize: BELO_FONT_SIZE }}
        >
          belo
        </h1>
        <button className="w-12 h-12 flex items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <circle cx="10.5" cy="10.5" r="7" stroke="white" strokeOpacity="0.85" strokeWidth="2.6" />
            <path d="M16 16l5.5 5.5" stroke="white" strokeOpacity="0.85" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        </button>
      </motion.div>

      {/* Constellation area */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: "calc(100dvh - 170px)" }}
      >
        {/* Organic vector ring outlines — two layers, counter-rotating */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: cx,
            top: cy,
            width: vectorRingSize,
            height: vectorRingSize,
            marginLeft: -vectorRingSize / 2,
            marginTop: -vectorRingSize / 2,
            zIndex: 1,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Vector 1 — clockwise */}
          <motion.div
            className="absolute inset-0"
            animate={VECTOR_RING_ROTATE ? { rotate: 360 } : undefined}
            transition={VECTOR_RING_ROTATE ? { duration: VECTOR_RING_ROTATE_SPEED, repeat: Infinity, ease: "linear" } : undefined}
          >
            <Image
              src="/vector_effects/Vector.png"
              alt=""
              width={vectorRingSize}
              height={vectorRingSize}
              className="w-full h-full object-contain"
              unoptimized
            />
          </motion.div>
          {/* Vector 2 — counter-clockwise */}
          <motion.div
            className="absolute inset-0"
            animate={VECTOR_RING_ROTATE ? { rotate: -360 } : undefined}
            transition={VECTOR_RING_ROTATE ? { duration: VECTOR_RING_ROTATE_SPEED, repeat: Infinity, ease: "linear" } : undefined}
          >
            <Image
              src="/vector_effects/Vector-1.png"
              alt=""
              width={vectorRingSize}
              height={vectorRingSize}
              className="w-full h-full object-contain"
              unoptimized
            />
          </motion.div>
        </motion.div>

        {/* Outer ring avatars */}
        {outerRingContacts.map((contact, i) => {
          const angleRad = (outerAngles[i] * Math.PI) / 180;
          const rOffset = dims.w * OUTER_AVATAR_RADIUS_OFFSETS[i];
          const x = cx + (outerRx + rOffset) * Math.cos(angleRad);
          const y = cy + (outerRy + rOffset) * Math.sin(angleRad);
          const size = Math.round(dims.w * OUTER_AVATAR_SCALES[i]);

          return (
            <div
              key={contact.id}
              className="absolute"
              style={{
                left: x,
                top: y,
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
                zIndex: 2,
              }}
            >
              <motion.button
                className="w-full h-full p-0 m-0 bg-transparent border-none cursor-pointer block"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleContactTap(contact.id)}
              >
                <Image
                  src={contact.avatar}
                  alt={contact.name}
                  width={size}
                  height={size}
                  className="w-full h-full object-contain"
                  unoptimized
                  priority
                />
              </motion.button>
            </div>
          );
        })}

        {/* Center group (Group 227) */}
        <div
          className="absolute"
          style={{
            left: cx,
            top: cy,
            width: centerW,
            height: centerH,
            marginLeft: -centerW / 2,
            marginTop: -centerH / 2,
            zIndex: 3,
          }}
        >
          <motion.button
            className="w-full h-full p-0 m-0 bg-transparent border-none cursor-pointer block"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.23, 1, 0.32, 1],
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleContactTap("person2")}
          >
            <Image
              src={centerGroup.avatar}
              alt="Center group"
              width={centerW}
              height={centerH}
              className="w-full h-full object-contain"
              unoptimized
              priority
            />
          </motion.button>
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between"
        style={{ zIndex: 5, paddingLeft: BOTTOM_SIDE_PAD, paddingRight: BOTTOM_SIDE_PAD, paddingBottom: BOTTOM_PAD }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {/* User avatar */}
        <motion.div
          style={{ width: userSize, height: userSize }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Image
            src={userAvatar.avatar}
            alt="You"
            width={userSize}
            height={userSize}
            className="w-full h-full object-contain"
            unoptimized
          />
        </motion.div>

        {/* FAB with purple glow */}
        <div className="flex items-center justify-center" style={{ width: fabSize, height: fabSize }}>
          <motion.button
            className="relative rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.1] flex items-center justify-center"
            style={{ width: fabSize, height: fabSize, padding: 0, margin: 0 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className="absolute -inset-2 rounded-full blur-xl"
              style={{ background: "rgba(100, 60, 160, 0.45)" }}
            />
            <svg
              width={Math.round(fabSize * 0.4)}
              height={Math.round(fabSize * 0.4)}
              viewBox="0 0 22 22"
              fill="none"
              className="relative z-10"
            >
              <path d="M11 4v14M4 11h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
