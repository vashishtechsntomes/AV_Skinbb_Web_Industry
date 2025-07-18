"use client";
import { Button } from "@/components/ui/button";
import {
  addUserMessage,
  sendMessageAsync,
  setInput,
} from "@/context/slices/chatSlice";
import type { AppDispatch, RootState } from "@/context/store";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessage } from "./ChatMessage";

export default function ChatBox() {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, input, loading } = useSelector(
    (state: RootState) => state.chat,
  );
  const auth = useAuth();
  //   console.log("🚀 ~ ChatBox ~ auth:", auth.user?.profilePic[0].url)

  const handleSend = () => {
    if (!input.trim()) return;
    dispatch(addUserMessage(input));
    dispatch(sendMessageAsync(input));
    dispatch(setInput(""));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    textareaRef.current?.focus();
  }, [messages]);

  return (
    <div className="flex h-full min-h-[77dvh] flex-col justify-center p-4">
      {messages.length === 0 && (
        <h3 className="text-muted-foreground text-center text-xl italic md:text-3xl">
          Welcome to SkinBB Metaverse! <br />
        </h3>
      )}
      {!!messages.length && (
        <div className="relative grow">
          <div className="mx-auto max-w-3xl space-y-6 text-lg">
            {/* <div className=" my-8 text-center"></div> */}
            {messages.map((msg, idx) => (
              <ChatMessage
                key={idx}
                isUser={msg.isUser}
                userProfile={auth.user?.profilePic[0].url}
              >
                {msg.content}
              </ChatMessage>
            ))}

            {loading && (
              <ChatMessage >
                <p className="text-lg text-foreground italic">Thinking...</p>
              </ChatMessage>
            )}
            <div ref={messagesEndRef} aria-hidden="true" />
          </div>
        </div>
      )}
      <div className="sticky bottom-0 pt-4 md:pt-8">
        <div className="bg-background mx-auto max-w-3xl rounded-[20px] pb-4">
          <div className="bg-muted overflow-hidden focus-within:bg-muted/50 focus-within:border-input relative rounded-[20px] border transition-colors has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 [&:has(input:is(:disabled))_*]:pointer-events-none">
            <textarea
              className="text-foreground placeholder:text-muted-foreground/70 flex w-full [resize:none] bg-transparent px-4 py-3 text-lg leading-relaxed focus-visible:outline-none "
              placeholder="Ask me anything about skincare..."
              aria-label="Enter your prompt"
              value={input}
              rows={2}
              onChange={(e) => dispatch(setInput(e.target.value))}
              onKeyDown={handleKeyDown}
              disabled={loading}
              ref={textareaRef}
            />
            <div className="flex items-center justify-end gap-2 p-3">
              <Button
                className="h-8 rounded-full"
                onClick={handleSend}
                disabled={loading}
              >
                Ask
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
