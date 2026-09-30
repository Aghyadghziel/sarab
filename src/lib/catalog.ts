import type { L10n } from './i18n';

/**
 * SARAB is a demo store built by SIMA Studio. The pieces, prices and photographs
 * are designed for the demo; the checkout says so before anyone could pay.
 */
export type Category = 'women' | 'men' | 'accessories';

export type Colour = {
  id: string;
  name: L10n;
  swatch: string;
  images: { studio: string; campaign: string; detail?: string };
  /** A short wind loop shown over the campaign image. */
  loop?: string;
};

export type Product = {
  slug: string;
  name: L10n;
  category: Category;
  /** Shown in the men's edit too. */
  unisex?: boolean;
  price: number;
  sizes: string[];
  colours: Colour[];
  summary: L10n;
  description: L10n;
  fit: L10n;
  fabric: L10n;
  /** Pieces to wear with it, by slug. */
  pairs: string[];
};

const APPAREL = ['XS', 'S', 'M', 'L', 'XL'];
const img = (slug: string, colour: string) => ({
  studio: `/img/p/${slug}-${colour}-studio.webp`,
  campaign: `/img/p/${slug}-${colour}-campaign.webp`,
});

export const PRODUCTS: Product[] = [
  {
    slug: 'dahna-coat',
    name: { en: 'Dahna coat', ar: 'معطف الدهناء' },
    category: 'women',
    price: 3450,
    sizes: APPAREL,
    colours: [
      { id: 'sand', name: { en: 'Sand', ar: 'رملي' }, swatch: '#b8946a', images: { ...img('dahna', 'sand'), detail: '/img/p/dahna-sand-detail.webp' } },
      { id: 'night', name: { en: 'Night', ar: 'نيلي' }, swatch: '#1d2540', images: img('dahna', 'night') },
    ],
    summary: { en: 'Long coat in double-faced wool', ar: 'معطف طويل من الصوف مزدوج الوجه' },
    description: {
      en: 'A long coat in double-faced wool, cut straight from a dropped shoulder and finished by hand at every edge. It has no lining, so it stays light enough for a Riyadh winter. Hidden buttons, two side pockets and a deep back vent that opens as you walk.',
      ar: 'معطف طويل من الصوف مزدوج الوجه، بقصّة مستقيمة تبدأ من كتف منسدل، وحوافّه مشطّبة يدويًا. بلا بطانة، فيبقى خفيفًا بما يكفي لشتاء الرياض. أزرار مخفية، جيبان جانبيان، وفتحة خلفية عميقة تنفتح مع الخطوة.',
    },
    fit: {
      en: 'Relaxed fit. Falls to the ankle on a 170 cm frame. Take your usual size.',
      ar: 'قصّة مريحة. يصل إلى الكاحل على طول 170 سم. اختاري مقاسك المعتاد.',
    },
    fabric: {
      en: '100% wool. Dry clean only. Keep it on a wide hanger.',
      ar: '100% صوف. تنظيف جاف فقط. يُحفظ على علّاقة عريضة.',
    },
    pairs: ['shamal-scarf', 'nafud-sandal', 'fajr-knit'],
  },
  {
    slug: 'layl-abaya',
    name: { en: 'Layl abaya', ar: 'عباءة ليل' },
    category: 'women',
    price: 2150,
    sizes: APPAREL,
    colours: [{ id: 'ink', name: { en: 'Ink', ar: 'حبري' }, swatch: '#16161a', images: { ...img('layl', 'ink'), detail: '/img/p/layl-ink-detail.webp' } }],
    summary: { en: 'Open abaya in matte crepe', ar: 'عباءة مفتوحة من الكريب المطفي' },
    description: {
      en: 'An open abaya in heavy matte crepe with wide kimono sleeves. A fine bone-white piping traces the opening and the cuffs. It falls in one straight line and keeps its shape through the day.',
      ar: 'عباءة مفتوحة من الكريب المطفي الثقيل، بأكمام كيمونو واسعة. تحدّد فتحتها وأطراف أكمامها حاشية رفيعة بلون العاج. تنسدل بخط واحد مستقيم وتحافظ على شكلها طوال اليوم.',
    },
    fit: {
      en: 'Straight, generous fit. Floor length on a 168 cm frame. Take your usual size.',
      ar: 'قصّة مستقيمة واسعة. تصل إلى الأرض على طول 168 سم. اختاري مقاسك المعتاد.',
    },
    fabric: {
      en: '70% triacetate, 30% polyester. Hand wash cold or dry clean.',
      ar: '70% تراي أسيتات، 30% بوليستر. غسيل يدوي بماء بارد أو تنظيف جاف.',
    },
    pairs: ['dahna-coat', 'qafilah-tote', 'nafud-sandal'],
  },
  {
    slug: 'hubub-trouser',
    name: { en: 'Hubub trouser', ar: 'بنطلون هبوب' },
    category: 'women',
    price: 890,
    sizes: APPAREL,
    colours: [{ id: 'sand', name: { en: 'Sand', ar: 'رملي' }, swatch: '#cdb592', images: img('hubub', 'sand') }],
    summary: { en: 'Wide trouser in washed linen', ar: 'بنطلون واسع من الكتان المغسول' },
    description: {
      en: 'High-waisted trousers in washed linen, with two deep front pleats and a leg wide enough to move with every step. Side pockets and a flat front waistband.',
      ar: 'بنطلون بخصر عالٍ من الكتان المغسول، بثنيتين أماميتين عميقتين وساق واسعة تتحرك مع كل خطوة. جيبان جانبيان وحزام أمامي مسطّح.',
    },
    fit: {
      en: 'High rise, very wide leg. Full length with a flat sandal. Take your usual size.',
      ar: 'خصر عالٍ وساق واسعة جدًا. بطول كامل مع صندل مسطّح. اختاري مقاسك المعتاد.',
    },
    fabric: {
      en: '100% linen, garment washed. Machine wash at 30°C, line dry.',
      ar: '100% كتان مغسول بعد الخياطة. غسيل آلي على 30 درجة، وتجفيف على الحبل.',
    },
    pairs: ['fajr-knit', 'nafud-sandal', 'qafilah-tote'],
  },
  {
    slug: 'fajr-knit',
    name: { en: 'Fajr knit', ar: 'سويتر فجر' },
    category: 'women',
    price: 1250,
    sizes: APPAREL,
    colours: [{ id: 'bone', name: { en: 'Bone', ar: 'عاجي' }, swatch: '#ece4d6', images: { ...img('fajr', 'bone'), detail: '/img/p/fajr-bone-detail.webp' } }],
    summary: { en: 'Funnel-neck sweater in merino', ar: 'سويتر برقبة عالية من المرينو' },
    description: {
      en: 'An oversized sweater in fine-gauge merino with a high funnel neck. The ribbed sleeves are cut long, to reach over the hand on cold mornings.',
      ar: 'سويتر واسع من صوف المرينو الناعم برقبة عالية. أكمامه المضلّعة طويلة لتغطي اليد في الصباحات الباردة.',
    },
    fit: {
      en: 'Oversized. Size down for a closer fit.',
      ar: 'قصّة واسعة. اختاري مقاسًا أصغر لقصّة أقرب للجسم.',
    },
    fabric: {
      en: '100% merino wool. Hand wash cold and dry flat.',
      ar: '100% صوف مرينو. غسيل يدوي بماء بارد وتجفيف مسطّح.',
    },
    pairs: ['hubub-trouser', 'dahna-coat', 'shamal-scarf'],
  },
  {
    slug: 'najd-overshirt',
    name: { en: 'Najd overshirt', ar: 'قميص نجد' },
    category: 'men',
    price: 1650,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colours: [
      {
        id: 'bone',
        name: { en: 'Bone', ar: 'عاجي' },
        swatch: '#ebe4d8',
        images: { ...img('najd', 'bone'), detail: '/img/p/najd-bone-detail.webp' },
        loop: '/loops/bisht.mp4',
      },
    ],
    summary: { en: 'Long overshirt in washed wool', ar: 'قميص طويل من الصوف المغسول' },
    description: {
      en: 'A long overshirt in washed wool, drawn from the line of the bisht: a small collar, long side slits and a straight hem below the knee. Wear it open over a thobe or a tunic, or buttoned as a shirt.',
      ar: 'قميص طويل من الصوف المغسول، مستوحى من خط البشت: ياقة صغيرة، فتحات جانبية طويلة، وحافة مستقيمة تحت الركبة. يُلبس مفتوحًا فوق الثوب أو القميص الطويل، أو مغلقًا كقميص.',
    },
    fit: {
      en: 'Relaxed. Below the knee on a 180 cm frame. Take your usual size.',
      ar: 'قصّة مريحة. يصل تحت الركبة على طول 180 سم. اختر مقاسك المعتاد.',
    },
    fabric: {
      en: '100% wool, washed for softness. Dry clean.',
      ar: '100% صوف مغسول لملمس أنعم. تنظيف جاف.',
    },
    pairs: ['nafud-sandal', 'qafilah-tote', 'shamal-scarf'],
  },
  {
    slug: 'shamal-scarf',
    name: { en: 'Shamal scarf', ar: 'وشاح شمال' },
    category: 'accessories',
    unisex: true,
    price: 690,
    sizes: ['One size'],
    colours: [{ id: 'camel', name: { en: 'Camel', ar: 'جملي' }, swatch: '#b99c79', images: img('shamal', 'camel') }],
    summary: { en: 'Long scarf in brushed wool', ar: 'وشاح طويل من الصوف المصقول' },
    description: {
      en: 'A long scarf in brushed wool with a short fringe at each end. At 200 by 70 cm it wraps twice, or hangs loose over a coat.',
      ar: 'وشاح طويل من الصوف المصقول بأهداب قصيرة في طرفيه. بمقاس 200 × 70 سم، يُلفّ مرتين أو يُترك منسدلًا فوق المعطف.',
    },
    fit: { en: '200 × 70 cm.', ar: '200 × 70 سم.' },
    fabric: { en: '100% wool. Dry clean.', ar: '100% صوف. تنظيف جاف.' },
    pairs: ['dahna-coat', 'fajr-knit', 'najd-overshirt'],
  },
  {
    slug: 'nafud-sandal',
    name: { en: 'Nafud sandal', ar: 'صندل النفود' },
    category: 'accessories',
    unisex: true,
    price: 780,
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    colours: [{ id: 'tan', name: { en: 'Tan', ar: 'عسلي' }, swatch: '#b0703c', images: img('nafud', 'tan') }],
    summary: { en: 'Flat sandal in vegetable-tanned leather', ar: 'صندل مسطّح من الجلد المدبوغ نباتيًا' },
    description: {
      en: 'A flat sandal in vegetable-tanned leather with one wide strap and a toe loop, stitched by hand around a squared sole. The leather darkens and softens as you wear it.',
      ar: 'صندل مسطّح من الجلد المدبوغ نباتيًا، بسير عريض واحد وحلقة للإصبع، مخيط يدويًا حول نعل مربّع. يغمق الجلد ويلين مع الاستعمال.',
    },
    fit: { en: 'True to size. Between sizes, take the larger.', ar: 'مقاس مطابق. إذا كنت بين مقاسين فاختر الأكبر.' },
    fabric: {
      en: 'Vegetable-tanned leather upper, insole and sole. Keep away from water.',
      ar: 'الجزء العلوي والنعل الداخلي والخارجي من جلد مدبوغ نباتيًا. يُبعد عن الماء.',
    },
    pairs: ['hubub-trouser', 'dahna-coat', 'qafilah-tote'],
  },
  {
    slug: 'qafilah-tote',
    name: { en: 'Qafilah tote', ar: 'حقيبة قافلة' },
    category: 'accessories',
    unisex: true,
    price: 1450,
    sizes: ['One size'],
    colours: [{ id: 'camel', name: { en: 'Camel', ar: 'جملي' }, swatch: '#9c6e45', images: img('qafilah', 'camel') }],
    summary: { en: 'Large tote in suede-finished leather', ar: 'حقيبة كبيرة من الجلد بلمسة شمواه' },
    description: {
      en: 'A large, unlined tote in suede-finished leather with two long flat handles. It holds a laptop, a scarf and the rest of the day, and softens into its own shape over time.',
      ar: 'حقيبة كبيرة بلا بطانة من الجلد بلمسة شمواه، بمقبضين طويلين مسطّحين. تتسع لحاسوب محمول ووشاح وبقية أغراض اليوم، وتلين مع الوقت لتأخذ شكلها الخاص.',
    },
    fit: { en: '42 × 34 × 14 cm. Handle drop 26 cm.', ar: '42 × 34 × 14 سم. طول المقبض 26 سم.' },
    fabric: { en: 'Calf leather with a suede finish. Wipe with a dry cloth.', ar: 'جلد عجل بلمسة شمواه. يُمسح بقطعة قماش جافة.' },
    pairs: ['layl-abaya', 'hubub-trouser', 'najd-overshirt'],
  },
];

export const CATEGORIES: Category[] = ['women', 'men', 'accessories'];

export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const inCategory = (c: Category) =>
  PRODUCTS.filter((p) => p.category === c || (c === 'men' && p.unisex));

export const colourOf = (p: Product, id?: string | null) => p.colours.find((c) => c.id === id) ?? p.colours[0];
