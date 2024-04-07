import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession, lucia } from './lib/auth'
import { cookies } from 'next/headers'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const result = await getSession(request.cookies.get(lucia.sessionCookieName))
  if(!result){
    request.cookies.delete(lucia.sessionCookieName)
    return NextResponse.redirect(new URL('/login', request.url))
  }
  // return NextResponse.redirect(new URL('/home', request.url))
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/app/:path*',
}