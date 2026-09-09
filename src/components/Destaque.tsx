import { Plus } from "lucide-react";
import { brand } from "../data/brand";
import { useProductModal } from "../context/ProductModalContext";
import { PhotoSlot } from "./PhotoSlot";

export function Destaque() {
  const { openItem } = useProductModal();
  const item = brand.featured;

  return (
    <section className="border-y border-bone/10 bg-char-2">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24">
        <div className="aspect-[4/3] overflow-hidden">
          <PhotoSlot
            photoUrl={item?.photoUrl}
            alt={item?.name ?? "Produto em destaque"}
            label="Foto do carro-chefe: o hambúrguer/combo mais pedido da casa"
          />
        </div>

        <div className="flex flex-col gap-5">
          <p className="font-display text-base italic text-gold">
            O queridinho da casa
          </p>
          <h2 className="font-display text-4xl italic font-black leading-tight text-cream sm:text-5xl">
            {item?.name ?? "Aguardando o destaque oficial"}
          </h2>
          <p className="max-w-[48ch] text-base leading-relaxed text-bone/75">
            {item?.description ??
              "Assim que você indicar qual produto, combo ou promoção é o carro-chefe da Geleia Burguer, ele ganha esse espaço de destaque na home."}
          </p>
          {item?.price && (
            <p className="font-display text-2xl italic text-gold">
              {item.price}
            </p>
          )}
          {item && (
            <button
              type="button"
              onClick={() => openItem(item)}
              className="group inline-flex w-fit items-center gap-2 rounded-sm bg-fire px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-fire-bright"
            >
              <Plus size={16} strokeWidth={3} />
              Quero esse
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
