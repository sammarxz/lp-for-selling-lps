import { ChatStep } from "@/lib/types";

export const chatFlowEn: Record<string, ChatStep> = {
  start: {
    id: "start",
    messages: [
      {
        type: "bot",
        content: "Hi! 👋 I'm Sam, nice to meet you!",
        delay: 1000,
      },
      {
        type: "bot",
        content:
          "I saw you're interested in our landing page service. How about I quickly explain how it works?",
        delay: 2000,
      },
    ],
    options: [
      {
        id: "1",
        text: "👍 Sure, I want to know!",
        value: "interested",
        nextStep: "explain_process",
      },
      {
        id: "2",
        text: "⏰ Just want the price",
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
        content: "Perfect! 🚀",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "Our process is super simple: you tell me about your business, I create an amazing landing page in up to 24h, and you can start converting visitors into customers!",
        delay: 1500,
      },
      {
        type: "bot",
        content:
          "I've already created 50+ landing pages that generated over $400K in sales for my clients. 📈",
        delay: 2500,
      },
    ],
    options: [
      {
        id: "1",
        text: "🤔 How do you deliver so fast?",
        value: "how_fast",
        nextStep: "explain_speed",
      },
      {
        id: "2",
        text: "💰 What's the investment?",
        value: "price",
        nextStep: "show_price",
      },
      {
        id: "3",
        text: "👀 Can I see examples?",
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
        content: "Of course! I love showing my work! 😄",
        delay: 500,
      },
      {
        type: "bot",
        content: "Here are some projects I've developed:",
        delay: 1000,
      },
      {
        type: "bot",
        content: "🏢 **Urbanus** - Real Estate Platform",
        delay: 1500,
        linkPreviews: [
          {
            title:
              "Urbanus | Buy Your Property and Get Cashback and Exclusive Benefits",
            description:
              "Find your dream property with Urbanus. Get cashback, free moving service and much more. Access to exclusive properties throughout Brazil.",
            url: "https://www.urbanus.imb.br/",
            image: "/examples/urbanus.png",
            domain: "urbanus.imb.br",
          },
        ],
      },
      {
        type: "bot",
        content: "📖 **Bible 365** - Bible Reading App",
        delay: 2500,
        linkPreviews: [
          {
            title: "Bible 365 - Read the Bible in 365 Days",
            description:
              "Complete app for Bible reading. Over 200 million monthly views in 168 countries. Personalized reading plans.",
            url: "https://www.biblia-365.com/",
            image: "/examples/biblia-365.png",
            domain: "biblia-365.com",
          },
        ],
      },
      {
        type: "bot",
        content: "🚀 **WeTwo** - Digital Marketing Agency",
        delay: 3500,
        linkPreviews: [
          {
            title: "WeTwo: Digital Marketing Agency Specialized in Automation",
            description:
              "Complete digital marketing solutions, sales automation and lead management. We transform visitors into customers.",
            url: "https://wetwo.vercel.app/",
            image: "/examples/wetwo.png",
            domain: "wetwo.vercel.app",
          },
        ],
      },
      {
        type: "bot",
        content:
          "All with responsive design, high performance and optimized conversions! 💪",
        delay: 4500,
      },
    ],
    options: [
      {
        id: "1",
        text: "🤩 Impressive! What's the price?",
        value: "impressed_price",
        nextStep: "show_price",
      },
      {
        id: "2",
        text: "⚡ How can you deliver so fast?",
        value: "how_so_fast",
        nextStep: "explain_speed",
      },
      {
        id: "3",
        text: "🎯 I want something like this for me!",
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
        content: "Great question! ⚡",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "I have an optimized system: I use modern frameworks (Next.js + React), pre-developed components, and focus only on what actually converts.",
        delay: 1500,
      },
      {
        type: "bot",
        content:
          "No fluff! Straight to the point: persuasive copywriting + design that sells + WhatsApp/forms integration.",
        delay: 2500,
      },
      {
        type: "bot",
        content:
          "As you saw in the Urbanus and Bible 365 examples, I deliver projects that actually work and generate results! 🎯",
        delay: 3500,
      },
    ],
    options: [
      {
        id: "1",
        text: "💰 What about the price?",
        value: "price",
        nextStep: "show_price",
      },
      {
        id: "2",
        text: "🎯 I want to start now!",
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
        content: "Straight to the point, I like that! 😄",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "A professional landing page that can generate thousands in sales costs only:",
        delay: 1000,
      },
      {
        type: "bot",
        content: "💥 $497 upfront (or 3x $179)",
        delay: 1500,
      },
      {
        type: "bot",
        content:
          "Includes: Design + Development + 1-year hosting + Technical support!",
        delay: 2000,
      },
      {
        type: "bot",
        content:
          "Same quality I delivered for projects like Urbanus and WeTwo! 💪",
        delay: 2500,
      },
    ],
    options: [
      {
        id: "1",
        text: "🤝 Deal! I want to hire",
        value: "hire",
        nextStep: "closing",
      },
      {
        id: "2",
        text: "🤔 I need to know more details",
        value: "details",
        nextStep: "explain_process",
      },
      {
        id: "3",
        text: "👀 I want to see the examples first",
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
        content: "I'll be transparent with you! 💯",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "Projects like Urbanus (real estate platform) would normally cost $5,000-10,000...",
        delay: 1500,
      },
      {
        type: "bot",
        content:
          "Bible 365 (200M+ users) would cost $20,000+ at a traditional agency...",
        delay: 2500,
      },
      {
        type: "bot",
        content:
          "But since I want to help entrepreneurs like you, I created a model that costs only:",
        delay: 3500,
      },
      {
        type: "bot",
        content: "🔥 $497 upfront (or 3x $179 no interest)",
        delay: 4500,
      },
      {
        type: "bot",
        content:
          "And the best part: if you don't like it, we refund 100% of your money in 7 days!",
        delay: 5500,
      },
    ],
    options: [
      {
        id: "1",
        text: "🚀 Perfect! Let's do it",
        value: "hire",
        nextStep: "closing",
      },
      {
        id: "2",
        text: "❓ What's included?",
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
        content: "You get ALL of this for $497:",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "✅ Professional responsive design (like Urbanus)\n✅ Persuasive copywriting\n✅ WhatsApp integration\n✅ Functional forms\n✅ 1-year hosting\n✅ SSL security\n✅ Optimized performance (like Bible 365)",
        delay: 1500,
      },
      {
        type: "bot",
        content: "Plus: 30 days of adjustments included! 🎁",
        delay: 2500,
      },
      {
        type: "bot",
        content: "Same quality as the projects you saw in the examples!",
        delay: 3500,
      },
    ],
    options: [
      {
        id: "1",
        text: "💸 I want to hire now!",
        value: "hire",
        nextStep: "closing",
      },
      {
        id: "2",
        text: "⏰ I'll think about it a bit more",
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
        content: "I totally understand! 🤔",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "Just a heads up: I only work on 3 projects per week to maintain 24h quality delivery.",
        delay: 1500,
      },
      {
        type: "bot",
        content:
          "This week only 2 spots left... and they usually fill up fast! ⚡",
        delay: 2500,
      },
      {
        type: "bot",
        content:
          "Projects like Urbanus and Bible 365 were only possible because I maintained this quality standard!",
        delay: 3500,
      },
      {
        type: "bot",
        content:
          "How about securing your spot now? I can hold it for 30 minutes while you decide 😉",
        delay: 4500,
      },
    ],
    options: [
      {
        id: "1",
        text: "🎯 Ok, I'll secure my spot!",
        value: "hire",
        nextStep: "closing",
      },
      {
        id: "2",
        text: "📞 Can I talk to you first?",
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
        content: "Of course! I also prefer to know my clients 😊",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "That's how amazing projects like Urbanus and Bible 365 were born!",
        delay: 1500,
      },
      {
        type: "bot",
        content:
          "I'll send you a link to schedule 15 minutes with me. How about right now?",
        delay: 2500,
      },
    ],
    options: [
      {
        id: "1",
        text: "📅 Yes, let's schedule!",
        value: "schedule",
        nextStep: "closing",
      },
      {
        id: "2",
        text: "💰 Actually, I want to hire now",
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
        content: "Awesome! 🎉",
        delay: 500,
      },
      {
        type: "bot",
        content:
          "I'll direct you to WhatsApp where we'll finalize everything. I'll ask some questions about your project in advance!",
        delay: 1500,
      },
      {
        type: "bot",
        content:
          "Get ready to have a landing page at the level of Urbanus and Bible 365! 🚀",
        delay: 2500,
      },
      {
        type: "bot",
        content: "See you there!",
        delay: 3500,
      },
    ],
    options: [
      {
        id: "1",
        text: "📱 Go to WhatsApp",
        value: "whatsapp",
        nextStep: "end",
      },
    ],
  },
};
