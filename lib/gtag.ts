export const GA_TRACKING_ID = 'G-ZE255SHBNH';

// Declaração para TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      parameters?: Record<string, any>
    ) => void;
  }
}

// Função para verificar se o gtag está disponível
const isGtagAvailable = () => {
  return typeof window !== 'undefined' && window.gtag;
};

// Event quando alguém clica no CTA principal
export const trackCTAClick = (buttonText?: string, locale?: string) => {
  if (isGtagAvailable()) {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: buttonText || 'CTA Click',
      custom_parameter_1: locale || 'unknown',
      value: 1
    });
  }
};

// Event quando alguém vai para o WhatsApp
export const trackWhatsAppRedirect = (source?: string, locale?: string) => {
  if (isGtagAvailable()) {
    window.gtag('event', 'whatsapp_redirect', {
      event_category: 'conversion',
      event_label: 'WhatsApp Contact',
      source: source || 'unknown',
      custom_parameter_1: locale || 'unknown',
      value: 497
    });
  }
};

// Event quando alguém vê o chat
export const trackChatInteraction = (contentType: string, locale?: string) => {
  if (isGtagAvailable()) {
    window.gtag('event', 'chat_interaction', {
      event_category: 'engagement',
      event_label: contentType,
      custom_parameter_1: locale || 'unknown'
    });
  }
};

// Event customizado para scroll
export const trackScrollDepth = (percentage: number, locale?: string) => {
  if (isGtagAvailable()) {
    window.gtag('event', 'scroll_depth', {
      event_category: 'engagement',
      event_label: `${percentage}% Scroll`,
      custom_parameter_1: locale || 'unknown',
      value: percentage
    });
  }
};

// Event para chat completion
export const trackChatCompletion = (locale?: string) => {
  if (isGtagAvailable()) {
    window.gtag('event', 'chat_completion', {
      event_category: 'conversion',
      event_label: 'Chat Completed',
      custom_parameter_1: locale || 'unknown',
      value: 1
    });
  }
};

// Event para mudança de idioma
export const trackLanguageSwitch = (fromLocale: string, toLocale: string) => {
  if (isGtagAvailable()) {
    window.gtag('event', 'language_switch', {
      event_category: 'engagement',
      event_label: `${fromLocale}_to_${toLocale}`,
      from_locale: fromLocale,
      to_locale: toLocale
    });
  }
};

// Event para visualização de projetos
export const trackProjectView = (projectName: string, locale?: string) => {
  if (isGtagAvailable()) {
    window.gtag('event', 'project_view', {
      event_category: 'engagement',
      event_label: projectName,
      custom_parameter_1: locale || 'unknown'
    });
  }
};

// Event para form submission (caso adicione forms futuramente)
export const trackFormSubmission = (formType: string, locale?: string) => {
  if (isGtagAvailable()) {
    window.gtag('event', 'form_submission', {
      event_category: 'conversion',
      event_label: formType,
      custom_parameter_1: locale || 'unknown',
      value: 1
    });
  }
};

// Event para page view customizado
export const trackPageView = (url: string, title: string, locale?: string) => {
  if (isGtagAvailable()) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: title,
      page_location: url,
      custom_parameter_1: locale || 'unknown'
    });
  }
};