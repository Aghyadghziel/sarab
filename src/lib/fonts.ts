import { Bodoni_Moda, Noto_Naskh_Arabic, Qahiri, Readex_Pro } from 'next/font/google';

/** Display, Latin: a high-contrast Didone, used large and sparingly. */
const display = Bodoni_Moda({ variable: '--f-display', subsets: ['latin'], style: ['normal', 'italic'], axes: ['opsz'] });
/** Display, Arabic: a Naskh with the same contrast as the Didone. */
const arDisplay = Noto_Naskh_Arabic({ variable: '--f-ar-display', subsets: ['arabic'], weight: ['400', '500'], adjustFontFallback: false });
/** Everything else, in both scripts: one family drawn for Arabic and Latin together. */
const ui = Readex_Pro({ variable: '--f-ui', subsets: ['latin', 'arabic'], weight: ['200', '300', '400', '500'], adjustFontFallback: false });
/** The Arabic mark سراب. */
const mark = Qahiri({ variable: '--f-mark', subsets: ['arabic'], weight: '400', adjustFontFallback: false });

export const fontVariables = [display.variable, arDisplay.variable, ui.variable, mark.variable].join(' ');
