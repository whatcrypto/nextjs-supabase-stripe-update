import CharacterCard, { Character } from "@/components/character-card";
import Link from "next/link";

async function getCharacters(): Promise<Character[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? ("http://localhost:" + "8000");
  const res = await fetch(`${baseUrl}/characters`, { cache: "no-store" });

  if (!res.ok) {
    console.error("Failed to fetch characters", await res.text());
    return [];
  }

  return res.json();
}

export default async function Home() {
  const characters = await getCharacters();

  return (
    <main className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Choose your companion</h1>
      {characters.length === 0 && (
        <p className="text-muted-foreground">
          No characters found. Please add some in the backend.
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {characters.map((c) => (
          <Link key={c.id} href={`/chat/${c.id}`}>
            <CharacterCard character={c} />
          </Link>
        ))}
      </div>
    </main>
  );
}
