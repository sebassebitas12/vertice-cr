import Image from "next/image";

const productImages: Record<string, { src: string; description: string }> = {
  bracket: { src: "/images/concept-bracket-v2.png", description: "Soporte angular de muestra" },
  cable: { src: "/images/concept-cable-guide.png", description: "Guía de cables de muestra" },
  spacer: { src: "/images/concept-spacer.png", description: "Separador geométrico de muestra" },
};

type ProductImageProps = {
  visual: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function ProductImage({ visual, alt, className = "", priority = false }: ProductImageProps) {
  const image = productImages[visual] ?? { src: "/images/concept-hero.png", description: "Referencia conceptual" };
  return (
    <Image
      src={image.src}
      alt={alt || image.description}
      fill
      priority={priority}
      sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 34vw"
      className={className}
    />
  );
}
