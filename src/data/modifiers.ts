export interface ModifierOption {
  id: string;
  name: string;
  price: number; // acréscimo em reais, 0 = incluso
}

export interface ModifierGroup {
  id: string;
  title: string;
  required: boolean;
  min: number;
  max: number;
  options: ModifierOption[];
}

/** Grupos opcionais que aparecem nos lanches vendidos avulsos (sem combo). */
export function soloExtras(): ModifierGroup[] {
  return [
    {
      id: "bebida",
      title: "Que tal uma bebida para acompanhar?",
      required: false,
      min: 0,
      max: 1,
      options: [
        { id: "guarana-zero", name: "Guaraná Zero lata 350ml", price: 7.9 },
        { id: "guarana", name: "Guaraná lata 350ml", price: 7.9 },
        { id: "coca-365", name: "Coca-Cola lata 350ml", price: 7.9 },
      ],
    },
    {
      id: "turbinar",
      title: "Vamos turbinar o seu hambúrguer?",
      required: false,
      min: 0,
      max: 1,
      options: [
        { id: "hamburguer-extra", name: "Hambúrguer extra", price: 8.0 },
        { id: "molho-ervas", name: "Molho artesanal de ervas", price: 5.0 },
        { id: "cheddar-2", name: "2 fatias de cheddar", price: 5.0 },
        { id: "bacon-2", name: "2 fatias de bacon", price: 5.0 },
      ],
    },
    {
      id: "acompanhamento",
      title: "Que tal um acompanhamento?",
      required: false,
      min: 0,
      max: 1,
      options: [
        { id: "batata-p", name: "Batata P", price: 12.9 },
        { id: "batata-g", name: "Batata G", price: 15.9 },
      ],
    },
  ];
}

/** Grupos dos combos (já incluem bebida e batata P; batata G e molho são upgrade pago). */
export function comboExtras(withMolho: boolean): ModifierGroup[] {
  const groups: ModifierGroup[] = [
    {
      id: "bebida",
      title: "Escolha a bebida do seu combo",
      required: true,
      min: 1,
      max: 1,
      options: [
        { id: "guarana-zero", name: "Guaraná Zero lata 350ml", price: 0 },
        { id: "guarana", name: "Guaraná lata 350ml", price: 0 },
        { id: "coca-350", name: "Coca-Cola lata 350ml", price: 0 },
      ],
    },
    {
      id: "acompanhamento",
      title: "Escolha o acompanhamento do seu combo",
      required: true,
      min: 1,
      max: 1,
      options: [
        { id: "batata-p", name: "Batata P", price: 0 },
        { id: "batata-g", name: "Batata G", price: 7.9 },
      ],
    },
  ];
  if (withMolho) {
    groups.push({
      id: "molho",
      title: "Molho especial da casa",
      required: false,
      min: 0,
      max: 2,
      options: [{ id: "molho-especial", name: "Molho especial da casa", price: 5.0 }],
    });
  }
  return groups;
}

/** Grupos das ofertas "Para 2" — tudo é montado a partir das escolhas obrigatórias. */
export function ofertaExtras(lanches: ModifierOption[]): ModifierGroup[] {
  return [
    {
      id: "lanches",
      title: "Escolha seus 2 lanches",
      required: true,
      min: 2,
      max: 2,
      options: lanches,
    },
    {
      id: "bebidas",
      title: "Escolha suas duas bebidas",
      required: true,
      min: 2,
      max: 2,
      options: [
        { id: "guarana", name: "Guaraná 350ml", price: 3.9 },
        { id: "guarana-zero", name: "Guaraná Zero lata 350ml", price: 3.9 },
        { id: "coca-350", name: "Coca-Cola lata 350ml", price: 3.9 },
      ],
    },
    {
      id: "acompanhamento",
      title: "Escolha os acompanhamentos da oferta",
      required: true,
      min: 1,
      max: 1,
      options: [
        { id: "batata-p", name: "Batata P", price: 8.9 },
        { id: "batata-p-2", name: "2x Batata P", price: 15.9 },
      ],
    },
    {
      id: "molho",
      title: "Molho para acompanhar a oferta",
      required: false,
      min: 0,
      max: 1,
      options: [
        { id: "maionese-verde", name: "Maionese verde", price: 4.0 },
        { id: "molho-especial", name: "Molho especial da casa", price: 4.0 },
        { id: "maionese-original", name: "Maionese original", price: 4.0 },
      ],
    },
  ];
}
