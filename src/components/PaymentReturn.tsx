import { useEffect, useState } from "react";
import { CheckCircle2, Clock, XCircle, ArrowUpRight } from "lucide-react";
import { brand } from "../data/brand";

type Status = "sucesso" | "pendente" | "falha";

export function PaymentReturn() {
  const [status, setStatus] = useState<Status | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pagamento = params.get("pagamento");
    if (pagamento !== "sucesso" && pagamento !== "pendente" && pagamento !== "falha") {
      return;
    }
    setStatus(pagamento);
    setMessage(sessionStorage.getItem("gb_pending_whatsapp_message"));
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  if (!status) return null;

  function handleConfirm() {
    if (!message) return;
    const url = `${brand.links.whatsappOrder}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    sessionStorage.removeItem("gb_pending_whatsapp_message");
    setStatus(null);
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-char-2/90 px-5 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-char px-8 py-10 text-center">
        {status === "sucesso" && (
          <>
            <CheckCircle2 size={48} className="mx-auto text-fire-bright" />
            <p className="mt-4 text-lg font-semibold text-cream">
              Pagamento aprovado!
            </p>
            <p className="mt-2 text-sm text-bone/60">
              Só falta confirmar o pedido no WhatsApp pra a {brand.name}{" "}
              começar a preparar.
            </p>
          </>
        )}

        {status === "pendente" && (
          <>
            <Clock size={48} className="mx-auto text-fire-bright" />
            <p className="mt-4 text-lg font-semibold text-cream">
              Pagamento em análise
            </p>
            <p className="mt-2 text-sm text-bone/60">
              Assim que for aprovado você recebe a confirmação. Já pode
              avisar a {brand.name} pelo WhatsApp.
            </p>
          </>
        )}

        {status === "falha" && (
          <>
            <XCircle size={48} className="mx-auto text-red-400" />
            <p className="mt-4 text-lg font-semibold text-cream">
              Pagamento não concluído
            </p>
            <p className="mt-2 text-sm text-bone/60">
              Você pode tentar de novo pelo carrinho ou pedir direto pelo
              WhatsApp.
            </p>
          </>
        )}

        {message && status !== "falha" && (
          <button
            type="button"
            onClick={handleConfirm}
            className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-fire px-6 py-3 text-sm font-semibold text-cream hover:bg-fire-bright"
          >
            Confirmar pedido no WhatsApp
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        )}

        <button
          type="button"
          onClick={() => setStatus(null)}
          className="mt-4 text-xs text-bone/40 underline"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
