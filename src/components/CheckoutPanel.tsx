import { useState } from "react";
import { X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { brand } from "../data/brand";
import { formatBRL } from "../utils/format";

type DeliveryType = "delivery" | "retirada";
type PaymentMethod =
  | "Pagar agora (Pix/Cartão)"
  | "Pix"
  | "Cartão na entrega"
  | "Dinheiro na entrega";

function buildWhatsappMessage(params: {
  lines: ReturnType<typeof useCart>["lines"];
  subtotal: number;
  name: string;
  phone: string;
  deliveryType: DeliveryType;
  address: string;
  payment: string;
  notes: string;
}) {
  const { lines, subtotal, name, phone, deliveryType, address, payment, notes } =
    params;

  const itemsText = lines
    .map((line) => {
      const optionsTotal = line.options.reduce((s, o) => s + o.price, 0);
      const lineTotal = (line.unitPrice + optionsTotal) * line.quantity;
      const optsText = line.options.length
        ? "\n   - " + line.options.map((o) => o.optionName).join("\n   - ")
        : "";
      const commentText = line.comment ? `\n   obs: ${line.comment}` : "";
      return `${line.quantity}x ${line.itemName}${optsText}${commentText}\n   ${formatBRL(
        lineTotal
      )}`;
    })
    .join("\n\n");

  return [
    `Pedido - ${brand.name}`,
    "",
    itemsText,
    "",
    `Subtotal: ${formatBRL(subtotal)}`,
    "",
    `Cliente: ${name}`,
    `Telefone: ${phone}`,
    deliveryType === "delivery"
      ? `Entrega: Delivery\nEndereço: ${address}`
      : "Entrega: Retirada no local",
    `Pagamento: ${payment}`,
    notes ? `Observações: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function CheckoutPanel() {
  const { isCheckoutOpen, closeCheckout, lines, subtotal, clear } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("delivery");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>(
    "Pagar agora (Pix/Cartão)"
  );
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const canSubmit =
    name.trim().length > 1 &&
    phone.trim().length >= 8 &&
    (deliveryType === "retirada" || address.trim().length > 5);

  function handleSubmit() {
    if (!canSubmit) return;
    const message = buildWhatsappMessage({
      lines,
      subtotal,
      name,
      phone,
      deliveryType,
      address,
      payment,
      notes,
    });
    const url = `${brand.links.whatsappOrder}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    clear();
    setSent(true);
  }

  async function handlePayOnline() {
    if (!canSubmit || paying) return;
    setPayError(null);
    setPaying(true);

    const confirmationMessage = buildWhatsappMessage({
      lines,
      subtotal,
      name,
      phone,
      deliveryType,
      address,
      payment: "Pago online (Mercado Pago)",
      notes,
    });

    const items = lines.map((line) => ({
      title: line.itemName,
      quantity: line.quantity,
      unit_price:
        line.unitPrice + line.options.reduce((s, o) => s + o.price, 0),
    }));

    try {
      const response = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          payerName: name,
          externalReference: `gb-${Date.now()}`,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.checkoutUrl) {
        setPayError(
          data.error ||
            "Não foi possível iniciar o pagamento agora. Tente de novo ou peça pelo WhatsApp."
        );
        setPaying(false);
        return;
      }

      sessionStorage.setItem("gb_pending_whatsapp_message", confirmationMessage);
      clear();
      window.location.href = data.checkoutUrl;
    } catch {
      setPayError(
        "Erro de conexão com o pagamento. Tente de novo ou peça pelo WhatsApp."
      );
      setPaying(false);
    }
  }

  function handleClose() {
    closeCheckout();
    if (sent) {
      setSent(false);
      setName("");
      setPhone("");
      setAddress("");
      setNotes("");
    }
  }

  return (
    <div className="fixed inset-0 z-[65] flex items-end justify-center sm:items-center">
      <button
        aria-label="Fechar"
        onClick={handleClose}
        className="absolute inset-0 bg-char-2/80 backdrop-blur-sm"
      />

      <div className="relative flex max-h-[92svh] w-full flex-col overflow-hidden bg-char sm:max-w-md">
        <div className="flex items-center justify-between border-b border-bone/10 px-5 py-4">
          <h2 className="font-display text-xl italic font-bold text-cream">
            {sent ? "Pedido pronto" : "Finalizar pedido"}
          </h2>
          <button
            aria-label="Fechar"
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center text-bone/70 hover:text-cream"
          >
            <X size={22} />
          </button>
        </div>

        {sent ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-14 text-center">
            <CheckCircle2 size={48} className="text-fire-bright" />
            <p className="text-lg font-semibold text-cream">
              Seu pedido foi aberto no WhatsApp
            </p>
            <p className="text-sm text-bone/60">
              É só conferir os itens e apertar enviar por lá — a{" "}
              {brand.name} confirma o pedido e o pagamento diretamente com
              você.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-2 rounded-sm border border-bone/30 px-6 py-3 text-sm font-semibold text-cream hover:border-bone/60"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <p className="mb-5 text-sm leading-relaxed text-bone/60">
                Pague agora com Pix ou cartão, ou prefira combinar direto
                pelo WhatsApp — o pedido completo (com preço) é confirmado
                com a {brand.name} de qualquer jeito.
              </p>

              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-cream">
                    Nome
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="border border-bone/15 bg-char-2 px-3 py-2.5 text-sm text-cream placeholder:text-bone/30 focus:border-fire"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-cream">
                    Telefone / WhatsApp
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 90000-0000"
                    inputMode="tel"
                    className="border border-bone/15 bg-char-2 px-3 py-2.5 text-sm text-cream placeholder:text-bone/30 focus:border-fire"
                  />
                </label>

                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-cream">
                    Entrega
                  </span>
                  <div className="flex gap-2">
                    {(["delivery", "retirada"] as DeliveryType[]).map(
                      (type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setDeliveryType(type)}
                          className={`flex-1 rounded-sm border px-3 py-2.5 text-sm font-semibold transition-colors ${
                            deliveryType === type
                              ? "border-fire bg-fire/10 text-cream"
                              : "border-bone/15 text-bone/60"
                          }`}
                        >
                          {type === "delivery" ? "Delivery" : "Retirar no local"}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {deliveryType === "delivery" && (
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold text-cream">
                      Endereço completo
                    </span>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rua, número, bairro, complemento"
                      className="border border-bone/15 bg-char-2 px-3 py-2.5 text-sm text-cream placeholder:text-bone/30 focus:border-fire"
                    />
                  </label>
                )}

                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-cream">
                    Pagamento
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        "Pagar agora (Pix/Cartão)",
                        "Pix",
                        "Cartão na entrega",
                        "Dinheiro na entrega",
                      ] as PaymentMethod[]
                    ).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => {
                          setPayment(method);
                          setPayError(null);
                        }}
                        className={`rounded-sm border px-3 py-2 text-xs font-semibold transition-colors ${
                          payment === method
                            ? "border-fire bg-fire/10 text-cream"
                            : "border-bone/15 text-bone/60"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {payError && (
                  <p className="text-sm text-red-400">{payError}</p>
                )}

                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-cream">
                    Observações (opcional)
                  </span>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value.slice(0, 140))}
                    rows={2}
                    placeholder="Ponto de referência, troco para..., etc."
                    className="resize-none border border-bone/15 bg-char-2 px-3 py-2.5 text-sm text-cream placeholder:text-bone/30 focus:border-fire"
                  />
                </label>
              </div>
            </div>

            <div className="border-t border-bone/10 bg-char-2 px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-bone/60">Total do pedido</span>
                <span className="font-display text-xl italic font-black text-cream">
                  {formatBRL(subtotal)}
                </span>
              </div>
              <button
                type="button"
                onClick={
                  payment === "Pagar agora (Pix/Cartão)"
                    ? handlePayOnline
                    : handleSubmit
                }
                disabled={!canSubmit || paying}
                className={`group flex w-full items-center justify-center gap-2 rounded-sm px-6 py-4 text-base font-semibold transition-colors ${
                  canSubmit && !paying
                    ? "bg-fire text-cream hover:bg-fire-bright"
                    : "bg-bone/10 text-bone/40"
                }`}
              >
                {payment === "Pagar agora (Pix/Cartão)"
                  ? paying
                    ? "Redirecionando..."
                    : "Pagar agora"
                  : "Enviar pedido pelo WhatsApp"}
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
