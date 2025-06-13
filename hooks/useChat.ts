import { useState, useCallback, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { chatFlow } from '@/data/chat-flow';
import { chatFlowEn } from '@/data/chat-flow-en';
import { useWhatsAppIntegration } from './useWhatsAppIntegration';
import { ChatMessage, ChatOption } from '@/lib/types';
import * as fbpixel from '@/lib/fbpixel';
import * as gtag from '@/lib/gtag';

export function useChat(shouldStart: boolean = false) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [activeOptionsMessageId, setActiveOptionsMessageId] = useState<string | null>(null);
  
  // Hooks para internacionalização
  const locale = useLocale();
  const { sendToWhatsApp } = useWhatsAppIntegration();

  // Selecionar o chat flow baseado no idioma
  const getCurrentChatFlow = useCallback(() => {
    return locale === 'en' ? chatFlowEn : chatFlow;
  }, [locale]);

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

    // Track interaction no Facebook Pixel com idioma
    fbpixel.trackViewContent(`${locale}_chat_interaction`);
    
    // Track interaction no Google Analytics
    gtag.trackChatInteraction(`chat_option_${option.value}`, locale);

    if (option.nextStep === 'end') {
      setIsComplete(true);
      
      // Track completion no GA
      gtag.trackChatCompletion(locale);
      
      // Usar o hook do WhatsApp (já adaptado para idiomas)
      setTimeout(() => {
        sendToWhatsApp('ready_to_hire');
      }, 1000);
      return;
    }

    setCurrentStep(option.nextStep);
  }, [addMessage, sendToWhatsApp, locale]);

  const processStep = useCallback((stepId: string) => {
    const currentFlow = getCurrentChatFlow();
    const step = currentFlow[stepId];
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
          options: index === step.messages.length - 1 ? step.options : undefined
        });
        
        if (index === step.messages.length - 1) {
          setIsTyping(false);
        }
      }, delay);
    });
  }, [addMessage, getCurrentChatFlow]);

  // Track quando o chat inicia
  useEffect(() => {
    if (shouldStart && !hasStarted) {
      setHasStarted(true);
      setCurrentStep('start');
      
      // Track no Facebook Pixel
      fbpixel.trackViewContent(`${locale}_chat_start`);
      
      // Track no Google Analytics
      gtag.trackChatInteraction('chat_start', locale);
    }
  }, [shouldStart, hasStarted, locale]);

  useEffect(() => {
    if (currentStep && hasStarted) {
      processStep(currentStep);
      
      // Track cada step do chat no GA
      gtag.trackChatInteraction(`chat_step_${currentStep}`, locale);
    }
  }, [currentStep, processStep, hasStarted, locale]);

  return {
    messages,
    isTyping,
    isComplete,
    addUserMessage,
    hasStarted,
    activeOptionsMessageId
  };
}