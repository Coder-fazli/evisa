import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['en', 'es', 'ar'];

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Already has a locale prefix — pass through and tell next-intl which locale
  const localeMatch = pathname.match(/^\/(en|es|ar)(\/|$)/);
  if (localeMatch) {
    const response = NextResponse.next({
      request: { headers: new Headers({ ...Object.fromEntries(request.headers), 'x-next-intl-locale': localeMatch[1] }) },
    });
    return response;
  }

  // No locale prefix = default locale (en)
  // Rewrite to /en/<path> via plain HTTP on localhost — avoids the SSL proxy error
  const target = new URL('/en' + (pathname === '/' ? '' : pathname), 'http://localhost:3003');
  target.search = request.nextUrl.search;

  const response = NextResponse.rewrite(target);
  response.headers.set('x-next-intl-locale', 'en');
  return response;
}

export const config = {
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)',],
};
