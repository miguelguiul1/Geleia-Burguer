# Protótipo · cardápio online para hamburgueria

Um cardápio digital para hamburgueria de delivery: o cliente monta o pedido, personaliza os lanches e paga com Pix ou cartão pelo Mercado Pago, sem depender só dos apps de entrega.

**No ar:** https://geleia-burguer.vercel.app

> Protótipo independente, feito por mim como estudo de design e de produto. Não é o site oficial de nenhum estabelecimento e não tem vínculo com nenhum negócio. Nomes, marcas e imagens de terceiros que aparecem na demonstração pertencem aos seus donos.

## O que o protótipo resolve

Hamburgueria pequena paga uma comissão alta em cada pedido feito pelos apps de delivery. Um cardápio próprio permite vender direto para quem já conhece a casa:

- **Cardápio com categorias e destaques**, e um modal para escolher adicionais, bebida e opções de combo.
- **Carrinho** que acompanha a rolagem e mostra o total o tempo todo.
- **Checkout com Mercado Pago** (Pix, cartão e o que mais a conta aceitar) através de uma função serverless. O token nunca vai para o navegador.
- **Links para os apps de delivery e para o WhatsApp** para quem preferir pedir por lá.

## Tecnologias

React, TypeScript, Vite e Tailwind CSS no front. Uma função serverless da Vercel (`api/create-preference.js`) cria a preferência de pagamento no Mercado Pago. Deploy na Vercel.

## Rodando localmente

```bash
git clone https://github.com/miguelguiul1/Geleia-Burguer.git
cd Geleia-Burguer
npm install
npm run dev
```

O cardápio e o carrinho funcionam só com o front. Para testar o pagamento, use a CLI da Vercel (`vercel dev`) e um token de **teste** do Mercado Pago:

```bash
cp .env.example .env    # preencha MP_ACCESS_TOKEN com o token de teste
npx vercel dev
```

## Licença

O código está sob a licença [MIT](LICENSE). A licença não cobre marcas, logos, fotos nem textos de terceiros.
