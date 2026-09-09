import { useMemo, useState } from "react";
import { X, Minus, Plus, Check } from "lucide-react";
import { useProductModal } from "../context/ProductModalContext";
import { useCart } from "../context/CartContext";
import type { ModifierGroup } from "../data/modifiers";
import { formatBRL } from "../utils/format";
import { PhotoSlot } from "./PhotoSlot";

export function ProductModal() {
  const { activeItem, closeItem } = useProductModal();
  const { addLine, openCart } = useCart();

  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [touchedInvalid, setTouchedInvalid] = useState(false);

  const groups: ModifierGroup[] = activeItem?.modifierGroups ?? [];

  const optionPrice = useMemo(() => {
    let total = 0;
    for (const group of groups) {
      const chosen = selections[group.id] ?? [];
      for (const optId of chosen) {
        const opt = group.options.find((o) => o.id === optId);
        if (opt) total += opt.price;
      }
    }
    return total;
  }, [groups, selections]);

  const unitPrice = (activeItem?.basePrice ?? 0) + optionPrice;
  const total = unitPrice * quantity;

  if (!activeItem) return null;

  const missingRequired = groups.filter(
    (g) => g.required && (selections[g.id]?.length ?? 0) < g.min
  );
  const canAdd = missingRequired.length === 0;

  function toggleOption(group: ModifierGroup, optionId: string) {
    setSelections((prev) => {
      const current = prev[group.id] ?? [];
      const isSelected = current.includes(optionId);
      let next: string[];
      if (isSelected) {
        next = current.filter((id) => id !== optionId);
      } else if (group.max === 1) {
        next = [optionId];
      } else {
        if (current.length >= group.max) return prev;
        next = [...current, optionId];
      }
      return { ...prev, [group.id]: next };
    });
  }

  function handleAdd() {
    if (!activeItem) return;
    if (!canAdd) {
      setTouchedInvalid(true);
      return;
    }
    const options = groups.flatMap((group) =>
      (selections[group.id] ?? []).map((optId) => {
        const opt = group.options.find((o) => o.id === optId)!;
        return {
          groupId: group.id,
          groupTitle: group.title,
          optionId: opt.id,
          optionName: opt.name,
          price: opt.price,
        };
      })
    );
    addLine({
      itemId: activeItem.id,
      itemName: activeItem.name,
      photoUrl: activeItem.photoUrl,
      quantity,
      unitPrice: activeItem.basePrice,
      options,
      comment: comment.trim() || undefined,
    });
    closeItem();
    setSelections({});
    setQuantity(1);
    setComment("");
    setTouchedInvalid(false);
    openCart();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <button
        aria-label="Fechar"
        onClick={closeItem}
        className="absolute inset-0 bg-char-2/80 backdrop-blur-sm"
      />

      <div className="relative flex max-h-[92svh] w-full flex-col overflow-hidden bg-char sm:max-w-lg sm:rounded-t-none">
        <div className="flex items-center justify-between border-b border-bone/10 px-5 py-4">
          <h2 className="font-display text-xl italic font-bold text-cream">
            {activeItem.name}
          </h2>
          <button
            aria-label="Fechar"
            onClick={closeItem}
            className="flex h-9 w-9 items-center justify-center text-bone/70 hover:text-cream"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="aspect-[16/9]">
            <PhotoSlot
              photoUrl={activeItem.photoUrl}
              alt={activeItem.name}
              label="Foto do item"
            />
          </div>

          <div className="px-5 py-5">
            <p className="text-sm leading-relaxed text-bone/70">
              {activeItem.description}
            </p>
          </div>

          {groups.map((group) => {
            const chosen = selections[group.id] ?? [];
            const invalid =
              touchedInvalid && group.required && chosen.length < group.min;

            return (
              <div
                key={group.id}
                className="border-t border-bone/10 px-5 py-5"
              >
                <div className="mb-1 flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-cream">{group.title}</h3>
                  {group.required ? (
                    <span className="whitespace-nowrap rounded-sm bg-fire px-2 py-0.5 text-[11px] font-semibold text-cream">
                      Obrigatório
                    </span>
                  ) : (
                    <span className="whitespace-nowrap text-[11px] text-bone/40">
                      Opcional
                    </span>
                  )}
                </div>
                <p className="mb-3 text-xs text-bone/50">
                  {group.max === 1
                    ? "Escolha 1 opção"
                    : `Escolha até ${group.max} opções`}
                </p>

                <div className="flex flex-col gap-2">
                  {group.options.map((option) => {
                    const isSelected = chosen.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleOption(group, option.id)}
                        className={`flex items-center justify-between rounded-sm border px-4 py-3 text-left transition-colors ${
                          isSelected
                            ? "border-fire bg-fire/10"
                            : "border-bone/15 hover:border-bone/35"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center border ${
                              isSelected
                                ? "border-fire bg-fire"
                                : "border-bone/30"
                            } ${group.max === 1 ? "rounded-full" : "rounded-sm"}`}
                          >
                            {isSelected && (
                              <Check size={13} strokeWidth={3} className="text-cream" />
                            )}
                          </span>
                          <span className="text-sm text-cream">
                            {option.name}
                          </span>
                        </span>
                        <span className="whitespace-nowrap text-sm text-bone/60">
                          {option.price > 0
                            ? `+ ${formatBRL(option.price)}`
                            : "Incluso"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {invalid && (
                  <p className="mt-2 text-xs text-fire-bright">
                    Selecione {group.min === 1 ? "1 opção" : `${group.min} opções`} para continuar.
                  </p>
                )}
              </div>
            );
          })}

          <div className="border-t border-bone/10 px-5 py-5">
            <label
              htmlFor="comment"
              className="mb-2 block text-sm font-semibold text-cream"
            >
              Algum comentário?
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 140))}
              maxLength={140}
              rows={2}
              placeholder="Ex: sem cebola, ponto da carne, etc."
              className="w-full resize-none border border-bone/15 bg-char-2 px-3 py-2 text-sm text-cream placeholder:text-bone/30 focus:border-fire"
            />
            <p className="mt-1 text-right text-xs text-bone/30">
              {comment.length} / 140
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-bone/10 bg-char-2 px-5 py-4">
          <div className="flex items-center gap-3 border border-bone/20 px-2 py-2">
            <button
              type="button"
              aria-label="Diminuir quantidade"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-7 w-7 items-center justify-center text-cream"
            >
              <Minus size={16} />
            </button>
            <span className="w-4 text-center text-sm text-cream">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Aumentar quantidade"
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              className="flex h-7 w-7 items-center justify-center text-cream"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`flex flex-1 items-center justify-between rounded-sm px-5 py-3.5 text-sm font-semibold transition-colors ${
              canAdd
                ? "bg-fire text-cream hover:bg-fire-bright"
                : "bg-bone/10 text-bone/40"
            }`}
          >
            <span>Adicionar</span>
            <span>{formatBRL(total)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
