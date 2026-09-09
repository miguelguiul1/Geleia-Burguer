import { createContext, useContext, useState, type ReactNode } from "react";
import type { MenuItem, FeaturedItem } from "../data/brand";

type ModalItem = MenuItem | FeaturedItem;

interface ProductModalContextValue {
  activeItem: ModalItem | null;
  openItem: (item: ModalItem) => void;
  closeItem: () => void;
}

const ProductModalContext = createContext<ProductModalContextValue | null>(
  null
);

export function ProductModalProvider({ children }: { children: ReactNode }) {
  const [activeItem, setActiveItem] = useState<ModalItem | null>(null);

  return (
    <ProductModalContext.Provider
      value={{
        activeItem,
        openItem: (item) => setActiveItem(item),
        closeItem: () => setActiveItem(null),
      }}
    >
      {children}
    </ProductModalContext.Provider>
  );
}

export function useProductModal() {
  const ctx = useContext(ProductModalContext);
  if (!ctx)
    throw new Error(
      "useProductModal precisa estar dentro de <ProductModalProvider>"
    );
  return ctx;
}
