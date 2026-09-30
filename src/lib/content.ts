/**
 * SARAB is a concept brand. Nothing here is for sale, there are no prices and
 * no claims about customers. Piece names and fabrics describe the design only.
 */
export const LOCALES = ['ar', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const isLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v);
export const dirOf = (l: Locale) => (l === 'ar' ? 'rtl' : 'ltr');
export const homeOf = (l: Locale) => (l === 'ar' ? '/' : '/en');

export const BRAND = {
  name: 'SARAB',
  nameAr: 'سراب',
  studio: 'SIMA Studio',
  studioUrl: 'https://www.simastudio.it.com',
} as const;

export type Piece = {
  id: string;
  no: string;
  image: string;
  name: string;
  fabric: string;
  note: string;
  alt: string;
  /** A short wind loop that plays over the image; same crop as `image`. */
  loop?: string;
};

type Copy = {
  meta: { title: string; description: string };
  nav: { collection: string; cloth: string; looks: string; night: string; lang: string; langHref: string };
  hero: { first: string; second: string; tagline: string; hint: string; label: string };
  manifesto: { kicker: string; body: string; points: { title: string; text: string }[] };
  collection: { kicker: string; title: string; lead: string; pieces: Piece[] };
  cloth: { kicker: string; title: string; body: string; facts: { label: string; value: string }[]; alt: string };
  looks: { kicker: string; title: string; items: { image: string; alt: string; caption: string }[] };
  night: { kicker: string; title: string; body: string; alt: string };
  footer: { line: string; concept: string; by: string; top: string };
};

export const COPY: Record<Locale, Copy> = {
  ar: {
    meta: {
      title: 'سراب — ملابس يحرّكها الهوا',
      description: 'سراب براند أزياء تجريبي من تصميم سيما ستوديو. معاطف وقطع واسعة بألوان الرمل والفجر والليل.',
    },
    nav: { collection: 'المجموعة', cloth: 'القماش', looks: 'الصور', night: 'الليل', lang: 'EN', langHref: '/en' },
    hero: {
      first: 'هذا مو رمل.',
      second: 'هذا قماش.',
      tagline: 'اللي تشوفه مو سراب.',
      hint: 'انزل',
      label: 'مشهد متحرك: الكاميرا تبعد من طيّات معطف إلى امرأة واقفة على كثيب رمل وقت الفجر.',
    },
    manifesto: {
      kicker: 'الفكرة',
      body: 'نفصّل ملابس يحرّكها الهوا. قصّات واسعة، أقمشة ثقيلة تنزل صح، وألوان مأخوذة من الرمل والفجر والليل.',
      points: [
        { title: 'قصّة واسعة', text: 'كتف نازل وكمّ عريض، عشان القطعة تتحرك معك وما تمسكك.' },
        { title: 'قماش له وزن', text: 'نسيج ثقيل ينزل على خط واحد، ويرجع لمكانه بعد كل هبّة.' },
        { title: 'ثلاثة ألوان', text: 'رملي، عظمي، ونيلي غامق. كل قطعة تلبس مع الباقي.' },
      ],
    },
    collection: {
      kicker: 'المجموعة الأولى',
      title: 'ست قطع',
      lead: 'كل قطعة مصممة عشان تبان أحلى وهي تتحرك.',
      pieces: [
        { id: 'dune', no: '01', image: '/img/dune.webp', loop: '/loops/dune.mp4', name: 'معطف الكثيب', fabric: 'صوف وحرير، نسيج مبرد', note: 'طويل للكاحل، وفتحة خلفية تفتح مع المشي.', alt: 'امرأة من الخلف تلبس معطف طويل بلون الجمل وشال يطير مع الهوا' },
        { id: 'bisht', no: '02', image: '/img/bisht.webp', loop: '/loops/bisht.mp4', name: 'قميص البشت', fabric: 'صوف خفيف مغسول', note: 'مفتوح من قدّام، مأخوذ من خط البشت.', alt: 'رجل واقف على كثيب يلبس قميص طويل أبيض مفتوح يطير مع الهوا' },
        { id: 'wind', no: '03', image: '/img/trousers.webp', loop: '/loops/wind.mp4', name: 'بنطلون الهبوب', fabric: 'كتان مغسول', note: 'خصر عالي ورِجل واسعة مرّة.', alt: 'بنطلون كتان واسع بلون الرمل على كثيب' },
        { id: 'dawn', no: '04', image: '/img/knit.webp', loop: '/loops/dawn.mp4', name: 'سويتر الفجر', fabric: 'صوف مرينو', note: 'رقبة عالية وكمّ يغطي اليد.', alt: 'امرأة من الجنب تلبس سويتر أبيض عظمي برقبة عالية' },
        { id: 'shawl', no: '05', image: '/img/scarf.webp', loop: '/loops/shawl.mp4', name: 'الشال', fabric: 'صوف ناعم بأهداب قصيرة', note: 'طويل كفاية عشان يطير.', alt: 'شال صوف بلون الجمل يطير أفقي في الهوا فوق الكثبان' },
        { id: 'night', no: '06', image: '/img/night.webp', loop: '/loops/night.mp4', name: 'معطف الليل', fabric: 'صوف نيلي', note: 'نفس قصّة الكثيب، بلون السما بعد المغرب.', alt: 'امرأة من الخلف تلبس معطف طويل نيلي وقت الغروب' },
      ],
    },
    cloth: {
      kicker: 'القماش',
      title: 'قرّب أكثر',
      body: 'الكثبان اللي شفتها أول الصفحة هي كتف معطف الكثيب. الضو الواطي يرسم الطيّة مثل ما يرسم الرمل.',
      facts: [
        { label: 'النسيج', value: 'مبرد' },
        { label: 'الخامة', value: 'صوف وحرير' },
        { label: 'اللون', value: 'رملي' },
      ],
      alt: 'لقطة قريبة جداً لطيّات معطف صوف بلون الجمل تشبه كثبان الرمل',
    },
    looks: {
      kicker: 'الصور',
      title: 'فجر على الكثبان',
      items: [
        { image: '/img/look-1.webp', alt: 'امرأة تمشي على حافة كثيب والشال يطير وراها', caption: 'معطف الكثيب مع الشال' },
        { image: '/img/look-2.webp', alt: 'امرأة من الخلف على كثيب برتقالي والمعطف يتحرك مع الهوا', caption: 'معطف الكثيب، أول ضو' },
        { image: '/img/wide.webp', alt: 'لقطة واسعة لامرأة واقفة على كثيب وقدّامها بحر من الكثبان', caption: 'المشهد الأخير' },
      ],
    },
    night: {
      kicker: 'الليل',
      title: 'وإذا جا الليل',
      body: 'معطف الليل. نفس القصّة ونفس الوزن، بلون السما أول ما تطلع النجوم.',
      alt: 'امرأة من الخلف تلبس معطف نيلي طويل على الرمل والسما زرقا غامقة',
    },
    footer: {
      line: 'اللي تشوفه مو سراب.',
      concept: 'سراب براند تجريبي. القطع غير معروضة للبيع، والصور والفيديو مصنوعة بالذكاء الاصطناعي.',
      by: 'تصميم وتنفيذ',
      top: 'فوق',
    },
  },
  en: {
    meta: {
      title: 'SARAB — Clothes moved by wind',
      description: 'SARAB is a concept fashion brand designed by SIMA Studio. Coats and wide layers in the colours of sand, dawn and night.',
    },
    nav: { collection: 'Collection', cloth: 'Cloth', looks: 'Looks', night: 'Night', lang: 'ع', langHref: '/' },
    hero: {
      first: 'This is not sand.',
      second: 'This is cloth.',
      tagline: 'Not a mirage.',
      hint: 'Scroll',
      label: 'Moving scene: the camera pulls back from the folds of a coat to a woman standing on a sand dune at dawn.',
    },
    manifesto: {
      kicker: 'The idea',
      body: 'We cut clothes for the wind to move. Wide shapes, heavy cloth that falls straight, and colours taken from sand, dawn and night.',
      points: [
        { title: 'A wide cut', text: 'Dropped shoulders and broad sleeves, so the piece moves with you and never grips.' },
        { title: 'Cloth with weight', text: 'A heavy weave that falls in one line and settles after every gust.' },
        { title: 'Three colours', text: 'Sand, bone and deep indigo. Every piece wears with the others.' },
      ],
    },
    collection: {
      kicker: 'Collection one',
      title: 'Six pieces',
      lead: 'Each piece is designed to look its best in motion.',
      pieces: [
        { id: 'dune', no: '01', image: '/img/dune.webp', loop: '/loops/dune.mp4', name: 'Dune coat', fabric: 'Wool and silk twill', note: 'Ankle length, with a back vent that opens as you walk.', alt: 'Woman seen from behind in a long camel coat, her scarf flying in the wind' },
        { id: 'bisht', no: '02', image: '/img/bisht.webp', loop: '/loops/bisht.mp4', name: 'Bisht overshirt', fabric: 'Light washed wool', note: 'Open at the front, drawn from the line of the bisht.', alt: 'Man on a dune in a long open white overshirt lifted by the wind' },
        { id: 'wind', no: '03', image: '/img/trousers.webp', loop: '/loops/wind.mp4', name: 'Wind trousers', fabric: 'Washed linen', note: 'High waist and a very wide leg.', alt: 'Wide sand-coloured linen trousers on a dune' },
        { id: 'dawn', no: '04', image: '/img/knit.webp', loop: '/loops/dawn.mp4', name: 'Dawn knit', fabric: 'Merino wool', note: 'Funnel neck and sleeves that cover the hand.', alt: 'Woman in profile wearing a bone-white funnel-neck knit' },
        { id: 'shawl', no: '05', image: '/img/scarf.webp', loop: '/loops/shawl.mp4', name: 'The scarf', fabric: 'Fine wool, short fringe', note: 'Long enough to fly.', alt: 'Camel wool scarf flying flat in the wind above the dunes' },
        { id: 'night', no: '06', image: '/img/night.webp', loop: '/loops/night.mp4', name: 'Night coat', fabric: 'Indigo wool', note: 'The Dune cut, in the colour of the sky after sunset.', alt: 'Woman seen from behind in a long indigo coat at dusk' },
      ],
    },
    cloth: {
      kicker: 'Cloth',
      title: 'Look closer',
      body: 'The dunes at the top of this page are the shoulder of the Dune coat. Low light draws a fold the same way it draws sand.',
      facts: [
        { label: 'Weave', value: 'Twill' },
        { label: 'Fibre', value: 'Wool and silk' },
        { label: 'Colour', value: 'Sand' },
      ],
      alt: 'Extreme close-up of the folds of a camel wool coat that look like sand dunes',
    },
    looks: {
      kicker: 'Looks',
      title: 'Dawn on the dunes',
      items: [
        { image: '/img/look-1.webp', alt: 'Woman walking a dune ridge with her scarf flying behind her', caption: 'Dune coat with the scarf' },
        { image: '/img/look-2.webp', alt: 'Woman from behind on an orange dune, her coat moving in the wind', caption: 'Dune coat, first light' },
        { image: '/img/wide.webp', alt: 'Wide view of a woman standing on a dune above a sea of dunes', caption: 'The last frame' },
      ],
    },
    night: {
      kicker: 'Night',
      title: 'And when night comes',
      body: 'The Night coat. Same cut, same weight, in the colour of the sky as the first stars appear.',
      alt: 'Woman seen from behind in a long indigo coat on the sand under a deep blue sky',
    },
    footer: {
      line: 'Not a mirage.',
      concept: 'SARAB is a concept brand. The pieces are not for sale, and the images and video are AI-generated.',
      by: 'Design and build',
      top: 'Top',
    },
  },
};
