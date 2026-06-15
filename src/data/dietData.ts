
export const TARGETS = { kcal: 2600, pro: 210, ch: 280, fat: 71 };

export interface FoodItem {
  name: string;
  qty: string;
  kcal: number;
  pro: number;
  ch: number;
  fat: number;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  items: FoodItem[];
  variants?: FoodItem[];
}

export const BASE_MEALS: Meal[] = [
  {
    id: 'desayuno',
    name: 'Desayuno',
    time: '7:45',
    items: [
      { name: 'Pan lactal casero', qty: '80g', kcal: 212, pro: 7, ch: 38, fat: 3 },
      { name: 'Mermelada', qty: '40g', kcal: 32, pro: 0, ch: 8, fat: 0 },
      { name: 'Manteca de maní', qty: '15g', kcal: 90, pro: 4, ch: 3, fat: 8 },
      { name: 'Huevos enteros', qty: '4 unid', kcal: 280, pro: 24, ch: 2, fat: 20 },
      { name: 'Claras', qty: '4 unid', kcal: 68, pro: 14, ch: 1, fat: 0 },
    ]
  },
  {
    id: 'almuerzo',
    name: 'Almuerzo',
    time: '12:30',
    items: [
      { name: 'Pechuga de pollo hervida', qty: '200g cocida', kcal: 220, pro: 46, ch: 0, fat: 4 },
      { name: 'Arroz', qty: '80g crudo', kcal: 284, pro: 6, ch: 62, fat: 1 },
      { name: 'Brócoli', qty: '150g', kcal: 51, pro: 4, ch: 10, fat: 1 },
    ],
    variants: [
      { name: 'Papa hervida (en vez de arroz)', qty: '250g', kcal: 215, pro: 5, ch: 50, fat: 0 },
      { name: 'Batata hervida (en vez de arroz)', qty: '220g', kcal: 198, pro: 4, ch: 46, fat: 0 },
    ]
  },
  {
    id: 'merienda',
    name: 'Merienda',
    time: '18:00',
    items: [
      { name: 'Pan lactal casero', qty: '80g', kcal: 212, pro: 7, ch: 38, fat: 3 },
      { name: 'Mermelada', qty: '40g', kcal: 32, pro: 0, ch: 8, fat: 0 },
      { name: 'Huevos enteros', qty: '4 unid', kcal: 280, pro: 24, ch: 2, fat: 20 },
      { name: 'Claras', qty: '4 unid', kcal: 68, pro: 14, ch: 1, fat: 0 },
    ]
  },
  {
    id: 'cena',
    name: 'Cena',
    time: '22:15',
    items: [
      { name: 'Pechuga de pollo hervida', qty: '200g cocida', kcal: 220, pro: 46, ch: 0, fat: 4 },
      { name: 'Arroz', qty: '80g crudo', kcal: 284, pro: 6, ch: 62, fat: 1 },
      { name: 'Brócoli', qty: '150g', kcal: 51, pro: 4, ch: 10, fat: 1 },
    ],
    variants: [
      { name: 'Papa hervida (en vez de arroz)', qty: '250g', kcal: 215, pro: 5, ch: 50, fat: 0 },
      { name: 'Batata hervida (en vez de arroz)', qty: '220g', kcal: 198, pro: 4, ch: 46, fat: 0 },
    ]
  },
];

export interface SuppItem {
  name: string;
  dose: string;
  why: string;
  caff: number;
}

export interface SuppBlock {
  time: string;
  title: string;
  items: SuppItem[];
}

export const SUPP_SCHEDULE: SuppBlock[] = [
  {
    time: '6:30 · AL DESPERTAR', title: 'Despertar', items: [
      { name: 'Vaso de agua', dose: '500ml', why: 'Hidratación base', caff: 0 },
    ]
  },
  {
    time: '6:45 · PRE-CARDIO', title: 'Pre-cardio ayunas', items: [
      { name: 'Café expresso', dose: '1 taza (~90mg caff)', why: 'Energía cardio en ayunas', caff: 90 },
    ]
  },
  {
    time: '7:45 · CON DESAYUNO', title: 'Con el desayuno', items: [
      { name: 'Multivitamínico (Gravitón Plus)', dose: '1 comprimido', why: 'Base vitamínica y mineral', caff: 0 },
      { name: 'Vitamina D3', dose: '2000 UI', why: 'El multi solo trae 200 UI — insuficiente', caff: 0 },
      { name: 'Omega 3', dose: '2–3g (EPA+DHA)', why: 'Antiinflamatorio, muñeca post-cirugía', caff: 0 },
      { name: 'Vitamina C', dose: '500mg', why: 'El multi trae 120mg — necesitás 500mg para el colágeno', caff: 0 },
      { name: 'Creatina', dose: '5g', why: 'Cualquier momento, con comida es perfecto', caff: 0 },
    ]
  },
  {
    time: '19:30 · PRE-GYM', title: 'Pre-entreno (30 min antes)', items: [
      { name: 'RAW Essential Pre Workout', dose: '1 scoop (13.3g)', why: '200mg caff + citrulina + beta alanina + tirosina', caff: 200 },
    ]
  },
  {
    time: '22:15 · CON CENA', title: 'Con la cena', items: [
      { name: 'Magnesio glicinato', dose: '300–400mg', why: 'Sueño + recuperación muscular', caff: 0 },
      { name: 'Ashwagandha KSM-66', dose: '300–600mg', why: 'Baja cortisol, mejora sueño y testosterona', caff: 0 },
    ]
  },
  {
    time: '23:00 · AL ACOSTARSE', title: 'Al acostarse', items: [
      { name: 'Melatonina', dose: '0.5mg (NO más)', why: 'Con más te despertás aturdido', caff: 0 },
    ]
  },
];
