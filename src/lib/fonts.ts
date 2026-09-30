import { Amiri, Hanken_Grotesk, IBM_Plex_Sans_Arabic, Instrument_Serif } from 'next/font/google';

const display = Instrument_Serif({ variable: '--f-display', subsets: ['latin'], weight: '400', style: ['normal', 'italic'] });
const body = Hanken_Grotesk({ variable: '--f-body', subsets: ['latin'] });
// adjustFontFallback off: otherwise Arabic falls back to a metric-matched Arial.
const arDisplay = Amiri({ variable: '--f-ar-display', subsets: ['arabic'], weight: ['400', '700'], adjustFontFallback: false });
const arBody = IBM_Plex_Sans_Arabic({ variable: '--f-ar-body', subsets: ['arabic'], weight: ['300', '400', '500'], adjustFontFallback: false });

export const fontVariables = [display.variable, body.variable, arDisplay.variable, arBody.variable].join(' ');
