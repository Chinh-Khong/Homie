import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const url = new URL(request.url);

  if (url.pathname === '/') {
    url.pathname = '/home'; 
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); 
}
