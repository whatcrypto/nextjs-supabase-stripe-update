'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">💕</span>
          <span className="font-semibold text-lg">AI Companions</span>
        </Link>
        
        {!isHomePage && (
          <Button variant="outline" asChild>
            <Link href="/">Browse Characters</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
