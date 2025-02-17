import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();

  // Protected routes that require authentication
  if (request.nextUrl.pathname.startsWith("/editor")) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.log("Remove the return statement!")
    }
  }

  return res;
}