import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartLineOption {
  groupId: string;
  groupTitle: string;
  optionId: string;
  optionName: string;
  price: number;
}

export interface CartLine {
  lineId: string;
  itemId: string;
  itemName: string;
  photoUrl: string | null;
  quantity: number;
  unitPrice: number;
  options: CartLineOption[];
  comment?: string;
}

interface CartContextValue {
  lines: CartLine[];
  addLine: (line: Omit<CartLine, "lineId">) => void;
  removeLine: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
  subtotal: number;
  itemCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "geleia-burguer-cart";

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartLine[]) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setCartOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignora falha de storage (modo privado, quota etc.)
    }
  }, [lines]);

  const addLine: CartContextValue["addLine"] = (line) => {
    setLines((prev) => [
      ...prev,
      { ...line, lineId: generateId() },
    ]);
  };

  const removeLine = (lineId: string) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  };

  const updateQuantity = (lineId: string, quantity: number) => {
    setLines((prev) =>
      prev.map((l) => (l.lineId === lineId ? { ...l, quantity } : l))
    );
  };

  const clear = () => setLines([]);

  const subtotal = useMemo(
    () =>
      lines.reduce(
        (sum, l) =>
          sum +
          l.quantity *
            (l.unitPrice + l.options.reduce((s, o) => s + o.price, 0)),
        0
      ),
    [lines]
  );

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  return (
    <CartContext.Provider
      value={{
        lines,
        addLine,
        removeLine,
        updateQuantity,
        clear,
        subtotal,
        itemCount,
        isCartOpen,
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
        isCheckoutOpen,
        openCheckout: () => {
          setCartOpen(false);
          setCheckoutOpen(true);
        },
        closeCheckout: () => setCheckoutOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
