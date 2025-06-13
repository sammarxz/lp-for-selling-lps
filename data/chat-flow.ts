import { ChatStep } from "@/lib/types";

export const chatFlow: Record<string, ChatStep> = {
  start: {
    id: "start",
    messages: [
      {
        type: "bot",
        content: "Oi! 👋 Sou o Sam, prazer em te conhecer!",
        delay: 1000,
      },
      {
        type: "bot",
        content:
          "Vi que você se interessou pela nossa landing page. Que tal eu te explicar rapidinho como funciona?",
        delay: 2000,
      },
    ],
    options: [
      {
        id: "1",
        text: "👍 Claro, quero saber!",
        value: "interested",
        nextStep: "explain_process",
      },
      {
        id: "2",
        text: "⏰ Só quero o preço",
        value: "price_only",
        nextStep: "quick_price",
      },
    ],
  },

  explain_process: {
    id: "explain_process",
    messages: [
      {
        type: "bot",
        content: "Perfeito! 🚀",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "Nosso processo é super simples: você me conta sobre seu negócio, eu crio uma landing page incrível em até 24h, e você já pode começar a converter visitantes em clientes!",
        delay: 1500,
      },
      {
        type: "bot",
        content:
          "Já criei +50 landing pages que geraram mais de R$ 2M em vendas para meus clientes. 📈",
        delay: 2500,
      },
    ],
    options: [
      {
        id: "1",
        text: "🤔 Como você faz tão rápido?",
        value: "how_fast",
        nextStep: "explain_speed",
      },
      {
        id: "2",
        text: "💰 Qual é o investimento?",
        value: "price",
        nextStep: "show_price",
      },
      {
        id: "3",
        text: "👀 Posso ver exemplos?",
        value: "examples",
        nextStep: "show_examples",
      },
    ],
  },
  show_examples: {
    id: "show_examples",
    messages: [
      {
        type: "bot",
        content: "Claro! Adoro mostrar meu trabalho! 😄",
        delay: 500,
      },
      {
        type: "bot",
        content: "Aqui estão alguns projetos que desenvolvi:",
        delay: 1000,
      },
      {
        type: "bot",
        content: "🏢 **Urbanus** - Plataforma Imobiliária",
        delay: 1500,
        linkPreviews: [
          {
            title:
              "Urbanus | Compre seu Imóvel e Ganhe Cashback e Benefícios Exclusivos",
            description:
              "Encontre o imóvel dos seus sonhos com a Urbanus. Ganhe cashback, serviço de mudança grátis e muito mais. Acesso a imóveis exclusivos em todo o Brasil.",
            url: "https://www.urbanus.imb.br/",
            image: "/examples/urbanus.png",
            domain: "urbanus.imb.br",
          },
        ],
      },
      {
        type: "bot",
        content: "📖 **Bíblia 365** - Aplicativo de Leitura Bíblica",
        delay: 2500,
        linkPreviews: [
          {
            title: "Bíblia 365 - Leia a Bíblia em 365 Dias",
            description:
              "Aplicativo completo para leitura da Bíblia. Mais de 200 milhões de visualizações mensais em 168 países. Planos de leitura personalizados.",
            url: "https://www.biblia-365.com/",
            image: "/examples/biblia-365.png",
            domain: "biblia-365.com",
          },
        ],
      },
      {
        type: "bot",
        content: "🚀 **WeTwo** - Agência de Marketing Digital",
        delay: 3500,
        linkPreviews: [
          {
            title:
              "WeTwo: Agência de Marketing Digital Especializada em Automação",
            description:
              "Soluções completas de marketing digital, automação de vendas e gestão de leads. Transformamos visitantes em clientes.",
            url: "https://wetwo.vercel.app/",
            image: "/examples/wetwo.png",
            domain: "wetwo.vercel.app",
          },
        ],
      },
      {
        type: "bot",
        content:
          "Todos com design responsivo, alta performance e conversões otimizadas! 💪",
        delay: 4500,
      },
    ],
    options: [
      {
        id: "1",
        text: "🤩 Impressionante! Qual o preço?",
        value: "impressed_price",
        nextStep: "show_price",
      },
      {
        id: "2",
        text: "⚡ Como consegue entregar tão rápido?",
        value: "how_so_fast",
        nextStep: "explain_speed",
      },
      {
        id: "3",
        text: "🎯 Quero algo assim para mim!",
        value: "want_similar",
        nextStep: "closing",
      },
    ],
  },

  explain_speed: {
    id: "explain_speed",
    messages: [
      {
        type: "bot",
        content: "Ótima pergunta! ⚡",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "Tenho um sistema otimizado: uso frameworks modernos (Next.js + React), componentes pré-desenvolvidos, e foco só no que converte de verdade.",
        delay: 1500,
      },
      {
        type: "bot",
        content:
          "Nada de enrolação! Direto ao ponto: copywriting persuasivo + design que vende + integração com WhatsApp/formulários.",
        delay: 2500,
      },
      {
        type: "bot",
        content:
          "Como você viu nos exemplos da Urbanus e Bíblia 365, entrego projetos que realmente funcionam e geram resultados! 🎯",
        delay: 3500,
      },
    ],
    options: [
      {
        id: "1",
        text: "💰 E o preço?",
        value: "price",
        nextStep: "show_price",
      },
      {
        id: "2",
        text: "🎯 Quero começar agora!",
        value: "start_now",
        nextStep: "closing",
      },
    ],
  },

  quick_price: {
    id: "quick_price",
    messages: [
      {
        type: "bot",
        content: "Direto ao ponto, gosto disso! 😄",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "Uma landing page profissional que pode gerar milhares em vendas custa apenas:",
        delay: 1000,
      },
      {
        type: "bot",
        content: "💥 R$ 497 à vista (ou 3x de R$ 179)",
        delay: 1500,
      },
      {
        type: "bot",
        content:
          "Inclui: Design + Desenvolvimento + Hospedagem por 1 ano + Suporte técnico!",
        delay: 2000,
      },
      {
        type: "bot",
        content:
          "Mesmo valor que cobrei para projetos como a Urbanus e WeTwo! 💪",
        delay: 2500,
      },
    ],
    options: [
      {
        id: "1",
        text: "🤝 Fechou! Quero contratar",
        value: "hire",
        nextStep: "closing",
      },
      {
        id: "2",
        text: "🤔 Preciso saber mais detalhes",
        value: "details",
        nextStep: "explain_process",
      },
      {
        id: "3",
        text: "👀 Quero ver os exemplos primeiro",
        value: "see_examples",
        nextStep: "show_examples",
      },
    ],
  },

  show_price: {
    id: "show_price",
    messages: [
      {
        type: "bot",
        content: "Vou ser transparente com você! 💯",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "Projetos como a Urbanus (plataforma imobiliária) normalmente custariam R$ 15.000-30.000...",
        delay: 1500,
      },
      {
        type: "bot",
        content:
          "A Bíblia 365 (200M+ usuários) custaria R$ 50.000+ em uma agência tradicional...",
        delay: 2500,
      },
      {
        type: "bot",
        content:
          "Mas como quero ajudar empreendedores como você, criei um modelo que custa apenas:",
        delay: 3500,
      },
      {
        type: "bot",
        content: "🔥 R$ 497 à vista (ou 3x de R$ 179 sem juros)",
        delay: 4500,
      },
      {
        type: "bot",
        content:
          "E o melhor: se não gostar, devolvemos 100% do seu dinheiro em 7 dias!",
        delay: 5500,
      },
    ],
    options: [
      {
        id: "1",
        text: "🚀 Perfeito! Vamos fazer",
        value: "hire",
        nextStep: "closing",
      },
      {
        id: "2",
        text: "❓ O que está incluso?",
        value: "whats_included",
        nextStep: "show_included",
      },
    ],
  },

  show_included: {
    id: "show_included",
    messages: [
      {
        type: "bot",
        content: "Você recebe TUDO isso por R$ 497:",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "✅ Design profissional responsivo (como Urbanus)\n✅ Copywriting persuasivo\n✅ Integração com WhatsApp\n✅ Formulários funcionais\n✅ Hospedagem por 1 ano\n✅ SSL de segurança\n✅ Performance otimizada (como Bíblia 365)",
        delay: 1500,
      },
      {
        type: "bot",
        content: "E mais: 30 dias de ajustes inclusos! 🎁",
        delay: 2500,
      },
      {
        type: "bot",
        content: "Mesma qualidade dos projetos que você viu nos exemplos!",
        delay: 3500,
      },
    ],
    options: [
      {
        id: "1",
        text: "💸 Quero contratar agora!",
        value: "hire",
        nextStep: "closing",
      },
      {
        id: "2",
        text: "⏰ Vou pensar mais um pouco",
        value: "thinking",
        nextStep: "urgency",
      },
    ],
  },

  urgency: {
    id: "urgency",
    messages: [
      {
        type: "bot",
        content: "Entendo perfeitamente! 🤔",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "Só um heads up: trabalho apenas com 3 projetos por semana para manter a qualidade em 24h.",
        delay: 1500,
      },
      {
        type: "bot",
        content:
          "Esta semana só restam 2 vagas... e geralmente esgotam rápido! ⚡",
        delay: 2500,
      },
      {
        type: "bot",
        content:
          "Projetos como Urbanus e Bíblia 365 só foram possíveis porque mantive esse padrão de qualidade!",
        delay: 3500,
      },
      {
        type: "bot",
        content:
          "Que tal garantir sua vaga agora? Posso reservar por 30 minutos enquanto você decide 😉",
        delay: 4500,
      },
    ],
    options: [
      {
        id: "1",
        text: "🎯 Ok, vou garantir minha vaga!",
        value: "hire",
        nextStep: "closing",
      },
      {
        id: "2",
        text: "📞 Posso falar com você antes?",
        value: "call",
        nextStep: "schedule_call",
      },
    ],
  },

  schedule_call: {
    id: "schedule_call",
    messages: [
      {
        type: "bot",
        content: "Claro! Também prefiro conhecer meus clientes 😊",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "Foi assim que nasceram projetos incríveis como a Urbanus e a Bíblia 365!",
        delay: 1500,
      },
      {
        type: "bot",
        content:
          "Vou te mandar um link para agendar 15 minutinhos comigo. Que tal agora mesmo?",
        delay: 2500,
      },
    ],
    options: [
      {
        id: "1",
        text: "📅 Sim, vamos agendar!",
        value: "schedule",
        nextStep: "closing",
      },
      {
        id: "2",
        text: "💰 Na verdade, já quero contratar",
        value: "hire",
        nextStep: "closing",
      },
    ],
  },

  closing: {
    id: "closing",
    messages: [
      {
        type: "bot",
        content: "Show! 🎉",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "Vou te direcionar para o WhatsApp onde finalizamos tudo. Já vou adiantar algumas perguntas sobre seu projeto!",
        delay: 1500,
      },
      {
        type: "bot",
        content:
          "Prepare-se para ter uma landing page no nível da Urbanus e Bíblia 365! 🚀",
        delay: 2500,
      },
      {
        type: "bot",
        content: "Nos vemos lá!",
        delay: 3500,
      },
    ],
    options: [
      {
        id: "1",
        text: "📱 Ir para WhatsApp",
        value: "whatsapp",
        nextStep: "end",
      },
    ],
  },
};
