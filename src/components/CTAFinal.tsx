import { ArrowUpRight } from "lucide-react";
import { brand } from "../data/brand";

export function CTAFinal() {
  return (
    <section className="bg-fire-dark">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 sm:px-8 md:py-20">
        <h2 className="max-w-[18ch] font-display text-4xl italic font-black leading-tight text-cream sm:text-5xl">
          Bateu a fome? Pede agora.
        </h2>
        <a
          href={brand.links.whatsappOrder}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-sm bg-cream px-7 py-4 text-base font-semibold text-fire-dark transition-opacity hover:opacity-90"
        >
          Pedir pelo WhatsApp
          <ArrowUpRight
            size={18}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </section>
  );
}
