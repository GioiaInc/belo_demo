"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    }
  };

  return (
    <motion.div
      style={{ zIndex: 10, paddingLeft: 20, paddingRight: 20, paddingBottom: 32, paddingTop: 12 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Input bar — translucent glass */}
      <div
        className="flex items-center gap-2 rounded-full backdrop-blur-xl"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          paddingLeft: 10,
          paddingRight: 16,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        {/* Plus icon inside the bar */}
        <button
          className="flex-shrink-0 rounded-full bg-white/10 flex items-center justify-center"
          style={{ width: 40, height: 40 }}
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Text input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="belo"
          className="flex-1 text-[18px] text-white/80 bg-transparent"
          style={{
            fontFamily: text ? "var(--font-sans)" : "var(--font-bumbbled)",
            marginLeft: 4,
          }}
        />

        {/* Send button — appears when text entered, stays inside the bar */}
        <AnimatePresence>
          {text.trim() && (
            <motion.button
              initial={{ scale: 0, opacity: 0, width: 0 }}
              animate={{ scale: 1, opacity: 1, width: 36 }}
              exit={{ scale: 0, opacity: 0, width: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={handleSubmit}
              className="flex-shrink-0 rounded-full bg-white/15 flex items-center justify-center overflow-hidden"
              style={{ height: 36 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
