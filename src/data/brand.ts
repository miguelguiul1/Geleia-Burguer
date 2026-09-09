/**
 * FONTE ÚNICA DE DADOS DA MARCA
 * ------------------------------------------------------------
 * CONFIRMADO = veio do Linktree oficial, da logo oficial ou do cardápio real
 * do iFood (colado diretamente por você — inclusive os modais de
 * personalização de cada item, usados em modifierGroups).
 * PENDENTE = ainda falta (Instagram e a página do iFood bloqueiam acesso
 * automatizado, então nada foi inventado — fotos de ambiente, endereço e
 * horário continuam sinalizados até você enviar).
 */
import { soloExtras, comboExtras, ofertaExtras, type ModifierGroup } from "./modifiers";

export const brand = {
  name: "Geléia Burguer",
  instagramHandle: "@geleiaburguer.oficial",
  logoUrl: "/logo.png",
  heroPhotoUrl: "/menu/x-bacon.webp",

  // CONFIRMADO — Linktree oficial
  links: {
    whatsappOrder: "https://wa.me/message/P44XRZA6KALBF1",
    ifood:
      "https://www.ifood.com.br/delivery/sao-paulo-sp/geleia-burger-veleiros/398c0663-f6f9-4df2-9b4a-2ceec58a1c82",
    keeta: "https://url-eu.mykeeta.com/11AofEAz",
    food99: "https://oia.99app.com/dlp9/E6uhzh",
    instagram: "https://www.instagram.com/geleiaburguer.oficial",
  },

  // CONFIRMADO — aba "Sobre" do perfil oficial no iFood
  location: {
    neighborhood: "Veleiros",
    city: "São Paulo - SP",
    fullAddress:
      "Avenida Coronel Octaviano de Freitas Costa, 503 - Veleiros, São Paulo - SP, CEP 04773-000",
    // Delivery-only: o perfil no iFood mostra "não abre" em todos os dias
    // porque esse campo é para atendimento presencial — a casa não tem
    // salão, funciona só por delivery pelos apps. Horário real de pedidos
    // ainda pendente de confirmação.
    hours: null as string | null,
    deliveryOnly: true,
    cnpj: "65.572.084/0001-83",
    mapEmbedUrl: null as string | null, // TODO: link do Google Maps
  },

  // CONFIRMADO — aba "Sobre" do perfil oficial no iFood + linguagem real do cardápio
  about: {
    headline: "Sabor defumado, direto da brasa.",
    story:
      "Hambúrgueres artesanais preparados com ingredientes selecionados, pão macio, carnes suculentas e muito sabor em cada mordida. Todo hambúrguer da Geléia Burguer é preparado na brasa — 100% carne bovina e aquele sabor defumado irresistível que só a casa entrega.",
  },

  // CONFIRMADO — colado diretamente do cardápio oficial no iFood
  // PENDENTE: foto de cada item (photoUrl)
  minOrder: "R$ 20,00",

  menu: [
    // Combos
    {
      id: "oferta-2-muita-fome",
      name: "Oferta Para 2 — Muita Fome",
      description:
        "2 hambúrgueres artesanais na brasa + acompanhamentos à escolha + 2 bebidas geladas. Sabor defumado irresistível, pra dividir... ou encarar sozinho se tiver coragem.",
      price: "A partir de R$ 86,51",
      category: "Combos",
      photoUrl: "/menu/oferta-2-muita-fome.webp",
      basePrice: 0,
      modifierGroups: ofertaExtras([
        { id: "x-salad-2", name: "X Salad 2.0", price: 34.9 },
        { id: "x-bacon-2", name: "X Bacon 2.0", price: 36.9 },
        { id: "x-salad-bacon-2", name: "X Salad Bacon 2.0", price: 38.9 },
        { id: "coalho-supreme", name: "Coalho Supreme", price: 39.8 },
      ]),
    },
    {
      id: "oferta-2",
      name: "Oferta Para 2",
      description:
        "2 hambúrgueres artesanais na brasa + acompanhamentos à escolha + 2 bebidas geladas.",
      price: "R$ 62,69",
      originalPrice: "R$ 64,90",
      category: "Combos",
      photoUrl: "/menu/oferta-2.webp",
      basePrice: 0,
      modifierGroups: ofertaExtras([
        { id: "x-burguer", name: "X Burguer", price: 22.99 },
        { id: "x-bacon", name: "X Bacon", price: 25.9 },
        { id: "x-salad", name: "X Salad", price: 23.99 },
      ]),
    },
    {
      id: "combo-bacon-2",
      name: "Combo Bacon 2.0",
      description:
        "Pão brioche, 2 hambúrgueres 100% carne bovina na brasa (120g cada), cheddar derretido, maionese artesanal de ervas e bacon crocante. Acompanha batata frita P e Coca-Cola 350ml.",
      price: "R$ 52,90",
      category: "Combos",
      photoUrl: "/menu/combo-bacon-2.webp",
      basePrice: 52.9,
      modifierGroups: comboExtras(false),
    },
    {
      id: "combo-x-bacon",
      name: "Combo X Bacon",
      description:
        "Pão brioche, 1 hambúrguer 100% carne bovina na brasa (120g), cheddar derretido, maionese artesanal de ervas e bacon crocante. Acompanha batata frita P e Coca-Cola 350ml. Serve 1 pessoa.",
      price: "R$ 44,90",
      category: "Combos",
      photoUrl: "/menu/combo-x-bacon.webp",
      basePrice: 44.9,
      modifierGroups: comboExtras(true),
    },
    {
      id: "combo-x-burger",
      name: "Combo X Burger",
      description:
        "Pão brioche, hambúrguer 100% carne bovina na brasa (120g), cheddar derretido e maionese original. Acompanha batata frita P e Coca-Cola 350ml.",
      price: "R$ 36,90",
      category: "Combos",
      photoUrl: "/menu/combo-x-burger.webp",
      basePrice: 36.9,
      modifierGroups: comboExtras(true),
    },
    {
      id: "combo-salad-2",
      name: "Combo Salad 2.0",
      description:
        "Pão brioche, 2 hambúrgueres 100% carne bovina na brasa (120g cada), cheddar derretido, alface americana, tomate e maionese artesanal da casa. Acompanha batata frita P e Coca-Cola 350ml. Serve 1 pessoa.",
      price: "R$ 48,90",
      category: "Combos",
      photoUrl: "/menu/combo-salad-2.webp",
      basePrice: 48.9,
      modifierGroups: comboExtras(true),
    },
    {
      id: "combo-salad",
      name: "Combo Salad",
      description:
        "Pão brioche, 2 hambúrgueres 100% carne bovina na brasa (120g cada), cheddar derretido, alface americana, tomate e maionese artesanal da casa. Acompanha batata frita P e Coca-Cola 350ml. Serve 1 pessoa.",
      price: "R$ 42,90",
      category: "Combos",
      photoUrl: "/menu/combo-salad.webp",
      basePrice: 42.9,
      modifierGroups: comboExtras(true),
    },
    {
      id: "combo-x-salad-bacon-2",
      name: "Combo X Salad Bacon 2.0",
      description:
        "Pão brioche, 2 hambúrgueres 100% carne bovina na brasa (120g cada), cheddar derretido, alface americana, tomate, bacon crocante e maionese artesanal de ervas. Acompanha batata frita P e Coca-Cola 350ml. Serve 1 pessoa.",
      price: "R$ 50,90",
      category: "Combos",
      photoUrl: "/menu/combo-x-salad-bacon-2.webp",
      basePrice: 50.9,
      modifierGroups: comboExtras(true),
    },
    // Hambúrgueres
    {
      id: "duplo-bacon",
      name: "Duplo Bacon",
      description:
        "Pão brioche, 2 hambúrgueres 100% carne bovina na brasa (120g cada), cheddar derretido, maionese artesanal de ervas e bacon crocante.",
      price: "R$ 36,90",
      category: "Hambúrgueres",
      photoUrl: "/menu/duplo-bacon.webp",
      basePrice: 36.9,
      modifierGroups: soloExtras(),
    },
    {
      id: "x-bacon",
      name: "X Bacon",
      description:
        "Pão brioche, 1 hambúrguer 100% carne bovina na brasa (120g), cheddar derretido, maionese artesanal de ervas e bacon crocante.",
      price: "R$ 26,90",
      category: "Hambúrgueres",
      photoUrl: "/menu/x-bacon.webp",
      basePrice: 26.9,
      modifierGroups: soloExtras(),
    },
    {
      id: "x-salad",
      name: "X Salad",
      description:
        "Pão brioche, 1 hambúrguer 100% carne bovina na brasa (120g), 2 fatias de cheddar, maionese especial da casa, tomate, alface e cebola roxa.",
      price: "R$ 27,90",
      category: "Hambúrgueres",
      photoUrl: "/menu/x-salad.webp",
      basePrice: 27.9,
      modifierGroups: soloExtras(),
    },
    {
      id: "x-burger",
      name: "X Burger",
      description:
        "Pão brioche, 1 hambúrguer 100% carne bovina na brasa (120g), cheddar derretido e maionese original.",
      price: "R$ 21,90",
      category: "Hambúrgueres",
      photoUrl: "/menu/x-burger.webp",
      basePrice: 21.9,
      modifierGroups: soloExtras(),
    },
    {
      id: "coalho-supreme",
      name: "Coalho Supreme",
      description:
        "Pão brioche, 2 hambúrgueres 100% carne bovina na brasa (120g cada), cheddar derretido, alface, tomate, maionese original, bacon crocante e queijo coalho.",
      price: "R$ 38,90",
      category: "Hambúrgueres",
      photoUrl: "/menu/coalho-supreme.webp",
      basePrice: 38.9,
      modifierGroups: soloExtras(),
    },
    {
      id: "salad-bacon-2",
      name: "Salad Bacon 2.0",
      description:
        "Pão brioche, 2 hambúrgueres 100% carne bovina na brasa (120g cada), cheddar derretido, alface, tomate e bacon crocante.",
      price: "R$ 34,90",
      category: "Hambúrgueres",
      photoUrl: "/menu/salad-bacon-2.webp",
      basePrice: 34.9,
      modifierGroups: soloExtras(),
    },
  ] as MenuItem[],

  // CONFIRMADO — o item de topo em "Destaques" no cardápio oficial do iFood
  featured: {
    id: "oferta-2-muita-fome",
    name: "Oferta Para 2 — Muita Fome",
    description:
      "2 hambúrgueres artesanais na brasa + acompanhamentos à escolha + 2 bebidas geladas. Sabor defumado irresistível que só a Geléia Burguer na Brasa entrega — perfeita pra dividir, ou encarar sozinho se tiver coragem.",
    price: "A partir de R$ 86,51",
    photoUrl: "/menu/oferta-2-muita-fome.webp",
    basePrice: 0,
    modifierGroups: ofertaExtras([
      { id: "x-salad-2", name: "X Salad 2.0", price: 34.9 },
      { id: "x-bacon-2", name: "X Bacon 2.0", price: 36.9 },
      { id: "x-salad-bacon-2", name: "X Salad Bacon 2.0", price: 38.9 },
      { id: "coalho-supreme", name: "Coalho Supreme", price: 39.8 },
    ]),
  } as FeaturedItem,
};

export type MenuCategory =
  | "Hambúrgueres"
  | "Acompanhamentos"
  | "Bebidas"
  | "Sobremesas"
  | "Combos";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  category: MenuCategory;
  photoUrl: string | null;
  basePrice: number;
  modifierGroups: ModifierGroup[];
}

export interface FeaturedItem {
  id: string;
  name: string;
  description: string;
  price: string;
  photoUrl: string | null;
  basePrice: number;
  modifierGroups: ModifierGroup[];
}
