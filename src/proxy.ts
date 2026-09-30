import { NextResponse, type NextRequest } from 'next/server';

/**
 * Arabic lives at the root, English under /en. Every Arabic URL is served from
 * the [lang]=ar routes by an internal rewrite, so the address bar never shows
 * /ar; an explicit /ar/... is redirected to the clean URL.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/en' || pathname.startsWith('/en/')) return NextResponse.next();
  if (pathname === '/ar' || pathname.startsWith('/ar/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }
  const url = request.nextUrl.clone();
  url.pathname = `/ar${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Not for Next internals, metadata routes or any file with an extension.
  matcher: ['/((?!_next|api|robots\\.txt|sitemap\\.xml|favicon\\.ico|.*\\.[a-zA-Z0-9]+$).*)'],
};
