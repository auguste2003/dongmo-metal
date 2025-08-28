import Image from "next/image";
import { siteConfig } from "@/lib/data";

export function Logo() {
  return (
    <div className="flex items-center gap-2" style={{ width: 'max-content' }}>
        <Image 
          src="/logo_.png" 
          alt="DONGMO METAL CONCEPTION Logo" 
          width={40} 
          height={40}
          priority 
        />
        <span className="font-bold text-base sm:text-lg whitespace-nowrap">{siteConfig.name}</span>
    </div>
  );
}
