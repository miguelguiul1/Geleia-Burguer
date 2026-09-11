// Vercel serverless function — cria uma preferência de pagamento no
// Mercado Pago e devolve a URL do checkout hospedado (Pix, cartão, etc.).
// Requer a variável de ambiente MP_ACCESS_TOKEN configurada no projeto
// Vercel (Settings → Environment Variables), nunca exposta no front-end.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido." });
    return;
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    res
      .status(500)
      .json({ error: "Pagamento online ainda não configurado no servidor." });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const { items, payerName, externalReference } = body || {};

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: "Carrinho vazio." });
    return;
  }

  const sanitizedItems = items.map((item) => ({
    title: String(item?.title || "Item").slice(0, 200),
    quantity: Math.max(1, Math.floor(Number(item?.quantity) || 1)),
    unit_price: Math.max(0.01, Number(item?.unit_price) || 0),
    currency_id: "BRL",
  }));

  const origin = req.headers.origin || `https://${req.headers.host}`;

  try {
    const mpResponse = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          items: sanitizedItems,
          payer: payerName ? { name: String(payerName).slice(0, 100) } : undefined,
          back_urls: {
            success: `${origin}/?pagamento=sucesso`,
            failure: `${origin}/?pagamento=falha`,
            pending: `${origin}/?pagamento=pendente`,
          },
          auto_return: "approved",
          external_reference: externalReference
            ? String(externalReference).slice(0, 100)
            : undefined,
        }),
      }
    );

    const data = await mpResponse.json();

    if (!mpResponse.ok) {
      res
        .status(mpResponse.status)
        .json({ error: data?.message || "Falha ao criar o pagamento." });
      return;
    }

    res.status(200).json({
      checkoutUrl: data.init_point || data.sandbox_init_point,
    });
  } catch {
    res.status(502).json({ error: "Erro ao conectar com o Mercado Pago." });
  }
}
