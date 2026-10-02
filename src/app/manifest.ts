import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SARAB سراب',
    short_name: 'SARAB',
    start_url: '/',
    display: 'standalone',
    background_color: '#f3eee6',
    theme_color: '#17140f',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
