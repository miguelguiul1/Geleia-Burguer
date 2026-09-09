import { Plus } from "lucide-react";
import { brand, type MenuCategory } from "../data/brand";
import { useProductModal } from "../context/ProductModalContext";
import { PhotoSlot } from "./PhotoSlot";

const CATEGORY_ORDER: MenuCategory[] = [
  "Hambúrgueres",
  "Acompanhamentos",
  "Bebidas",
  "Sobremesas",
  "Combos",
];

export function Cardapio() {
  const { openItem } = useProductModal();
  const hasItems = brand.menu.length > 0;
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: brand.menu.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <section id="cardapio" className="bg-bone text-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div className="mb-12 max-w-[36ch]">
          <p className="font-display text-base italic text-fire">Cardápio</p>
          <h2 className="mt-2 font-display text-4xl italic font-black leading-tight sm:text-5xl">
            O que vai pedir hoje?
          </h2>
          <p className="mt-3 text-sm text-ink/50">
            Toque em um item para montar do seu jeito e adicionar ao carrinho.
          </p>
        </div>

        {hasItems ? (
          <div className="flex flex-col gap-16">
            {grouped.map((group) => (
              <div key={group.category}>
                <h3 className="mb-6 font-display text-2xl italic font-bold text-fire">
                  {group.category}
                </h3>
                <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openItem(item)}
                      className="group flex gap-4 text-left"
                    >
                      <div className="h-24 w-24 shrink-0 overflow-hidden">
                        <PhotoSlot
                          photoUrl={item.photoUrl}
                          alt={item.name}
                          label=""
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <h4 className="font-display text-lg italic font-bold group-hover:text-fire">
                            {item.name}
                          </h4>
                          <span className="whitespace-nowrap font-display text-lg italic text-fire">
                            {item.originalPrice && (
                              <span className="mr-1.5 text-sm text-ink/40 line-through">
                                {item.originalPrice}
                              </span>
                            )}
                            {item.price}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-ink/70">
                          {item.description}
                        </p>
                        <span className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-semibold text-fire">
                          <Plus size={13} strokeWidth={3} />
                          Adicionar
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-start gap-4 border-2 border-dashed border-fire/30 px-6 py-12 sm:px-10">
            <p className="max-w-[46ch] text-base leading-relaxed text-ink/70">
              O cardápio completo (produtos, ingredientes, fotos e preços)
              ainda não pôde ser confirmado — o iFood bloqueou o acesso
              automatizado à página oficial. Assim que você enviar essas
              informações, elas entram aqui organizadas por categoria.
            </p>
            <p className="text-sm text-ink/50">
              Por enquanto, o pedido continua um clique de distância:
            </p>
          </div>
        )}

        <div className="mt-14 flex flex-wrap items-center gap-3">
          <a
            href={brand.links.whatsappOrder}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/50"
          >
            Falar no WhatsApp
          </a>
          <a
            href={brand.links.ifood}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/50"
          >
            Ver no iFood
          </a>
          <a
            href={brand.links.keeta}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/50"
          >
            Ver no Keeta
          </a>
          <a
            href={brand.links.food99}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/50"
          >
            Ver no 99Food
          </a>
        </div>
        <p className="mt-4 text-sm text-ink/50">
          Pedido mínimo de {brand.minOrder} para delivery.
        </p>
      </div>
    </section>
  );
}
