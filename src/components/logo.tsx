import Image from "next/image";

export function Logo() {
  return (
    <Image 
      src="/logo.png" 
      alt="DONGMO METAL CONCEPTION Logo" 
      width={250} 
      height={40}
      priority 
      className="h-10 w-auto"
    />
  );
}
