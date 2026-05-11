 import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";   

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,       
    apiVersion: "2024-01-01", 
    useCdn: true,
});

let cachedRedirects: { 
    source: string; 
    destination: string; 
    type: string 
    }
    [] = [];

    let cashExpiry = 0;

async function getRedirects(){
    const now = Date.now();
    if (now < cashExpiry) {
        return cachedRedirects;
    }

    try {
        const data = await client.fetch(
            `[_type == "redirect" && enabled == true] {
              source,
              destination,
              type
            }`
        );
        cachedRedirects = data;
        cashExpiry = now + 60000; 
        return cachedRedirects
    } catch (error) {
        return cachedRedirects;
    }
}
   
export async function middleware(req: NextRequest) {
        const pathname = req.nextUrl.pathname;

        if (
           pathname.startsWith("/studio") ||                     
           pathname.startsWith("/api") ||
           pathname.startsWith("/_next") ||                      
           pathname.includes(".") 
          ) {
            return new NextResponse();
          }

          const redirects = await getRedirects();
          const match = redirects.find((r) => r.source === pathname);

          if (match) {
            const isPermanent = match.type == "301";
            const url = match.destination.startwith("http") ? match.destination : new URL(match.destination, req.url).toString();

            return NextResponse.redirect(url, {
                status: isPermanent ? 301 : 302,
            });
          }
        return NextResponse.next();    
}

export const config = {
            matcher:
            ["/((?!_next/static|_next/image|favicon.ico).*)"]
        };