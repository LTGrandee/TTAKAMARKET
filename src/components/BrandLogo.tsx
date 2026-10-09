interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className = '' }: BrandLogoProps) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <img
        src="/logo_3.jpeg"
        alt="TtakaMarket"
        className="absolute left-[-4%] top-[-12%] h-auto w-[108%] max-w-none"
      />
    </span>
  );
}
