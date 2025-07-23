import axios from 'axios';
import { Character, ChatSession, Message, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Character APIs
export const characterApi = {
  getAll: async (): Promise<Character[]> => {
    const response = await apiClient.get<ApiResponse<Character[]>>('/characters');
    return response.data.data || [];
  },

  getById: async (id: string): Promise<Character | null> => {
    const response = await apiClient.get<ApiResponse<Character>>(`/characters/${id}`);
    return response.data.data || null;
  },

  create: async (character: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>): Promise<Character> => {
    const response = await apiClient.post<ApiResponse<Character>>('/characters', character);
    if (!response.data.data) throw new Error('Failed to create character');
    return response.data.data;
  },

  update: async (id: string, character: Partial<Character>): Promise<Character> => {
    const response = await apiClient.put<ApiResponse<Character>>(`/characters/${id}`, character);
    if (!response.data.data) throw new Error('Failed to update character');
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/characters/${id}`);
  },
};

// Chat APIs
export const chatApi = {
  createSession: async (characterId: string): Promise<ChatSession> => {
    const response = await apiClient.post<ApiResponse<ChatSession>>('/chat/sessions', { characterId });
    if (!response.data.data) throw new Error('Failed to create chat session');
    return response.data.data;
  },

  getSession: async (sessionId: string): Promise<ChatSession | null> => {
    const response = await apiClient.get<ApiResponse<ChatSession>>(`/chat/sessions/${sessionId}`);
    return response.data.data || null;
  },

  sendMessage: async (sessionId: string, content: string): Promise<Message> => {
    const response = await apiClient.post<ApiResponse<Message>>(`/chat/sessions/${sessionId}/messages`, {
      content,
      role: 'user',
    });
    if (!response.data.data) throw new Error('Failed to send message');
    return response.data.data;
  },

  streamMessage: async (
    sessionId: string,
    content: string,
    onChunk: (chunk: string) => void,
    onComplete: () => void
  ) => {
    const response = await fetch(`${API_BASE_URL}/chat/sessions/${sessionId}/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, role: 'user' }),
    });

    if (!response.ok) {
      throw new Error('Failed to stream message');
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No reader available');

    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        onComplete();
        break;
      }
      
      const chunk = decoder.decode(value);
      onChunk(chunk);
    }
  },
};
