import { ArrowUpRight } from "lucide-react";
import { brand } from "../data/brand";
import { PhotoSlot } from "./PhotoSlot";

export function Hero() {
  const headline = brand.about.headline ?? "Hambúrguer bom de verdade.";

  return (
    <section
      id="inicio"
      className="relative grid min-h-[100svh] grid-cols-1 pt-24 md:grid-cols-[1.05fr_0.95fr] md:pt-0"
    >
      <div className="flex flex-col justify-center gap-6 px-5 pb-14 sm:px-8 md:pl-8 md:pr-4 lg:pl-16">
        <img
          src={brand.logoUrl}
          alt={brand.name}
          className="h-20 w-20 rounded-full sm:h-24 sm:w-24"
        />

        <h1 className="max-w-[16ch] font-display text-5xl italic font-black leading-[1.03] text-cream sm:text-6xl lg:text-7xl">
          {headline}
        </h1>

        <p className="max-w-[42ch] text-lg leading-relaxed text-bone/80">
          100% carne bovina na brasa, pão brioche fofinho e aquele sabor
          defumado que só a {brand.name} entrega. Peça direto pelo canal
          oficial.
        </p>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
          <a
            href={brand.links.whatsappOrder}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-sm bg-fire px-7 py-4 text-base font-semibold text-cream transition-colors hover:bg-fire-bright"
          >
            Pedir agora
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href="#cardapio"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-bone/30 px-7 py-4 text-base font-semibold text-cream transition-colors hover:border-bone/60"
          >
            Ver cardápio
          </a>
        </div>

        <p className="pt-1 text-sm text-bone/50">{brand.instagramHandle}</p>
      </div>

      <div
        className="relative min-h-[46vh] md:min-h-0"
        style={{
          background:
            "radial-gradient(120% 100% at 70% 30%, var(--color-fire-dark) 0%, var(--color-char) 62%)",
        }}
      >
        <PhotoSlot
          photoUrl={brand.heroPhotoUrl}
          alt={`Hambúrguer da ${brand.name}`}
          label="Foto apetitosa de um hambúrguer da casa (destaque do Instagram ou do iFood)"
          rotate
        />
      </div>
    </section>
  );
}
