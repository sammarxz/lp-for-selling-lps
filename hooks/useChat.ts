import { useState, useCallback, useEffect } from 'react';

import { chatFlow } from '@/data/chat-flow';
import { SITE_CONFIG } from '@/lib/constants';
import { ChatMessage, ChatOption } from '@/lib/types';

export function useChat(shouldStart: boolean = false) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [activeOptionsMessageId, setActiveOptionsMessageId] = useState<string | null>(null);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message, // ✅ Isso inclui linkPreviews se existir
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Se a mensagem tem opções, define como ativa
    if (message.options && message.options.length > 0) {
      setActiveOptionsMessageId(newMessage.id);
    }
    
    return newMessage.id;
  }, []);

  const addUserMessage = useCallback((option: ChatOption) => {
    // Remove as opções ativas antes de adicionar resposta do usuário
    setActiveOptionsMessageId(null);
    
    addMessage({
      type: 'user',
      content: option.text.replace(/[👍⏰🤔💰👀⚡🎯🤝❓💸📞🎉📱📅]/g, '').trim()
    });

    if (option.nextStep === 'end') {
      setIsComplete(true);
      // Redirect to WhatsApp
      setTimeout(() => {
        const message = encodeURIComponent('Olá! Vim pelo site e quero contratar uma landing page!');
        window.open(`${SITE_CONFIG.contact.whatsapp}?text=${message}`, '_blank');
      }, 1000);
      return;
    }

    setCurrentStep(option.nextStep);
  }, [addMessage]);

  const processStep = useCallback((stepId: string) => {
    const step = chatFlow[stepId];
    if (!step) return;

    let delay = 0;

    step.messages.forEach((msg, index) => {
      delay += msg.delay || 1000;
      
      setTimeout(() => {
        if (index === 0) setIsTyping(true);
        
        // ✅ IMPORTANTE: Passar TODA a mensagem, incluindo linkPreviews
        addMessage({
          type: msg.type,
          content: msg.content,
          linkPreviews: msg.linkPreviews, // ✅ Agora passa linkPreviews
          options: index === step.messages.length - 1 ? step.options : undefined
        });
        
        if (index === step.messages.length - 1) {
          setIsTyping(false);
        }
      }, delay);
    });
  }, [addMessage]);

  // Inicia o chat quando shouldStart vira true
  useEffect(() => {
    if (shouldStart && !hasStarted) {
      setHasStarted(true);
      setCurrentStep('start');
    }
  }, [shouldStart, hasStarted]);

  // Processa step apenas quando currentStep muda E não é null
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
    activeOptionsMessageId
  };
}