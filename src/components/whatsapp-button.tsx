import { Button } from "@/components/ui/button";
import { Sparkles, MessageCircle } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

interface WhatsAppButtonProps extends ComponentProps<typeof Button> {
  message: string;
  children: React.ReactNode;
}

export function WhatsAppButton({ message, children, className, ...props }: WhatsAppButtonProps) {
  const phoneNumber = "237612345678"; // Placeholder Cameroon number
  const encodedMessage = encodeURIComponent(message);
  const href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Button asChild size="lg" className={`bg-accent hover:bg-accent/90 text-accent-foreground font-bold group ${className}`} {...props}>
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="mr-3 h-5 w-5" />
        {children}
        <div className="relative w-6 h-6 ml-2">
          <Sparkles className="absolute inset-0 h-6 w-6 text-white/80 transition-transform duration-700 ease-out group-hover:rotate-12 group-hover:scale-110" />
          <Sparkles className="absolute inset-0 h-6 w-6 text-white/50 transition-transform duration-1000 ease-out group-hover:scale-125 group-hover:-rotate-12" />
        </div>
      </Link>
    </Button>
  );
}
