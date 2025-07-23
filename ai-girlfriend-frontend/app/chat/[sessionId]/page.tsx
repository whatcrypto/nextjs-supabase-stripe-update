'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { ChatInterface } from '@/components/ChatInterface';
import { Character } from '@/types';
import { characterApi } from '@/lib/api-client';
import { motion } from 'framer-motion';

// Use the same mock data as homepage for consistency
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

export default function ChatPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;
  const characterId = searchParams.get('characterId');
  
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (characterId) {
      loadCharacter(characterId);
    } else {
      router.push('/');
    }
  }, [characterId, router]);

  const loadCharacter = async (id: string) => {
    try {
      // Try to fetch from API first
      const apiCharacter = await characterApi.getById(id);
      if (apiCharacter) {
        setCharacter(apiCharacter);
      } else {
        // Fallback to mock data
        const mockCharacter = mockCharacters.find(c => c.id === id);
        if (mockCharacter) {
          setCharacter(mockCharacter);
        } else {
          router.push('/');
        }
      }
    } catch (error) {
      console.error('Error loading character:', error);
      // Use mock data on error
      const mockCharacter = mockCharacters.find(c => c.id === id);
      if (mockCharacter) {
        setCharacter(mockCharacter);
      } else {
        router.push('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/');
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

  if (!character) {
    return null;
  }

  return (
    <ChatInterface
      character={character}
      sessionId={sessionId}
      onBack={handleBack}
    />
  );
}
