export interface Character {
  id: string;
  name: string;
  age: number;
  personality: string[];
  bio: string;
  avatar: string;
  greeting: string;
  traits: {
    humor: number;
    intelligence: number;
    empathy: number;
    playfulness: number;
  };
  conversationStyle: string;
  interests: string[];
  relationshipDynamic: 'sweet' | 'playful' | 'intellectual' | 'caring' | 'adventurous';
}
