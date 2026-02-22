"use client";

import { motion } from "framer-motion";
import type { Message } from "@/lib/mockData";

interface ChatBubbleProps {
  message: Message;
  isLast?: boolean;
  delay?: number;
}

export default function ChatBubble({ message, isLast = false, delay = 0 }: ChatBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      style={{ paddingLeft: 24, paddingRight: 24, marginBottom: 14 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className={`max-w-[75%] ${isUser ? "text-right" : "text-left"}`}>
        <p
          className={`text-[17px] leading-relaxed ${
            isUser ? "text-white/90" : "text-white"
          }`}
          style={{ fontFamily: "var(--font-chat)", fontWeight: 400 }}
        >
          {message.text}
        </p>
        {isLast && (
          <motion.p
            className="text-[11px] text-white/30"
            style={{ marginTop: 4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
          >
            <span style={{ color: "rgba(155,126,200,0.5)" }}>Seen</span>{" "}
            <span className="text-white/25">Now</span>
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
