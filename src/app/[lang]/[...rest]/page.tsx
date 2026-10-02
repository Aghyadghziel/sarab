import { notFound } from 'next/navigation';

/** Any address that matches no page gets the store's own 404, inside the site layout. */
export default function Unknown() {
  notFound();
}
