import { useState, useCallback, useEffect } from "react";

import { chatFlow } from "@/data/chat-flow";
import * as fbpixel from "@/lib/fbpixel";
import { ChatMessage, ChatOption } from "@/lib/types";
import { useWhatsAppIntegration } from "./useWhatsAppIntegration";

export function useChat(shouldStart: boolean = false) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [activeOptionsMessageId, setActiveOptionsMessageId] = useState<string | null>(null);
  
  const { sendToWhatsApp } = useWhatsAppIntegration();

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    if (message.options && message.options.length > 0) {
      setActiveOptionsMessageId(newMessage.id);
    }
    
    return newMessage.id;
  }, []);

  const addUserMessage = useCallback((option: ChatOption) => {
    setActiveOptionsMessageId(null);
    
    addMessage({
      type: 'user',
      content: option.text.replace(/[👍⏰🤔💰👀⚡🎯🤝❓💸📞🎉📱📅]/g, '').trim()
    });

    // Track interaction no Facebook Pixel
    fbpixel.trackViewContent('chat_interaction');

    if (option.nextStep === 'end') {
      setIsComplete(true);
      
      // Usar o hook para enviar para WhatsApp
      setTimeout(() => {
        sendToWhatsApp('ready_to_hire');
      }, 1000);
      return;
    }

    setCurrentStep(option.nextStep);
  }, [addMessage, sendToWhatsApp]);

  const processStep = useCallback(
    (stepId: string) => {
      const step = chatFlow[stepId];
      if (!step) return;

      let delay = 0;

      step.messages.forEach((msg, index) => {
        delay += msg.delay || 1000;

        setTimeout(() => {
          if (index === 0) setIsTyping(true);

          addMessage({
            type: msg.type,
            content: msg.content,
            linkPreviews: msg.linkPreviews,
            options:
              index === step.messages.length - 1 ? step.options : undefined,
          });

          if (index === step.messages.length - 1) {
            setIsTyping(false);
          }
        }, delay);
      });
    },
    [addMessage]
  );

  // Track quando o chat inicia
  useEffect(() => {
    if (shouldStart && !hasStarted) {
      setHasStarted(true);
      setCurrentStep("start");
      fbpixel.trackViewContent("chat_start");
    }
  }, [shouldStart, hasStarted]);

  useEffect(() => {
    if (currentStep && hasStarted) {
      processStep(currentStep);
    }
  }, [currentStep, processStep, hasStarted]);

  return {
    messages,
    isTyping,
    isComplete,
    addUserMessage,
    hasStarted,
    activeOptionsMessageId,
  };
}
