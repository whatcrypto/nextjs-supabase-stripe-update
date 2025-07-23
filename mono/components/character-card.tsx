'use client';

import { Character } from '@/types/character';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const router = useRouter();

  const handleChatClick = () => {
    router.push(`/chat/${character.id}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <div className="text-6xl mb-2">{character.avatar}</div>
          <h3 className="text-xl font-semibold">{character.name}</h3>
          <p className="text-sm text-muted-foreground">Age: {character.age}</p>
        </div>
        
        <p className="text-sm mb-4 min-h-[60px]">{character.bio}</p>
        
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">Personality</p>
            <div className="flex flex-wrap gap-1">
              {character.personality.map((trait, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-secondary text-xs rounded-full"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">Interests</p>
            <div className="flex flex-wrap gap-1">
              {character.interests.slice(0, 3).map((interest, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-accent text-xs rounded-full"
                >
                  {interest}
                </span>
              ))}
              {character.interests.length > 3 && (
                <span className="px-2 py-1 text-xs text-muted-foreground">
                  +{character.interests.length - 3} more
                </span>
              )}
            </div>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">Traits</p>
            <div className="space-y-1">
              {Object.entries(character.traits).map(([trait, value]) => (
                <div key={trait} className="flex items-center gap-2">
                  <span className="text-xs capitalize w-20">{trait}:</span>
                  <div className="flex-1 bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${value * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleChatClick}
          className="w-full mt-4"
        >
          Start Chatting
        </Button>
      </CardContent>
    </Card>
  );
}
