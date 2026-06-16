"use client";

// components/ChatWidget.tsx
// Floating quote assistant — bottom-right on all pages.
// Calls /api/chat which proxies to Anthropic Claude.

import { useState, useEffect, useRef, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi! 👋 I'm the TtFRECH quote assistant. What type of project do you have in mind — residential, commercial, renovation, or something else?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              "Sorry, something went wrong. Please WhatApp call us on +27 73 610 1014 or +27 81 353 2248.",
          },
        ]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Connection error. Please try again or call 073 610 1014.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const reset = () => {
    setMessages([GREETING]);
    setInput("");
    setLoading(false);
  };

  return (
    <>
      {/* ── Floating bubble ── */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
        {/* Tooltip — shows before first open */}
        {!open && hasUnread && (
          <div
            className="bg-[#182338] border border-[rgba(196,162,72,.3)] text-[#F5F0E8] text-[12px]
            px-4 py-2 rounded shadow-lg max-w-[200px] text-center leading-snug animate-fade-in"
          >
            Get a free quote in 2 minutes ✨
            <div className="absolute -bottom-[6px] right-6 w-3 h-3 bg-[#182338] border-r border-b border-[rgba(196,162,72,.3)] rotate-45" />
          </div>
        )}

        {/* Bubble button */}
        <button
          onClick={() => {
            setOpen((o) => !o);
            setHasUnread(false);
          }}
          aria-label={open ? "Close quote assistant" : "Open quote assistant"}
          className="w-14 h-14 rounded-full bg-[#C4A248] hover:bg-[#DFC05A] shadow-lg
          flex items-center justify-center transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A248] focus-visible:ring-offset-2"
        >
          {open ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="#182338"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                stroke="#182338"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="9"
                cy="10"
                r="1"
                fill="#182338"
              />
              <circle
                cx="12"
                cy="10"
                r="1"
                fill="#182338"
              />
              <circle
                cx="15"
                cy="10"
                r="1"
                fill="#182338"
              />
            </svg>
          )}

          {/* Unread dot */}
          {!open && hasUnread && (
            <span
              className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"
              aria-hidden="true"
            />
          )}
        </button>
      </div>

      {/* ── Chat panel ── */}
      <div
        className={`fixed bottom-24 right-6 z-[199] w-[360px] max-w-[calc(100vw-3rem)]
        flex flex-col rounded-xl overflow-hidden shadow-2xl border border-[rgba(196,162,72,.2)]
        transition-all duration-300 ease-in-out origin-bottom-right
        ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
        style={{ height: "min(520px, calc(100vh - 120px))" }}
        role="dialog"
        aria-label="TtFRECH quote assistant"
        aria-modal="false"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#182338] border-b border-[rgba(196,162,72,.15)] shrink-0">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#C4A248] flex items-center justify-center shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 9.5L12 3L21 9.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5Z"
                  stroke="#182338"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#F5F0E8] leading-none">
                TtFRECH Assistant
              </p>
              <p className="text-[10px] text-[rgba(196,162,72,.6)] mt-0.5">
                Quote in minutes
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Reset */}
            <button
              onClick={reset}
              aria-label="Start new conversation"
              title="Start over"
              className="text-[rgba(245,240,232,.35)] hover:text-[#C4A248] transition-colors p-1"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 12a9 9 0 109-9 9 9 0 00-9 9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M3 3v5h5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-[rgba(245,240,232,.35)] hover:text-[#F5F0E8] transition-colors p-1"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#101828]"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(196,162,72,.2) transparent",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-[13px] leading-[1.65]
                ${
                  msg.role === "user"
                    ? "bg-[#C4A248] text-[#182338] font-medium rounded-br-sm"
                    : "bg-[#182338] text-[rgba(245,240,232,.85)] border border-[rgba(196,162,72,.12)] rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#182338] border border-[rgba(196,162,72,.12)] rounded-xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="w-1.5 h-1.5 rounded-full bg-[rgba(196,162,72,.5)]"
                    style={{
                      animation: `bounce 1s ease-in-out ${d * 0.15}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 bg-[#182338] border-t border-[rgba(196,162,72,.15)] shrink-0">
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type your message…"
              rows={1}
              disabled={loading}
              className="flex-1 resize-none bg-[#101828] border border-[rgba(196,162,72,.18)]
              text-[#F5F0E8] text-[13px] placeholder-[rgba(245,240,232,.3)]
              rounded-lg px-3 py-2.5 focus:outline-none focus:border-[rgba(196,162,72,.5)]
              transition-colors leading-snug disabled:opacity-50"
              style={{ maxHeight: "100px", scrollbarWidth: "none" }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${el.scrollHeight}px`;
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="w-9 h-9 rounded-lg bg-[#C4A248] hover:bg-[#DFC05A] disabled:opacity-40
              flex items-center justify-center shrink-0 transition-all
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A248]"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7Z"
                  stroke="#182338"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-[rgba(245,240,232,.2)] mt-2 text-center">
            Powered by TtFRECH AI · or call{" "}
            <a
              href="tel:+270736101014"
              className="text-[rgba(196,162,72,.5)] hover:text-[#C4A248] transition-colors"
            >
              073 610 1014
            </a>
          </p>
        </div>
      </div>

      {/* Bounce keyframe for typing dots */}
      <style>{`
        @keyframes bounce {
          0%,100% { transform: translateY(0); opacity:.5; }
          50%      { transform: translateY(-4px); opacity:1; }
        }
      `}</style>
    </>
  );
}
