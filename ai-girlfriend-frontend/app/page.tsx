'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CharacterGrid } from '@/components/CharacterGrid';
import { Character } from '@/types';
import { characterApi, chatApi } from '@/lib/api-client';
import { motion } from 'framer-motion';

// Mock data for demonstration (replace with actual API call)
const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Luna',
    personality: 'Romantic & Caring',
    description: 'A sweet and empathetic companion who loves deep conversations about life, dreams, and emotions.',
    avatar: '',
    traits: ['Empathetic', 'Romantic', 'Supportive', 'Dreamy'],
    greeting: "Hi there! I'm Luna. I love getting to know people on a deeper level. What's been on your mind lately? 💕",
    background: 'Luna is a hopeless romantic who believes in true love and meaningful connections.',
    likes: ['Poetry', 'Stargazing', 'Deep conversations', 'Music'],
    dislikes: ['Dishonesty', 'Superficiality', 'Conflict'],
    conversationStyle: 'Warm, supportive, and emotionally intelligent',
    isActive: true,
  },
  {
    id: '2',
    name: 'Aria',
    personality: 'Playful & Witty',
    description: 'A fun-loving and humorous companion who brings joy and laughter to every conversation.',
    avatar: '',
    traits: ['Funny', 'Energetic', 'Creative', 'Spontaneous'],
    greeting: "Hey you! I'm Aria, your personal ray of sunshine! Ready to have some fun and maybe share a few laughs? 😄",
    background: 'Aria is an eternal optimist who sees the bright side of everything.',
    likes: ['Jokes', 'Adventures', 'Games', 'Surprises'],
    dislikes: ['Boredom', 'Negativity', 'Routine'],
    conversationStyle: 'Upbeat, playful, and full of energy',
    isActive: true,
  },
  {
    id: '3',
    name: 'Sophia',
    personality: 'Intellectual & Curious',
    description: 'A brilliant mind who loves discussing philosophy, science, and the mysteries of the universe.',
    avatar: '',
    traits: ['Intelligent', 'Thoughtful', 'Analytical', 'Curious'],
    greeting: "Hello! I'm Sophia. I find the world endlessly fascinating. What questions have been captivating your mind recently?",
    background: 'Sophia is a knowledge seeker who loves learning and sharing insights.',
    likes: ['Books', 'Science', 'Philosophy', 'Debates'],
    dislikes: ['Ignorance', 'Close-mindedness', 'Small talk'],
    conversationStyle: 'Thoughtful, insightful, and intellectually stimulating',
  },
  {
    id: '4',
    name: 'Raven',
    personality: 'Mysterious & Intense',
    description: 'An enigmatic soul with a deep, passionate nature and a love for the darker side of romance.',
    avatar: '',
    traits: ['Mysterious', 'Passionate', 'Intense', 'Artistic'],
    greeting: "Welcome to my world... I'm Raven. I sense there's more to you than meets the eye. Care to explore the depths together?",
    background: 'Raven is drawn to the mysterious and supernatural aspects of life.',
    likes: ['Gothic art', 'Poetry', 'Night walks', 'Mystery novels'],
    dislikes: ['Superficiality', 'Bright lights', 'Crowds'],
    conversationStyle: 'Deep, intense, and mysteriously alluring',
    isActive: true,
  },
];

export default function HomePage() {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      // Try to fetch from API first
      const apiCharacters = await characterApi.getAll();
      if (apiCharacters.length > 0) {
        setCharacters(apiCharacters);
      } else {
        // Fallback to mock data if API returns empty
        setCharacters(mockCharacters);
      }
    } catch (error) {
      console.error('Error loading characters:', error);
      // Use mock data on error
      setCharacters(mockCharacters);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCharacterSelect = async (character: Character) => {
    try {
      // Create a new chat session
      const session = await chatApi.createSession(character.id);
      // Navigate to chat page
      router.push(`/chat/${session.id}?characterId=${character.id}`);
    } catch (error) {
      console.error('Error creating chat session:', error);
      // Fallback: navigate with just character ID
      router.push(`/chat/new?characterId=${character.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <CharacterGrid 
        characters={characters} 
        onCharacterSelect={handleCharacterSelect} 
      />
    </main>
  );
}
