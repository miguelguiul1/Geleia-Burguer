import { brand } from "../data/brand";
import { InstagramGlyph } from "./icons/InstagramGlyph";

export function Footer() {
  return (
    <footer className="bg-char-2 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="font-display text-lg italic font-bold text-cream">
          {brand.name}
        </p>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-bone/60">
          <a href="#inicio" className="hover:text-cream">
            Início
          </a>
          <a href="#cardapio" className="hover:text-cream">
            Cardápio
          </a>
          <a href="#sobre" className="hover:text-cream">
            Sobre
          </a>
          <a href="#localizacao" className="hover:text-cream">
            Localização
          </a>
        </nav>

        <a
          href={brand.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram da Geleia Burguer"
          className="text-bone/60 hover:text-cream"
        >
          <InstagramGlyph size={20} />
        </a>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-bone/30">
        {brand.name} · CNPJ {brand.location.cnpj} · {brand.location.fullAddress}
      </p>
    </footer>
  );
}
