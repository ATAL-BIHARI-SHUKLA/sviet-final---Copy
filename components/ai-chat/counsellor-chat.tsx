"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Bot,
  MessageCircle,
  ChevronDown,
  Send,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type DisplayMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

const FALLBACK_MESSAGES: DisplayMessage[] = [
  {
    id: "fallback-user-1",
    role: "user",
    text: "What programs do you offer?",
  },
  {
    id: "fallback-assistant-1",
    role: "assistant",
    text: "We offer Engineering, Computer Applications, Management, and Commerce programs. Which interests you?",
  },
  {
    id: "fallback-user-2",
    role: "user",
    text: "Engineering",
  },
];

const QUICK_PROMPTS = [
  { label: "Admission Process", icon: "📋" },
  { label: "Fee Structure", icon: "💰" },
  { label: "Contact Us", icon: "📞" },
] as const;

type CounsellorChatProps = {
  mode?: "widget" | "page";
};

export function CounsellorChat({ mode = "widget" }: CounsellorChatProps) {
  const pathname = usePathname();
  const isPageMode = mode === "page";
  const [isOpen, setIsOpen] = useState(isPageMode);
  const [input, setInput] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/ai/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";
  const sentMessages = useMemo<DisplayMessage[]>(() => {
    return messages
      .map((message) => {
        if (message.role !== "assistant" && message.role !== "user") {
          return null;
        }

        const text = message.parts
          .filter((part) => part.type === "text")
          .map((part) => part.text)
          .join("\n")
          .trim();

        if (!text) {
          return null;
        }

        return {
          id: message.id,
          role: message.role,
          text,
        };
      })
      .filter((message): message is DisplayMessage => message !== null);
  }, [messages]);

  const displayMessages =
    sentMessages.length > 0 ? sentMessages : FALLBACK_MESSAGES;
  const showPanel = isPageMode || isOpen;

  useEffect(() => {
    if (!showPanel || !scrollerRef.current) {
      return;
    }

    scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }, [showPanel, isLoading, messages]);

  useEffect(() => {
    if (isPageMode && !isOpen) {
      setIsOpen(true);
    }
  }, [isPageMode, isOpen]);

  const canSubmit = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading],
  );

  function closeChat() {
    setIsOpen(false);
  }

  function submitMessage(text: string) {
    const nextInput = text.trim();

    if (!nextInput || isLoading) {
      return;
    }

    void sendMessage({ text: nextInput });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    const nextInput = input;
    setInput("");
    submitMessage(nextInput);
  }

  function onQuickPromptClick(prompt: string) {
    setInput("");
    submitMessage(prompt);
  }

  if (!isPageMode && pathname.startsWith("/admin")) {
    return null;
  }

  const panel = (
    <div
      className={
        isPageMode
          ? "flex h-dvh w-full flex-col overflow-hidden bg-white"
          : "flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:h-150 sm:w-105 sm:rounded-2xl"
      }
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#E5E7EB] bg-[#F97316] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <Bot className="h-5 w-5 text-[#F97316]" />
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-bold text-white">SIVI</p>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
              <span className="text-sm text-white/90">Online</span>
            </div>
          </div>
        </div>

        {!isPageMode ? (
          <button
            type="button"
            aria-label="Minimize chat"
            onClick={closeChat}
            className="inline-flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/15"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        ) : null}
      </header>

      {/* Messages Container */}
      <div
        ref={scrollerRef}
        className="flex-1 space-y-4 overflow-y-auto bg-[#F8FAFC] px-4 py-4 sm:px-6 sm:py-5"
      >
        {displayMessages.map((message, index) => {
          const isAssistant = message.role === "assistant";
          const isLatestAssistant =
            isAssistant && index === displayMessages.length - 1;
          const showActions =
            sentMessages.length > 0 && isLatestAssistant && !isLoading;

          return (
            <div
              key={message.id}
              className={`group/message flex gap-3 animate-in fade-in ${isAssistant ? "justify-start" : "justify-end"}`}
            >
              {isAssistant ? (
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                  <Bot className="h-4 w-4 text-[#F97316]" />
                </div>
              ) : null}

              <div className="flex max-w-[75%] flex-col gap-2">
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isAssistant
                      ? "bg-[#F97316] text-white"
                      : "bg-[#E5E7EB] text-[#111827]"
                  }`}
                >
                  <p className="whitespace-pre-line wrap-break-word">
                    {message.text}
                  </p>
                </div>

                {showActions ? (
                  <div className="flex items-center gap-2 pl-1 opacity-100 transition md:opacity-0 md:group-hover/message:opacity-100">
                    <button
                      type="button"
                      aria-label="Helpful"
                      className="inline-flex items-center justify-center rounded-lg p-1.5 text-[#6B7280] transition hover:bg-black/5"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Not helpful"
                      className="inline-flex items-center justify-center rounded-lg p-1.5 text-[#6B7280] transition hover:bg-black/5"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </button>
                  </div>
                ) : null}
              </div>

              {!isAssistant ? (
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E5E7EB]">
                  <Image
                    src="/Logo.png"
                    alt="SVGOI"
                    width={32}
                    height={32}
                    className="h-7 w-7 rounded-full object-contain"
                  />
                </div>
              ) : null}
            </div>
          );
        })}

        {isLoading ? (
          <div className="flex gap-3 animate-in fade-in">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
              <Bot className="h-4 w-4 text-[#F97316]" />
            </div>
            <div className="rounded-lg bg-[#F97316] px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/90 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/90 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/90" />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Input Area */}
      <div className="border-t border-[#E5E7EB] bg-white px-4 py-4 sm:px-6">
        {/* Quick Prompts */}
        <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-2">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt.label}
              type="button"
              onClick={() => onQuickPromptClick(prompt.label)}
              disabled={isLoading}
              className="shrink-0 rounded-full border border-[#E2E8F0] bg-[#F1F5F9] px-3 py-2 text-sm font-medium text-[#111827] transition hover:bg-[#E2E8F0] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span aria-hidden="true" className="mr-1.5">
                {prompt.icon}
              </span>
              {prompt.label}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={onSubmit} className="flex items-end gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type your message..."
            className="h-13 flex-1 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!canSubmit}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F97316] text-white transition hover:bg-[#EA8C1E] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );

  if (isPageMode) {
    return panel;
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open AI counsellor chat"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#F97316] text-white shadow-lg transition hover:scale-110 hover:shadow-xl"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {showPanel ? (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/20 p-4 sm:items-end sm:justify-end">
          {panel}
        </div>
      ) : null}
    </>
  );
}
