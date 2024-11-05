"use client";

import React, { ElementRef, useEffect, useRef, useState } from "react";
import { Companion } from "@prisma/client";

import ChatMessage, { ChatMessageProps } from "@/components/chat-message";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
}

export default function ChatMessages({
  companion,
  isLoading,
  messages
}: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Adjust to trigger on messages array directly

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={messages.length === 0 && isLoading} // Only show if loading and no messages
        src={companion.src}
        role="system"
        content={`We will be learning about ${companion.name}. Topics covered are ${companion.description}.`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content} // Ensure unique key
          role={message.role}
          content={message.content}
          src={companion.src}
        />
      ))}
      {isLoading && <ChatMessage role="system" src={companion.src} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
}