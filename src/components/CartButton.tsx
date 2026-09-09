import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export function CartButton({ className = "" }: { className?: string }) {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Abrir carrinho"
      className={`relative flex h-10 w-10 items-center justify-center text-cream ${className}`}
    >
      <ShoppingBag size={22} />
      {itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-fire px-1 text-[10px] font-bold text-cream">
          {itemCount}
        </span>
      )}
    </button>
  );
}
