import { useCart } from "../context/CartContext";
import { formatBRL } from "../utils/format";

export function StickyOrderBar() {
  const { itemCount, subtotal, openCart } = useCart();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-bone/10 bg-char-2/95 px-5 py-3 backdrop-blur-sm md:hidden">
      {itemCount > 0 ? (
        <button
          type="button"
          onClick={openCart}
          className="flex w-full items-center justify-between rounded-sm bg-fire px-5 py-3.5 text-base font-semibold text-cream active:bg-fire-bright"
        >
          <span>Ver carrinho · {itemCount} {itemCount === 1 ? "item" : "itens"}</span>
          <span>{formatBRL(subtotal)}</span>
        </button>
      ) : (
        <a
          href="#cardapio"
          className="block w-full rounded-sm bg-fire py-3.5 text-center text-base font-semibold text-cream active:bg-fire-bright"
        >
          Ver cardápio
        </a>
      )}
    </div>
  );
}
