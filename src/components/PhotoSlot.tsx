import { Camera } from "lucide-react";

interface PhotoSlotProps {
  photoUrl?: string | null;
  alt: string;
  label: string;
  className?: string;
  rotate?: boolean;
}

/**
 * Mostra a foto real quando existir. Quando não existir, mostra um "rótulo de
 * pendência" desenhado para parecer parte da identidade (etiqueta de vidro de
 * geleia) em vez de um erro — e diz exatamente o que precisa entrar ali.
 */
export function PhotoSlot({ photoUrl, alt, label, className = "", rotate }: PhotoSlotProps) {
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-3 border-2 border-dashed border-bone/25 bg-char-2/85 px-6 text-center ${className}`}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-sm bg-fire px-3 py-1.5 text-xs font-semibold tracking-wide text-cream ${
          rotate ? "-rotate-2" : ""
        }`}
      >
        <Camera size={14} strokeWidth={2.5} />
        Foto oficial pendente
      </span>
      <p className="max-w-[22ch] text-sm text-bone/60">{label}</p>
    </div>
  );
}
