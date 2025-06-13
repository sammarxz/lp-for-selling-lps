export const SITE_CONFIG = {
  name: "Landing 24h",
  description: "Sua landing page pronta em 24 horas",
  author: {
    name: "Sam Marxz",
    role: "Designer e Desenvolvedor Web",
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
    ratingText: "avaliações"
  }
} as const;

export const ANIMATION_CONFIG = {
  duration: {
    slow: "60s",
    medium: "30s", 
    fast: "15s"
  },
  easing: "linear"
} as const;