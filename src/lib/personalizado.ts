export type CustomizableProduct = {
  id: string;
  name: string;
  description: string;
  customizationType: string;
  minQty: string;
  printColors: string;
  image: string;
};

export const customizableProducts: CustomizableProduct[] = [
  {
    id: "cust-bolsas",
    name: "Bolsas de papel",
    description: "Bolsas kraft con manija retorcida o plana.",
    customizationType: "Impresión 1 o 2 tintas (logotipo, datos, redes sociales, etc.)",
    minQty: "500 unidades",
    printColors: "1 o 2 tintas",
    image: "https://picsum.photos/seed/gp-cust-bolsas/600/450",
  },
  {
    id: "cust-vasos",
    name: "Vasos de papel",
    description: "Vasos para bebidas frías o calientes (4oz a 16oz).",
    customizationType: "Impresión 1 a 3 tintas en el cuerpo del vaso.",
    minQty: "1.000 unidades",
    printColors: "1 a 3 tintas",
    image: "https://picsum.photos/seed/gp-cust-vasos/600/450",
  },
  {
    id: "cust-cajas",
    name: "Cajas de cartón",
    description: "Cajas para pizza, tortas, hamburguesas y delivery.",
    customizationType: "Impresión 1 a 2 tintas en tapa o laterales.",
    minQty: "300 unidades",
    printColors: "1 o 2 tintas",
    image: "https://picsum.photos/seed/gp-cust-cajas/600/450",
  },
  {
    id: "cust-papel-antigrasa",
    name: "Papel Antigrasa",
    description: "Papel antigrasa personalizado para envolver alimentos.",
    customizationType: "Impresión 1 tinta con diseño repetido o full print.",
    minQty: "1.000 hojas",
    printColors: "1 tinta",
    image: "https://picsum.photos/seed/gp-cust-papel/600/450",
  },
  {
    id: "cust-etiquetas",
    name: "Etiquetas y Stickers",
    description: "Etiquetas adhesivas personalizadas para envases y packaging.",
    customizationType: "Impresión full color en papel o vinilo.",
    minQty: "500 unidades",
    printColors: "Full color",
    image: "https://picsum.photos/seed/gp-cust-etiquetas/600/450",
  },
];
