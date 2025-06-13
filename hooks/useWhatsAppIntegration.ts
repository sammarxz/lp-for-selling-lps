import { useCallback } from 'react';
import { SITE_CONFIG } from '@/lib/constants';
import { whatsappMessages } from '@/data/whatsapp-messages';

export function useWhatsAppIntegration() {
  const sendToWhatsApp = useCallback((messageType: keyof typeof whatsappMessages.fromChat, additionalInfo?: string) => {
    let baseMessage = whatsappMessages.fromChat[messageType];
    
    if (additionalInfo) {
      baseMessage += `\n\nInformações adicionais: ${additionalInfo}`;
    }
    
    const encodedMessage = encodeURIComponent(baseMessage);
    const whatsappUrl = `${SITE_CONFIG.contact.whatsapp}?text=${encodedMessage}`;
    
    // Analytics tracking (opcional)
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('event', 'whatsapp_redirect', {
    //     event_category: 'conversion',
    //     event_label: messageType,
    //     value: messageType === 'ready_to_hire' ? 497 : 0
    //   });
    // }
    
    window.open(whatsappUrl, '_blank');
  }, []);

  return { sendToWhatsApp };
}
