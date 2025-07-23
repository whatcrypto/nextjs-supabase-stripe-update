import { ChatInterface } from '@/components/chat-interface';
import { characters } from '@/data/characters';
import { notFound } from 'next/navigation';

interface ChatPageProps {
  params: {
    characterId: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const character = characters.find(c => c.id === params.characterId);

  if (!character) {
    notFound();
  }

  return <ChatInterface character={character} />;
}

export async function generateStaticParams() {
  return characters.map((character) => ({
    characterId: character.id,
  }));
}
