export const getWhatsAppConfig = (locale: string) => {
  const isEnglish = locale === 'en';
  
  const whatsappNumber = isEnglish 
    ? "5581992480658" // Let's try the same number for now
    : "5581992480658";

  return {
    baseUrl: `https://wa.me/${whatsappNumber}`,
    messages: {
      interested: isEnglish
        ? "Hello Sam! I came from your website and I'm interested in the landing page. I'd like to know more details about the process!"
        : "Olá Sam! Vim pelo site e me interessei pela landing page. Gostaria de saber mais detalhes sobre o processo!",
      
      ready_to_hire: isEnglish
        ? "Hi Sam! I came from your website and I want to hire the landing page for $197. How do we proceed?"
        : "Oi Sam! Vim pelo site e já quero contratar a landing page por R$ 497. Como fazemos?",
      
      want_call: isEnglish
        ? "Hello! I came from your website and I'd like to schedule a 15-minute conversation before closing. When are you available?"
        : "Olá! Vim pelo site e gostaria de agendar uma conversa de 15min antes de fechar. Quando você tem disponibilidade?",
      
      need_examples: isEnglish
        ? "Hi Sam! I came from your website and I'd like to see some examples of landing pages you've created before deciding."
        : "Oi Sam! Vim pelo site e gostaria de ver alguns exemplos de landing pages que você já criou antes de decidir.",
      
      has_questions: isEnglish
        ? "Hello! I came from your website but I still have some questions about the landing page. Can you help me?"
        : "Olá! Vim pelo site mas ainda tenho algumas dúvidas sobre a landing page. Pode me ajudar?"
    }
  };
};
