import { CharacterCard } from '@/components/character-card';
import { characters } from '@/data/characters';

export default function Home() {
  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💕</span>
            <span className="font-semibold text-lg">AI Companions</span>
          </div>
        </div>
      </header>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Meet Your AI Companion
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Choose from a variety of personalities and start meaningful conversations.
          Each companion has their own unique traits, interests, and conversation style.
        </p>
      </section>

      {/* Characters Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Choose Your Companion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Our AI Companions?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Natural Conversations</h3>
              <p className="text-muted-foreground">
                Advanced AI technology ensures engaging and natural conversations
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold mb-2">Unique Personalities</h3>
              <p className="text-muted-foreground">
                Each companion has distinct traits and conversation styles
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
              <p className="text-muted-foreground">
                Your conversations are private and securely encrypted
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
