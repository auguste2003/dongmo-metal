import { Gem } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-accent p-2 rounded-md">
        <Gem className="h-6 w-6 text-accent-foreground" />
      </div>
      <span className="text-2xl font-bold text-primary font-headline">
        DONGMO METAL <span className="text-accent">CONCEPTION</span>
      </span>
    </div>
  );
}
