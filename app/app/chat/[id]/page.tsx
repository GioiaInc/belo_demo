"use client";

import { useState, useEffect, useCallback, useRef, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AtmosphericBG from "@/components/AtmosphericBG";
import ChatBubble from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import { outerRingContacts, chatHistory, demoScript } from "@/lib/mockData";
import type { Message } from "@/lib/mockData";

// =============================================
// CHAT HEADER SIZES
// =============================================
const AVATAR_SIZE = 80;         // px — chat header avatar
const GLASS_ICON_SIZE = 36;     // px — liquid glass icon bubbles
// =============================================

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const contact = outerRingContacts.find((c) => c.id === id) || outerRingContacts[0];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // State
  const [messages, setMessages] = useState<Message[]>(chatHistory);
  const [currentMood, setCurrentMood] = useState(0.85); // start warm from history
  const [scriptIndex, setScriptIndex] = useState(0);   // where we are in demoScript
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted] = useState(false);       // has the demo started

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Update mood based on latest message
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      setCurrentMood(lastMessage.mood);
    }
  }, [messages]);

  // Realistic typing delay — average person types ~40 WPM on a phone
  // That's roughly 200ms per character + thinking time
  const getTypingDelay = (text: string) => {
    const thinkingTime = 600;
    const perChar = 60;
    return thinkingTime + text.length * perChar + Math.random() * 400;
  };

  // Start the demo: after a short delay, Saeed sends the first message
  useEffect(() => {
    if (started) return;
    const timer = setTimeout(() => {
      setStarted(true);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, demoScript[0]]);
        setScriptIndex(1);
      }, getTypingDelay(demoScript[0].text));
    }, 1500);
    return () => clearTimeout(timer);
  }, [started]);

  const handleSend = useCallback(
    (text: string) => {
      if (scriptIndex >= demoScript.length) return;

      const nextInScript = demoScript[scriptIndex];

      // The next expected message should be from the user
      if (nextInScript.sender === "user") {
        // Add user's message (with whatever they actually typed)
        const userMsg: Message = { ...nextInScript, text };
        setMessages((prev) => [...prev, userMsg]);
        const nextIdx = scriptIndex + 1;
        setScriptIndex(nextIdx);

        // If the following message is from the contact, auto-send after typing indicator
        if (nextIdx < demoScript.length && demoScript[nextIdx].sender === "contact") {
          const reply = demoScript[nextIdx];
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [...prev, reply]);
            setScriptIndex(nextIdx + 1);
          }, getTypingDelay(reply.text));
        }
      }
    },
    [scriptIndex]
  );

  return (
    <motion.div
      className="relative w-full h-dvh overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
    >
      <AtmosphericBG mood={currentMood} />

      <div className="relative z-10 h-full flex flex-col">
        {/* Status bar spacer */}
        <div style={{ height: 28 }} />

        {/* Chat header */}
        <motion.div
          className="flex items-start"
          style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 8 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Left: back arrow */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center"
            style={{ width: 40, height: 40, marginTop: 8 }}
          >
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none">
              <path d="M10 1L1 10l9 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Center: phone icon + avatar + video icon + name */}
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center" style={{ gap: 8 }}>
              {/* Phone icon — liquid glass bubble */}
              <button
                className="flex items-center justify-center rounded-full backdrop-blur-xl"
                style={{
                  width: GLASS_ICON_SIZE,
                  height: GLASS_ICON_SIZE,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.1)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M6.6 1H3.8C2.4 1 1 2.2 1 3.6 1 10.7 7.3 17 14.4 17c1.4 0 2.6-1.4 2.6-2.8v-2.8L13.5 9l-2.5 2.5C9.5 10.5 7.5 8.5 6.5 7l2.5-2.5L6.6 1z"
                    stroke="white"
                    strokeOpacity="0.7"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Avatar */}
              <div style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}>
                <Image
                  src={contact.avatar}
                  alt={contact.name}
                  width={AVATAR_SIZE}
                  height={AVATAR_SIZE}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              </div>

              {/* Video icon — liquid glass bubble */}
              <button
                className="flex items-center justify-center rounded-full backdrop-blur-xl"
                style={{
                  width: GLASS_ICON_SIZE,
                  height: GLASS_ICON_SIZE,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.1)",
                }}
              >
                <svg width="16" height="12" viewBox="0 0 20 14" fill="none">
                  <rect x="1" y="1" width="13" height="12" rx="2" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" />
                  <path d="M14 4.5L19 2v10l-5-2.5V4.5z" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Name */}
            <motion.p
              className="text-[14px] text-white/80 font-medium"
              style={{ marginTop: -2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {contact.name}
            </motion.p>
          </div>

          {/* Right: stack/cards icon */}
          <button
            className="flex items-center justify-center"
            style={{ width: 40, height: 40, marginTop: 8 }}
          >
            <svg width="28" height="28" viewBox="0 0 20 20" fill="none">
              {/* Two stacked cards icon */}
              <rect x="3" y="1" width="14" height="12" rx="2.5" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" />
              <rect x="5" y="5" width="14" height="12" rx="2.5" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" />
            </svg>
          </button>
        </motion.div>

        {/* Yesterday separator */}
        <motion.div
          className="flex justify-center"
          style={{ marginTop: 8, marginBottom: 12 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span
            className="text-[12px] text-white/25 rounded-full"
            style={{ background: "rgba(255,255,255,0.04)", paddingLeft: 16, paddingRight: 16, paddingTop: 6, paddingBottom: 6 }}
          >
            Yesterday
          </span>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 100 }}>
          <AnimatePresence>
            {messages.map((msg, i) => {
              // Show "Today" divider right before the first live message
              const showTodayDivider = i === chatHistory.length;
              return (
                <div key={msg.id}>
                  {showTodayDivider && (
                    <motion.div
                      className="flex justify-center"
                      style={{ marginTop: 8, marginBottom: 12 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span
                        className="text-[12px] text-white/25 rounded-full"
                        style={{ background: "rgba(255,255,255,0.04)", paddingLeft: 16, paddingRight: 16, paddingTop: 6, paddingBottom: 6 }}
                      >
                        Today
                      </span>
                    </motion.div>
                  )}
                  <ChatBubble
                    message={msg}
                    isLast={i === messages.length - 1 && msg.sender === "contact"}
                    delay={i < chatHistory.length ? i * 0.08 : 0}
                  />
                </div>
              );
            })}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                className="flex justify-start"
                style={{ paddingLeft: 24, paddingRight: 24, marginBottom: 12 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map((dot) => (
                    <motion.div
                      key={dot}
                      className="rounded-full bg-white/40"
                      style={{ width: 6, height: 6 }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: dot * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput onSend={handleSend} />
      </div>
    </motion.div>
  );
}
