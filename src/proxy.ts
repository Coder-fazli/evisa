import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
});

type Redirect = { source: string; destination: string; type: string };

let cachedRedirects: Redirect[] = [];
let cacheExpiry = 0;

async function getRedirects(): Promise<Redirect[]> {
  const now = Date.now();
  if (now < cacheExpiry && cachedRedirects.length > 0) return cachedRedirects;
  try {
    const data = await client.fetch<Redirect[]>(
      `*[_type == "redirect" && enabled == true] { source, destination, type }`
    );
    cachedRedirects = data;
    cacheExpiry = now + 60_000;
    return cachedRedirects;
  } catch {
    return cachedRedirects;
  }
}

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Skip static assets, API, Studio
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 1. Check Sanity redirects first
  const redirects = await getRedirects();
  const match = redirects.find((r) => r.source === pathname);
  if (match) {
    const url = match.destination.startsWith("http")
      ? match.destination
      : new URL(match.destination, req.url).toString();
    return NextResponse.redirect(url, { status: match.type === "301" ? 301 : 302 });
  }

  // 2. Locale routing (next-intl)
  const localeMatch = pathname.match(/^\/(en|es|ar)(\/|$)/);
  if (localeMatch) {
    const response = NextResponse.next({
      request: {
        headers: new Headers({
          ...Object.fromEntries(req.headers),
          "x-next-intl-locale": localeMatch[1],
        }),
      },
    });
    return response;
  }

  // 3. No locale prefix → rewrite to /en/...
  const target = new URL("/en" + (pathname === "/" ? "" : pathname), req.url);
  target.search = req.nextUrl.search;
  const response = NextResponse.rewrite(target);
  response.headers.set("x-next-intl-locale", "en");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
