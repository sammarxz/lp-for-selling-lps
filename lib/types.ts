export interface Author {
  name: string;
  role: string;
  image: string;
  initials: string;
}

export interface SocialProofData {
  userCount: number;
  rating: number;
  ratingText: string;
}

export interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  options?: ChatOption[];
  delay?: number;
  linkPreviews?: LinkPreview[];
}

export interface ChatOption {
  id: string;
  text: string;
  value: string;
  nextStep: string;
}

export interface LinkPreview {
  title: string;
  description: string;
  url: string;
  image: string;
  domain: string;
}

export interface ChatStep {
  id: string;
  messages: Omit<ChatMessage, "id" | "timestamp">[];
  options?: ChatOption[];
}
