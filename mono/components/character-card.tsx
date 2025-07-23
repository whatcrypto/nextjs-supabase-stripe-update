import Image from "next/image";

export interface Character {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
}

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <div className="border rounded-lg hover:shadow-lg transition p-4 flex flex-col items-center text-center bg-background/50">
      <div className="relative w-24 h-24">
        <Image
          src={character.avatarUrl}
          alt={character.name}
          fill
          sizes="96px"
          className="rounded-full object-cover"
        />
      </div>
      <h2 className="mt-3 font-semibold text-lg leading-tight line-clamp-1 w-full">
        {character.name}
      </h2>
      <p className="text-sm text-muted-foreground line-clamp-3 mt-1">
        {character.description}
      </p>
    </div>
  );
}
