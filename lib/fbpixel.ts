export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '';

export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Evento quando alguém clica no CTA principal
export const trackLead = (buttonText?: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: buttonText || 'CTA Click',
      content_category: 'landing_page_cta'
    });
  }
};

// Evento quando alguém vai para o WhatsApp
export const trackInitiateCheckout = (source?: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: 'WhatsApp Redirect',
      value: 497,
      currency: 'BRL',
      source: source || 'unknown'
    });
  }
};

// Evento quando alguém vê o chat
export const trackViewContent = (contentType: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_type: contentType,
      content_name: 'Chat Interaction'
    });
  }
};

// Evento customizado para scroll
export const trackScroll = (percentage: number) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'PageScroll', {
      scroll_percentage: percentage
    });
  }
};
