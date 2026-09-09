import { X, Minus, Plus, Trash2, ArrowUpRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatBRL } from "../utils/format";
import { brand } from "../data/brand";
import { PhotoSlot } from "./PhotoSlot";

export function CartDrawer() {
  const {
    lines,
    isCartOpen,
    closeCart,
    removeLine,
    updateQuantity,
    subtotal,
    openCheckout,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[55] flex justify-end">
      <button
        aria-label="Fechar carrinho"
        onClick={closeCart}
        className="absolute inset-0 bg-char-2/80 backdrop-blur-sm"
      />

      <div className="relative flex h-full w-full max-w-md flex-col bg-char">
        <div className="flex items-center justify-between border-b border-bone/10 px-5 py-4">
          <h2 className="font-display text-xl italic font-bold text-cream">
            Seu pedido
          </h2>
          <button
            aria-label="Fechar"
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center text-bone/70 hover:text-cream"
          >
            <X size={22} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-bone/60">Seu carrinho está vazio.</p>
            <a
              href="#cardapio"
              onClick={closeCart}
              className="text-sm font-semibold text-fire-bright"
            >
              Ver cardápio
            </a>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-5">
                {lines.map((line) => {
                  const optionsTotal = line.options.reduce(
                    (s, o) => s + o.price,
                    0
                  );
                  const lineTotal = (line.unitPrice + optionsTotal) * line.quantity;
                  return (
                    <li key={line.lineId} className="flex gap-3">
                      <div className="h-16 w-16 shrink-0 overflow-hidden">
                        <PhotoSlot
                          photoUrl={line.photoUrl}
                          alt={line.itemName}
                          label=""
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-cream">
                            {line.itemName}
                          </p>
                          <button
                            aria-label={`Remover ${line.itemName}`}
                            onClick={() => removeLine(line.lineId)}
                            className="text-bone/40 hover:text-fire-bright"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        {line.options.length > 0 && (
                          <p className="text-xs leading-relaxed text-bone/50">
                            {line.options.map((o) => o.optionName).join(" · ")}
                          </p>
                        )}
                        {line.comment && (
                          <p className="text-xs italic text-bone/40">
                            "{line.comment}"
                          </p>
                        )}
                        <div className="mt-1 flex items-center justify-between">
                          <div className="flex items-center gap-2 border border-bone/20 px-1.5 py-1">
                            <button
                              type="button"
                              aria-label="Diminuir"
                              onClick={() =>
                                line.quantity > 1
                                  ? updateQuantity(line.lineId, line.quantity - 1)
                                  : removeLine(line.lineId)
                              }
                              className="flex h-6 w-6 items-center justify-center text-cream"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-3 text-center text-xs text-cream">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Aumentar"
                              onClick={() =>
                                updateQuantity(line.lineId, line.quantity + 1)
                              }
                              className="flex h-6 w-6 items-center justify-center text-cream"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-gold">
                            {formatBRL(lineTotal)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-bone/10 px-5 py-5">
              <p className="mb-1 text-xs text-bone/50">
                Pedido mínimo de {brand.minOrder} para delivery.
              </p>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-base text-bone/70">Subtotal</span>
                <span className="font-display text-2xl italic font-black text-cream">
                  {formatBRL(subtotal)}
                </span>
              </div>
              <button
                type="button"
                onClick={openCheckout}
                className="group flex w-full items-center justify-center gap-2 rounded-sm bg-fire px-6 py-4 text-base font-semibold text-cream transition-colors hover:bg-fire-bright"
              >
                Finalizar pedido
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
