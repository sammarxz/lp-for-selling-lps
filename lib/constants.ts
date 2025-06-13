export const getSiteConfig = (locale: string) => {
  const isEnglish = locale === 'en';
  
  return {
    name: "Landing 24h",
    description: isEnglish 
      ? "Your landing page ready in 24 hours"
      : "Sua landing page pronta em 24 horas",
    author: {
      name: "Sam Marxz",
      role: isEnglish 
        ? "Web Designer & Developer"
        : "Designer e Desenvolvedor Web",
      image: "/sammarxz.jpeg",
      initials: "SM"
    },
    contact: {
      whatsapp: "https://wa.me/5581992480658",
      email: "sam@marxz.me"
    },
    social: {
      userCount: 32,
      rating: 5.0,
      ratingText: isEnglish ? "reviews" : "avaliações"
    },
    pricing: {
      currency: isEnglish ? "$" : "R$",
      price: isEnglish ? "497" : "497",
      installments: isEnglish ? "or 3x $179" : "ou 3x de R$ 179"
    }
  } as const;
};
