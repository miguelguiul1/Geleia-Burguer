import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand } from "../data/brand";
import { CartButton } from "./CartButton";

const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#sobre", label: "Sobre" },
  { href: "#localizacao", label: "Localização" },
  { href: "#instagram", label: "Instagram" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-char-2/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#inicio"
          className="flex items-center gap-2.5"
        >
          <img
            src={brand.logoUrl}
            alt={brand.name}
            className="h-11 w-11 rounded-full sm:h-12 sm:w-12"
          />
          <span className="hidden font-display text-lg italic font-black text-cream sm:inline">
            {brand.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-bone/80 transition-colors hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#cardapio"
          className="hidden rounded-sm bg-fire px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-fire-bright md:inline-block"
        >
          Ver cardápio
        </a>

        <div className="flex items-center gap-1">
          <CartButton />
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-cream md:hidden"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-bone/10 bg-char-2 px-5 pb-6 pt-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-sm px-3 py-3 text-base text-bone/90 hover:bg-char"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cardapio"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-sm bg-fire px-5 py-3 text-center text-base font-semibold text-cream"
          >
            Ver cardápio
          </a>
        </div>
      )}
    </header>
  );
}
