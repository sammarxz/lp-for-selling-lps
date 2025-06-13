"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { LinkPreview } from "../ui/link-preview";

export function ChatSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const {
    messages,
    isTyping,
    isComplete,
    addUserMessage,
    hasStarted,
    activeOptionsMessageId,
  } = useChat(inView);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (hasStarted && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isTyping, hasStarted]);

  return (
    <section id="chat" ref={ref} className="max-w-xl mx-auto">
      <div className="overflow-hidden">
        <div className="min-h-screen h-auto overflow-y-auto p-6 space-y-4">
          {hasStarted &&
            messages.map((message) => {
              console.log(message);

              return (
                <div key={message.id}>
                  {!message.linkPreviews ? (
                    <div
                      className={cn(
                        "flex",
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                          message.type === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-900"
                        )}
                      >
                        <div className="whitespace-pre-line">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "flex",
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      )}
                    >
                      <div className="max-w-[80%] space-y-2">
                        {message.linkPreviews.map((preview, index) => (
                          <LinkPreview
                            key={index}
                            title={preview.title}
                            description={preview.description}
                            url={preview.url}
                            image={preview.image}
                            domain={preview.domain}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Options */}
                  {message.options &&
                    !isComplete &&
                    activeOptionsMessageId === message.id && (
                      <div className="mt-4 space-y-2">
                        {message.options.map((option) => (
                          <Button
                            key={option.id}
                            variant="ghost"
                            className="w-full justify-start text-left h-auto py-3 px-4 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                            onClick={() => addUserMessage(option)}
                          >
                            {option.text}
                          </Button>
                        ))}
                      </div>
                    )}
                </div>
              );
            })}

          {/* Typing Indicator */}
          {hasStarted && isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3 text-sm">
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-gray-500 ml-2">digitando...</span>
                </div>
              </div>
            </div>
          )}

          {!hasStarted && inView && (
            <div className="flex justify-center items-center h-32">
              <div className="text-gray-500 text-sm">Iniciando conversa...</div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {hasStarted && isComplete && (
          <div className="px-6 py-4 bg-green-50 border-t border-green-200">
            <div className="text-center text-sm text-green-700">
              🎉 Obrigado! Te vejo no WhatsApp para finalizarmos tudo!
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
