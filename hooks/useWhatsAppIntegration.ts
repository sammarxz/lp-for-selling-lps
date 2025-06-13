import { useCallback } from "react";
import { useLocale } from 'next-intl';
import { getWhatsAppConfig } from "@/lib/whatsapp-config";
import * as fbpixel from "@/lib/fbpixel";

export function useWhatsAppIntegration() {
  const locale = useLocale();
  
  const sendToWhatsApp = useCallback(
    (
      messageType: keyof ReturnType<typeof getWhatsAppConfig>['messages'],
      additionalInfo?: string
    ) => {
      const config = getWhatsAppConfig(locale);
      let baseMessage = config.messages[messageType];

      if (additionalInfo) {
        const separator = locale === 'en' 
          ? '\n\nAdditional info: '
          : '\n\nInformações adicionais: ';
        baseMessage += separator + additionalInfo;
      }

      const encodedMessage = encodeURIComponent(baseMessage);
      const whatsappUrl = `${config.baseUrl}?text=${encodedMessage}`;

      // Track no Facebook Pixel
      if (messageType === 'ready_to_hire') {
        fbpixel.trackInitiateCheckout(`${locale}_direct_hire`);
      } else {
        fbpixel.trackLead(`${locale}_whatsapp_${messageType}`);
      }

      window.open(whatsappUrl, "_blank");
    },
    [locale]
  );

  return { sendToWhatsApp };
}
