export interface Character {
  id: string;
  name: string;
  personality: string;
  description: string;
  avatar: string;
  traits: string[];
  greeting: string;
  background: string;
  likes: string[];
  dislikes: string[];
  conversationStyle: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  id: string;
  characterId: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  isTyping?: boolean;
}

export interface ChatSession {
  id: string;
  characterId: string;
  userId?: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}
